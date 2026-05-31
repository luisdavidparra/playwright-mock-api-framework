# 🎭 Playwright Mock API Framework

A test automation framework built with Playwright that uses a mock server and a mock UI to run end-to-end tests in a fully controlled, dependency-free environment.

## 📌 Features

- UI tests against a local mock frontend (`ui-mock`).
- API mocking with `json-server` to simulate backend responses.
- Test scenarios written with Playwright Test.
- GitHub Actions CI/CD pipeline for automated test execution.
- No external service dependencies — everything runs locally or in CI.

---

## 🛠 Tech Stack

| Tool                  | Purpose                        |
| --------------------- | ------------------------------ |
| **Playwright**        | UI & API test automation       |
| **json-server**       | Mock REST API server           |
| **http-server**       | Serve the mock UI locally      |
| **Node.js** + **npm** | Runtime and package management |

---

## 🗂 Project Structure

```
playwright-mock-api-framework/
├── .github/workflows/     # GitHub Actions CI pipeline
├── mock-server/           # json-server mock API (db.json)
├── playwright-report/     # Generated HTML test reports
├── src/                   # Test files and page objects
├── ui-mock/               # Static mock frontend (HTML)
├── playwright.config.js   # Playwright configuration
└── package.json
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/luisdavidparra/playwright-mock-api-framework
cd playwright-mock-api-framework
```

## 2. Install dependencies

```bash
npm install
npx playwright install
```

> `playwright install` is required
> separately to download the browser binaries (Chromium, Firefox, WebKit).

### 3. Start the mock server

In a separate terminal, start the mock REST API:

```bash
npm run mock
```

> The mock server will be available at `http://localhost:3000`

### 4. Start the mock UI

In another terminal, serve the mock frontend:

```bash
npm start
```

> The UI will be available at `http://localhost:8080`

### 5. Run tests

```bash
npm test
```

---

## 📊 Test Report

After running the tests, an HTML report is generated automatically. To open it:

```bash
npm run report
```

---

## ⚙️ CI/CD

This project includes a GitHub Actions workflow that automatically runs the full test suite on every push and pull request to `main`.
