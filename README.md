# Purple Cross Ltd - Employee Management Dashboard

## Overview

This project is a front-end Employee Management Dashboard for Purple Cross Ltd.

The app replaces spreadsheet-style employee handling with a structured interface for browsing, filtering, creating, editing, and deleting employee records. The focus is a maintainable, modular React architecture with practical UX behaviors.

## Tech Stack

```txt
React
Vite
React Router
Custom hooks + utility modules
localStorage persistence
```

## Implemented Features

```txt
Employee index table
Sorting (name, occupation, department, employment date, termination date)
Pagination
Search (code, name, department, occupation)
Department and occupation filters
Employee details page
Create employee form with validation
Edit employee form with prefilled values and validation
Delete employee with confirmation dialog
Status badges (employment and termination)
Toast feedback for create/edit/delete/reset actions
Responsive layouts for table/forms/details/toasts
```

## Employee Status Rules

Employment status:

```txt
Future dateOfEmployment -> Employed soon
Past/current dateOfEmployment -> Currently employed
```

Termination status:

```txt
terminationDate is null -> Active
Future terminationDate -> To be terminated
Past/current terminationDate -> Terminated
```

## How To Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Route Map

```txt
/                         -> redirect to /employees
/employees                -> employee list
/employees/new            -> create employee
/employees/:code          -> employee details
/employees/:code/edit     -> edit employee
*                         -> not found
```

## Project Structure

```txt
src/
  components/
    common/
    employees/
    layout/
  data/
    employees.json
  hooks/
    useEmployees.js
  pages/
  routes/
  utils/
  App.jsx
  main.jsx
```

## Architecture Summary

- `useEmployees` is the single source of truth for employee state and CRUD behavior.
- Employee data loads from localStorage first, then falls back to bundled JSON.
- Business logic is isolated in utilities (`employeeStatus`, `employeeValidation`, `dateUtils`, `employeeStorage`).
- Reusable UI pieces (`EmployeeForm`, `EmployeeTable`, `EmployeeFilters`, `ConfirmDialog`, `ToastMessage`) keep page components lean.
- Route-state based toast feedback is used for post-navigation success messages.

## Validation Rules

```txt
Code, Full Name, Occupation, and Department are required.
Code must be unique.
Date fields must be valid dates.
Termination date cannot be earlier than date of employment.
```

## Assumptions

```txt
Frontend-only implementation (no backend/API integration).
Employee code is the unique identifier.
Provided JSON is the default dataset.
localStorage persistence is used to simulate data durability.
Reset Data restores the bundled dataset.
```

## Future Improvements

```txt
Backend/API integration with server-side pagination/filtering
Automated unit and integration tests
Role-based permissions and authentication
Audit trail for employee record changes
Bulk actions (multi-select delete/update)
CSV import/export
Advanced accessibility pass (keyboard shortcuts, announcements, focus traps)
```
