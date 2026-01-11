/**
 * Playwright API Tests
 * 
 * To run this script:
 * 1. Install dependencies: npm install
 * 2. Run the script: node api-tests.js
 */

const { request: apiRequest } = require('playwright');
const { expect } = require('playwright/test');

/**
 * Main function to run API tests
 */
async function main() {
    let request = await apiRequest.newContext();
    
    console.log('\n=== Testing POST Request - Create User ===\n');
    
    // create a user and store the id from the response
    const sentEmail = "eve.holt@reqres.in";
    const sentPassword = "pistol";
    
    let response = await request.post('https://reqres.in/api/register', {
      data: {
         email: sentEmail,
        password: sentPassword
      },
      headers: {
        'x-api-key': 'reqres_3e1df2d43e4a42cbab7bc400a3aa3fb2',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('Status:', response.status());
  
    
    const responseData = await response.json();
    console.log('Response:', responseData);
    
    // Extract and store the ID
    const userId = responseData.id;
    const token = responseData.token;
    console.log(`User ID: ${userId}, Token: ${token}`);

    // now getting the user details using the id
    console.log('\n=== Testing GET Request - Get User ===\n');
    response = await request.get(`https://reqres.in/api/users/${userId}`, {
      headers: {
        'x-api-key': 'reqres_3e1df2d43e4a42cbab7bc400a3aa3fb2',
        'Accept': 'application/json'
      }
    });
    
    console.log('Status:', response.status());
    let getUserData = await response.json();
    console.log('User Data:', getUserData);
    //validate the user details
    console.log('\n=== Validating User Details ===\n');
    expect(sentEmail).toEqual(getUserData.data.email)
    expect(userId).toEqual(getUserData.data.id);
    const userName=getUserData.data.first_name;

    console.log("current name of the user: ", userName);


    //update the name and job of the user and validate the same
    const newName="morpheus";
    const newJob="zion resident";
    response = await request.put(`https://reqres.in/api/users/${userId}`, {
      data: {
        name: newName,
       job: newJob,
     },
  
      headers: {
        'x-api-key': 'reqres_3e1df2d43e4a42cbab7bc400a3aa3fb2',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    console.log('response: ',response.status());
    expect(response.status()).toEqual(200);
    getUserData = await response.json();
    console.log('user data',getUserData);
    expect(newName).toEqual(getUserData.name);
    expect(newJob).toEqual(getUserData.job);
    console.log("update time stamp: ", getUserData.updatedAt);
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = main;
