# Ntua SaaS 10 Monorepo

### Issues and PR's are not visible

This project is an event-driven architecture-based application that converts CSV data into interactive charts and to their `png|svg|pdf|html` formats.

It uses [NX](https://nx.dev/) as it's build system and its almost 100% based on TypeScript.

## Technologies Used

- **Nx**: A next generation build system with first class monorepo support and powerful integrations.

- **Nest.js**: A framework for building scalable and maintainable server-side applications using TypeScript.

- **React**: A JavaScript library for building user interfaces.

- **Firebase**: A comprehensive suite of cloud-based tools and services provided by Google, including Firestore for NoSQL database, Firebase Cloud Functions for serverless functions, and Firebase Hosting for web app deployment.

- **Docker**: A containerization platform that allows packaging applications with their dependencies into standardized units.

- **Cloud Run**: A serverless compute platform provided by Google Cloud for deploying containerized applications.

- **MongoDB**: A popular NoSQL database used for the resource-related microservice.

## Project Concept

The goal of this project is to provide a user-friendly web application that enables users to upload CSV files and convert the data into interactive charts. The application follows an event-driven architecture, allowing for loose coupling and scalability.

The project is organized as a monorepo using Nx, which provides a powerful development environment for managing multiple related projects. It includes the following components:

- **Web App**: A React-based web application that provides the user interface for uploading CSV files, visualizing data, and generating charts.

- **Nest.js Backend Services**: Backend services built with Nest.js, responsible for handling file uploads, data processing, and chart generation. These services follow an event-driven architecture, enabling them to communicate with each other through events.

- **Firebase Functions**: Cloud Functions are used for serverless execution of backend logic, such as file processing and chart generation. They integrate with Firebase services like Firestore and Cloud Storage.

- **Shared**: A shared package that contains shared code and utilities used across different packages within the monorepo.

- **Web Lib**: A shared web library containing smart and dumb UI components, hooks, i18n and other common env configurations to be shared across diffrent React web applications

## Prerquisites

```sh
pnpm add -g firebase-tools nx
firebase login --reauth
```

- You also need `gcloud` and `gsutils` cli's
- `Firebase Emulators` require Java SDK 8 or higher
- A `.env` file requested by codeowners
- A `.env.local` file containing

```sh
  GOOGLE_APPLICATION_CREDENTIALS=~/.config/firebase/${email}_gmail_com_application_default_credentials.json
```

## Development

`pnpm serve`

or

`nx serve [project]`

## Building

`pnpm build`

or

`nx build [project]`

## Deployment

`pnpm deploy:all`

or

`nx deploy [project]`
