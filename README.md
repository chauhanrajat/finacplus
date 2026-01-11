# Playwright Automation Suite

Automated scripts for UI and API testing using Playwright.

---

## 1) UI Automation - Book Store Application (uitask.js)

Automates login, book search, and data extraction from DemoQA Book Store Application.

**Tasks:**
- Navigate to https://demoqa.com/ and access Book Store Application
- Login with credentials: `finacplus.test` / `Rajat@123`
- Search for "Learning JavaScript Design Patterns"
- Extract Title, Author, and Publisher
- Save results to `book-details.json`
- Logout

**Output:** `book-details.json` with book details

---

## 2) API Automation - ReqRes API (api-tests.js)

Base URL: https://reqres.in/

**Tasks:**
- Create a user (POST) - validate status and extract userId
- Get user details (GET) - validate user information
- Update user (PUT) - validate name/job update

---

## Installation & Running

### Install Dependencies
```sh
npm install
```

### Run Scripts
```sh
node uitask.js       # Run UI automation
node api-tests.js    # Run API automation
node uitask.js && node api-tests.js  # Run both
```

---

## Project Files

- `uitask.js` - UI automation script
- `api-tests.js` - API automation script
- `package.json` - Dependencies
- `book-details.json` - UI output file
