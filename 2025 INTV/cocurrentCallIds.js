const input = {
  "callRecords": [
    { "customerId": 1, "callId": "A1", "startTimestamp": 1700000000000, "endTimestamp": 1700000004000 },
    { "customerId": 1, "callId": "A2", "startTimestamp": 1700000002000, "endTimestamp": 1700000006000 },
    { "customerId": 1, "callId": "A3", "startTimestamp": 1700000003000, "endTimestamp": 1700000005000 },
    { "customerId": 3, "callId": "C1", "startTimestamp": 1700000000000, "endTimestamp": 1700000010000 },
    { "customerId": 3, "callId": "C2", "startTimestamp": 1700000007000, "endTimestamp": 1700000011000 },
    { "customerId": 3, "callId": "C3", "startTimestamp": 1700000010000, "endTimestamp": 1700000012000 },
    { "customerId": 3, "callId": "C4", "startTimestamp": 1700000006000, "endTimestamp": 1700000013000 },
    { "customerId": 4, "callId": "D1", "startTimestamp": 1700000000000, "endTimestamp": 1700000010000 },
    { "customerId": 4, "callId": "D2", "startTimestamp": 1700000011000, "endTimestamp": 1700000015000 },
    { "customerId": 4, "callId": "D3", "startTimestamp": 1700000012000, "endTimestamp": 1700000016000 }
  ]
};

/*
output
[
  {
    customerId: '1',
    date: '2023-11-14',
    maxConcurrentCalls: 3,
    timestamp: 1700000003000,
    callIds: [ 'A1', 'A2', 'A3' ] //max concurrent call Ids for customer 1
  },
  {
    customerId: '3',
    date: '2023-11-14',
    maxConcurrentCalls: 3,
    timestamp: 1700000007000,
    callIds: [ 'C1', 'C4', 'C2' ] 
  },
  {
    customerId: '4',
    date: '2023-11-14',
    maxConcurrentCalls: 2,
    timestamp: 1700000012000,
    callIds: [ 'D2', 'D3' ]
  }
]
*/

const callRecords = input.callRecords;
const customerMap = {};
for (const {customerId, callId, startTimestamp: start, endTimestamp:end} of callRecords) {
  if(Object.hasOwn(customerMap, customerId)) {
    customerMap[customerId].push({callId, start, end});
  } else {
    customerMap[customerId] = [
      {
        callId, 
        start,
        end
      }
    ];
  }
}
function findConcurrentCalls(records) {
  const events = [];
  const result = [];
  for(const {callId, start, end} of records) {
    events.push({callId, time: start, type: 'start'}, {callId, time: end, type: 'end'});
  }
  events.sort((a,b) => a.time === b.time ? (a.type==='end' ? -1 : 1) : a.time - b.time);
  let calls = [];
  for(const {callId, time, type} of events) {
    if (type==='start') {
      calls.push({callId, timeStamp: time});
    } else {
      if (calls.length > 0) {
        result.push([...calls]);
        calls = [];
      }
    }
  }
  return result;
}

const finalRes = [];
for (const key in customerMap) {
  const concurrentCalls = findConcurrentCalls(customerMap[key]);
  const maxConcurrentCallsElement = concurrentCalls.reduce((acc, el) => {
    return el.length > acc.length ? el : acc;
  }, []);
  const maxConcurrentCalls = maxConcurrentCallsElement.length;
  const callIds = maxConcurrentCallsElement.map(el => el.callId);
  const timestamp = maxConcurrentCallsElement[maxConcurrentCalls-1]['timeStamp'];
  const date = new Date(timestamp).toISOString().split('T')[0];
  //console.log(concurrentCalls);
  //console.log(maxConcurrentCallsElement);
  
  finalRes.push({
    customerId: key,
    date,
    maxConcurrentCalls,
    timestamp,
    callIds
  });
}

console.log(finalRes)
/*
{
  "results": [
    {
      "customerId": 1,
      "date": "2023-11-14",
      "maxConcurrentCalls": 3,
      "timestamp": 1700000003000,
      "callIds": ["A1", "A2", "A3"]
    },
    {
      "customerId": 2,
      "date": "2023-11-14",
      "maxConcurrentCalls": 3,
      "timestamp": 1700000005000,
      "callIds": ["B1", "B2", "B3"]
    },
    {
      "customerId": 3,
      "date": "2023-11-14",
      "maxConcurrentCalls": 4,
      "timestamp": 1700000010000,
      "callIds": ["C1", "C2", "C3", "C4"]
    },
    {
      "customerId": 4,
      "date": "2023-11-14",
      "maxConcurrentCalls": 1,
      "timestamp": 1700000012000,
      "callIds": ["D3"]
    }
  ]
}
*/