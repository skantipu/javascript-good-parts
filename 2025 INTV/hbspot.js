/*
EMPLOYEE/ADVISOR/INVESTOR.. at GOOGLE - max 5 contacts
(role/company) - max 5 contacts

contactXYZ at GOOGLE - max 2 roles
(contact/company) - max 2 roles
*/
const data = require('./data.json');

const MAX_CONTACT_PER_ROLE = 5;
const MAX_ROLE_PER_CONTACT = 2;

async function main() {

  const getApiUrl = 'https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=4d7d0012f2250103ba7976325b64';
  const postApiUrl = 'https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=4d7d0012f2250103ba7976325b64';

  try {
      // Fetching input data
      //const data = await fetchJsonFromApi(getApiUrl);
      console.log('---da', data)
      // Process the data
      const results = processNewAssociations(data);

      // Posting output data
      //await postJsonToApi(postApiUrl, results);

     console.log("Results posted successfully:", results);
  } catch (error) {
      console.error("Error:", error);
  }
}

async function fetchJsonFromApi(apiUrl) {
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      return await response.json();
  } catch (error) {
      console.error("Error in fetchJsonFromApi:", error);
      throw error;
  }
}

async function postJsonToApi(apiUrl, jsonPayload) {
  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
          throw new Error(`Failed to post data: ${response.status} ${response.statusText}`);
      }

      console.log("POST Response:", await response.json());
  } catch (error) {
      console.error("Error in postJsonToApi:", error);
      throw error;
  }
}

/*
output
{
  123: {
    EMPLOYEE: 4, //123 company has 4 'EMPLOYEE' contacts
    INVESTOR: 3, //123 company has 4 'INVESTOR' contacts
    1: 2 //contact 1 has 2 roles in the company 123 
  }
}
*/
function getAssociationMap(data) {
  const map = {};
  for(const association of data) {
    const { companyId, contactId, role } = association;
    if (Object.hasOwn(map, companyId)) {
      const obj = map[companyId];
      const roleCt = obj[role] ?? 0;
      const contactCt = obj[contactId] ?? 0;
      obj[role] = roleCt + 1;
      obj[contactId] = contactCt + 1;
    } else {
      map[companyId] = {
        [role]: 1,
        [contactId]: 1
      };
    }
  }
  return map;
}


function processNewAssociations({ existingAssociations, newAssociations }) {
  const validAssociations = [];
  const invalidAssociations = [];

  //processing ALREADY_EXISTS rule 
  for (const newAssociation of newAssociations) {
    const { companyId: newCompanyId, contactId: newContactId, role: newRole } = newAssociation;
    for (const {companyId, contactId, role} of existingAssociations) {
      if (companyId === newCompanyId && contactId === newContactId && role === newRole) {
        invalidAssociations.push({companyId, contactId, role, failureReason: 'ALREADY_EXISTS'});
        newAssociation.ignore = true;
      }
    }
  }

  const uniqueNewAssociations = newAssociations.filter(asc => !asc.ignore);

  const existingAssociationCompanyMap = getAssociationMap(existingAssociations);
  const newAssociationCompanyMap = getAssociationMap(uniqueNewAssociations);
  
  //processing WOULD_EXCEED_LIMIT rule
  for(const {companyId, contactId, role} of uniqueNewAssociations) {
    const existingRoleCt = existingAssociationCompanyMap[companyId]?.[role] || 0; //optional chaining for safety
    const newRoleCt = newAssociationCompanyMap[companyId]?.[role] || 0;
    const existingContactRoleCt = existingAssociationCompanyMap[companyId]?.[contactId] || 0;
    const newContactRoleCt = newAssociationCompanyMap[companyId]?.[contactId] || 0;

    if ((existingRoleCt + newRoleCt > MAX_CONTACT_PER_ROLE) || (existingContactRoleCt + newContactRoleCt > MAX_ROLE_PER_CONTACT)) {
      invalidAssociations.push({companyId, contactId, role, failureReason: 'WOULD_EXCEED_LIMIT'});
    } else {
      validAssociations.push({companyId, contactId, role});
    }
  }

  return {
    validAssociations,
    invalidAssociations
  }
}

main();