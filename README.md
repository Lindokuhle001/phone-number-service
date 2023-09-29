# phone-number-service

Project Overview:
The goal of this project is to create a comprehensive system for generating and validating phone numbers. This system consists of a frontend application, a MongoDB server hosted within a Docker container, and a microservice built using NestJS and Google's phone number validation TypeScript package.

# Project Structure:
The project directory structure is organized as follows:

At the root folder, you'll find a "Client" directory containing the React application.
Additionally, there's a "Server" directory containing the NestJS application.
A docker-compose.yml file for the mongo container 
To Run the Project:

# Start the MongoDB Server:

Create a .env file in the root directory with a connection string variable named DB_URI.
The connection string should look like this: ```DB_URI=mongodb://localhost:27017/mongoDB-Cont```.
Start the MongoDB server by running: ```docker-compose up -d```.

# Start the NestJS Microservice:

Navigate to the NestJS microservice directory by running: cd Server/phone-number-generator.
Install Dependencies run: ```npm install```
Start the microservice with: ```npm start```.

# Start the React App:

From the project's root directory, navigate to the React app by running: ```cd Client/PhoneNumberGenerator```.
Launch the React app with: ```npm run dev```.
By following these simplified instructions, you'll be able to run your project smoothly.
