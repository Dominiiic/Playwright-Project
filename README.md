Playwright Test Suite

Overview

This project is a comprehensive test suite using Playwright with the following best practices applied:

1. Page Object Model Design Pattern: Organized and maintainable code structure.
2. Visual Comparison Using Screenshots: Ensures visual accuracy by comparing screenshots.
3. Parallel and Headless Test Execution: Tests are designed to run in parallel and in headless mode to speed up execution.
4. Cross Browser Testing: Tests can run in multiple browsers.
5. Global Setup: Configured global setup for the test suite.
6. Test Hooks: Utilized test hooks to manage test setup and teardown.
7. Environment Configuration: Managed base URL, used .env to store confidential credentials, and utilized Playwright configuration file to manage and share settings across different test environments.
8. CI/CD Integration: Integrated with CI/CD pipeline using GitHub Actions.

How to Run

Prerequisite: Node.js is installed on your machine.

Steps to Run the Tests

1. Install Playwright: npm init playwright@latest
2. Run the Tests: npx playwright test <name-of-spec-file>
