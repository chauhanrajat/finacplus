/**
 * Playwright Script to check book details in DemoQA Book Store Application
 * 
 * To run this script:
 * 1. Install dependencies: npm install
 * 2. Run the script: node uitask.js
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const { expect } = require('@playwright/test');

/**
 * Main function to validate book details in DemoQA Book Store Application
 * @param {boolean}  headless - Run browser in headless mode (default: false)
 */
async function main(headless = false) {
  // Credentials and search variables
  const username = 'finacplus.test';
  const password = 'Rajat@123';
  const bookName = 'Learning JavaScript Design Patterns';
  
  let browser;
  
  try {
    console.log('Launching browser...');
    browser = await chromium.launch({ 
      headless: headless
    });
    const page = await browser.newPage();
    // Set default navigation timeout to 60 seconds
    page.setDefaultNavigationTimeout(60000);
    //open page for demoqa
    await page.goto('https://demoqa.com/', { timeout: 60000});
    await page.waitForSelector("xpath=//div[@class='card mt-4 top-card']//h5[text()='Book Store Application']", { timeout: 30000 });
    await page.click("xpath=//div[@class='card mt-4 top-card']//h5[text()='Book Store Application']");
    await page.waitForSelector("xpath=//div[@class='header-text' and contains(text(),'Book Store')]");
    await page.click("xpath=//div[@class='header-text' and contains(text(),'Book Store')]");
    //login to the book store application
    await page.click("xpath=//button[@id='login']");
    await page.fill("xpath=//input[@id='userName']", username);
    await page.fill("xpath=//input[@id='password']", password);
    await page.click("xpath=//button[@id='login']");
    //assert the login is successful
    await page.waitForSelector("xpath=//label[@id='userName-label']/following-sibling::label", { timeout: 30000 });
    await expect(page.locator("xpath=//label[@id='userName-label']/following-sibling::label")).toHaveText(username);
    await expect(page.locator("xpath=//button[@id='submit' and text()='Log out']")).toBeVisible();
    //search for the book
    await page.fill("xpath=//input[@id='searchBox']", bookName);
    //assert the book is present in the book store application
    const title = await page.locator("xpath=//div[@class='action-buttons']//span").textContent();
    const author = await page.locator(`(//a[contains(text(),'${bookName}')]/../../../following-sibling::div)[1]`).textContent();
    const publisher = await page.locator(`(//a[contains(text(),'${bookName}')]/../../../following-sibling::div)[2]`).textContent();
    
    // Write book details to JSON file
    const bookDetails = {
      title: title?.trim() || '',
      author: author?.trim() || '',
      publisher: publisher?.trim() || ''
    };
    
    await fs.writeFile('book-details.json', JSON.stringify(bookDetails, null, 2), 'utf8');
    console.log('Book details written to book-details.json');
    console.log('Book Details:', bookDetails);
    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('Error occurred:', error.message);
    throw error;
  } finally {
    // Close the browser
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}

// Run the main function
if (require.main === module) {
  main(false).catch(error => { 
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = main;
