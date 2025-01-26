const { partners } = require('./partners.json');
//ASK - We need to find the dates that’ll work best for most partners per country. The date you send in for the country should be the starting date of the two day period where the most partners can make it for both days in a row. 
//In case of multiple dates with the same number of partners, pick the earlier date. If there are no two days in a row when any partners can make it, return null.

//sort availableDates for each partner just to make sure they are sorted
const sortedPartnerData = partners.map(partner => ({
  ...partner,
  availableDates: partner.availableDates.filter(date => !!date).sort((a, b) => new Date(a) - new Date(b))
}));
/* output of sortedPartnerData
[
  {
    "firstName": "Lynsey",
    "lastName": "Forsmark",
    "email": "lforsmark@hubspotpartners.com",
    "country": "United States",
    "availableDates": [
      "2017-04-14",
      "2017-04-19",
      "2017-04-21",
      "2017-04-22",
      "2017-04-23",
      "2017-04-24",
      "2017-05-07"
    ]
  },
  ...
]
*/

const areDatesInARow = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffInMS = Math.abs(d1 - d2);
  if (isNaN(diffInMS)) return false;
  const diffInDays = diffInMS/(24 * 60 * 60 * 1000);
  return diffInDays === 1;
}

const getPotentialStartDates = (dates) => {
  const result = [];
  for (let i=0; i<dates.length-1; i++) {
    if(areDatesInARow(dates[i], dates[i+1])) {
      result.push(dates[i]);
    }
  }
  return result;
}

const countryDataMap = {};
for(const {country, availableDates, ...partner} of sortedPartnerData) {
  const potentialStartDates = getPotentialStartDates(availableDates);
  if (Object.hasOwn(countryDataMap, country)) {
    countryDataMap[country].push({ ...partner, potentialStartDates });
  } else {
    countryDataMap[country] = [{ ...partner, potentialStartDates }];
  }
}
/*
{
  United States: [
  {
    firstName: 'Lynsey',
    lastName: 'Forsmark',
    email: 'lforsmark@hubspotpartners.com',
    potentialStartDates: [ '2017-04-21', '2017-04-22', '2017-04-23' ]
  },
  ...
}
*/

const getPartnersPerDateMap = (partners) => {
  const dateMap = {};
  for (const {potentialStartDates, ...partner} of partners) {
    for (const date of potentialStartDates) {
      if (Object.hasOwn(dateMap, date)) {
        dateMap[date].push(partner)
      } else { 
        dateMap[date] = [partner];
      }
    }
  }
  return dateMap;
}

/*
  {
    '2017-04-21': [ {partner1}, {partner2} ],
    '2017-04-22': [ {partner1}, {partner2}, {partner3} ],
    ...
  }
*/
const getMostAvailableDate = (dateMap) => {
  const keys = Object.keys(dateMap); 
  return keys.reduce((acc, date) => {
    return dateMap[date].length > dateMap[acc].length ? date : acc; 
  }, keys[0]);
}

for (const country in countryDataMap) {
  const partnersPerDateMap = getPartnersPerDateMap(countryDataMap[country]);
  const mostAvailableDate = getMostAvailableDate(partnersPerDateMap);

  console.log(country + ': ' + mostAvailableDate);
}




