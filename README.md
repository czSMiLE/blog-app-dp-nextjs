# Simple blog application - Frontend in React

This project is a Simple blog application - Frontend, built using React (Next.js), TypeScript, and Tailwind CSS.

## Introduction

The goal of this project is to implement a frontend for a blogging application that allows users to view articles, create new articles, and perform various administrative tasks such as editing and deleting articles.

## Technologies Used

- React (Next.js)
- React-hook-form
- TypeScript
- Tailwind CSS
- Sentry
- Husky
- Prettier, ESLint, Commitlint

## Project Structure

- `api/`: API utility functions and configuration.
- `components/`: Reusable UI components.
- `context/`: React context providers.
- `hocs/`: Higher-order components.
- `hooks/`: Custom React hooks.
- `layout/`: Layout components for pages.
- `pages/`: Next.js pages for different routes.
- `styles/`: Global styles.
- `types/`: TypeScript type definitions.
- `utils/`: Utility functions.

## Features Implemented

- Display a list of articles with title, perex, and publication date.
- View full article.
- Add new article with title, perex, and content.
- User authentication and login.
- Admin dashboard to manage articles (edit, delete).

## How to Run

1. Clone the repository:

git clone https://github.com/czSMiLE/blog-app-dp-nextjs.git

2. Install dependencies:

cd blog-app-dp-nextjs
npm install

3. Run the development server:

npm run dev

4. Access the application in your browser:

http://localhost:3000

## API Documentation

For information on how to interact with the backend API, please refer to the [API documentation](https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md#frontend-developer-exercise).

## Deployment

This application is deployed using Vercel and can be accessed [here](https://blog-app-dp-nextjs.vercel.app/).

## Notes

- Made with reusability, clean code, advanced design principles and maintanence in mind.
- Styling is minimal and done using Tailwind CSS.
