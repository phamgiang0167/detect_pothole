## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Auth - [Nextauth](https://next-auth.js.org)
- File Uploading - [Uploadthing](https://uploadthing.com)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages                                                                             | Specifications                                                                                        |
| :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| [Signup](http://localhost:3000/)                       | Authentication with **NextAuth** supports Social logins and email logins(Enter dummy email for demo). |
| [Dashboard](http://localhost:3000/dashboard)           | Cards with recharts graphs for analytics.                                                             |
| [Users](http://localhost:3000/dashboard/user)          | Tanstack tables with user details client side searching, pagination etc                               |
| [Users/new](http://localhost:3000/dashboard/user/new)  | A User Form with Uploadthing to support file uploading with dropzone.                                 |
| [Employee](http://localhost:3000/dashboard/employee)   | Tanstack tables with server side searching, pagination etc).                                          |
| [Profile](http://localhost:3000/dashboard/profile)     | Mutistep dynamic forms using react-hook-form and zod for form validation.                             |
| [Kanban Board](http://localhost:3000/dashboard/kanban) | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                |
| [Not Found](http://localhost:3000/dashboard/notfound)  | Not Found Page Added in the root level                                                                |
| -                                                                                 | -                                                                                                     |

## Getting Started

Follow these steps to clone the repository and start the development server:

- `git clone https://github.com/igap-vn/igap-system-tools.git`
- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000.
