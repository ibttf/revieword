# Revieword
A website designed for people to be able to review essays and get their essays reviewed.

Deployed on: https://cheery-mermaid-a47c44.netlify.app

## Table of Contents

- [General Info](#general-information)
- [GitHub Repo](#github-repo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Server Start](#server-start)
- [Usage](#usage)
- [Deploying To Heroku](#deploying-to-heroku)
- [Troubleshooting](#troubleshooting)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)

## General Information
This project was built independently with a react frontend and a node/express backend. It is currently deployed at https://cheery-mermaid-a47c44.netlify.app.

## GitHub Repo

- [Frontend] https://github.com/roylee0912/revieword-frontend-react
- [Backend] https://github.com/roylee0912/revieword-express-backend


## Technologies Used

- NodeJS (v16), and npm
- Express 4.18
- MongoDb
- bcrypt 3.1.7
- React 17.0.2
- React-Router-Dom 5.3.3

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Features

### Backend API Endpoints

| Method | Endpoint          | Params                | Description                                          |
| ------ | ----------------- | --------------------- | ---------------------------------------------------- |
| GET    | /me               |                       | returns logged in user                               |
| POST   | /signup           |                       | creates a new user profile                           |
|        |                   | username              | user name                                            |
|        |                   | password              | user password                                        |
|        |                   | password_confirmation | user password confirmation                           |
| POST   | /login            |                       | creates a user session                               |
|        |                   | username              | user name                                            |
|        |                   | password              | user password                                        |
| DELETE | /logout           |                       | deletes a user session                               |
| GET    | /essays           |                       | returns all essays, if user is authenticated         |
| GET    | /essays           | id                    | returns an  essay, if user is authenticated          |
| POST   | /essays           |                       | creates a new essay, if user is authenticated        |
|        |                   | prompt                | essay prompt                                         |
|        |                   | content               | content of essay                                     |
|        |                   | length                | length of essay                                      |
|        |                   | user_id               | user associated this workout                         |
| DELETE | /essays           | id                    | deletes an essay, if user is authenticated           |
| POST   | /finish-review    | id                    | creates a user session                               |
|        |                   | username              | user name                                            |
|        |                   | password              | user password                                        |
|        |                   | comments              | workout comments and list of user-selected exercises |
| GET    | /current-essay    | id                    | returns current essay, if authenticated              |
| GET    | /essays-reviewed  |                       | returns all the current user's reviewed essays       |
| GET    | /essays-unreviewed|                       | returns all current user's unreviewed essays         |
| GET    | /essays-reviewable|                       | returns current user's reviewable essays             |
| GET    | /show_points      |                       | returns current user's points                        |

## Environment Setup

### Clone repository

**clone** the project repository from github: [https://github.com/roylee0912/revieword-frontend-react](https://github.com/roylee0912/revieword-frontend-react)

```console

$ git clone https://github.com/roylee0912/revieword-frontend-react
```

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```



### Application Install

When you're ready to start building your project, run:

```sh

cd revieword-frontend-react
npm install
cd revieword-express-backend
npm install

```

## Server Start

You can use the following commands to run the application:

- `cd revieword-express-backend (if you haven't already done that)
- npm run dev: run the backend on [http://localhost:3000](http://localhost:3000)
- cd ..
- `npm start`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

### Backend Shutdown

It should be possible to shutdown the server using [CTRL-C]. If that fails, follow these steps:

- `lsof -i tcp:9292`
  response:
  COMMAND PID USER ....
  ruby 1234 root ....
- `kill -9 1234`

## Usage

<div style="width:400px ; height:400px">



</div>

1. [`Login`] with your username & password. If this is your first time, create a user profile [`Sign Up`]
![image](https://user-images.githubusercontent.com/60560932/198585683-405ec66c-a80f-4c11-ab4a-042f26703724.png)

2. Go to [`Submit`] to start submitting essays. You start with 5 points and your essay will cost anywhere from 1-3 points to submit depending on its length
![image](https://user-images.githubusercontent.com/60560932/198585919-ee537167-3479-408f-b710-b30804b194f3.png)

3. Go to [`Review`] to start reviewing essays. See a list of 5 randomly selected unreviewed essays from other users and start reviewing. Feel free to highlight to help you read and mark any comments.
![image](https://user-images.githubusercontent.com/60560932/198586098-c8be2dca-fb71-4804-9867-8ca10dcff8ae.png)

4. Go to [`My Essays`] to see all the essays you posted. Delete an unreviewed essay, or see reviewed essays
![image](https://user-images.githubusercontent.com/60560932/198586116-00be50fc-c3c4-42a8-b18a-40b657160bb4.png)
![image](https://user-images.githubusercontent.com/60560932/198586148-1130c9b0-0ddb-49af-b806-558ffbd64c4f.png)
![image](https://user-images.githubusercontent.com/60560932/198586170-259bfc19-d8f0-4af7-b3fe-df488501f211.png)

5. Go to [`Logout`] to sign out of your account and get redirected back to the homepage.



## Project Status

- Project is: _in progress_.

## Room for Improvement

Backend:

- Implement refresh tokens for extra security
- Add Oauth for google signin

Frontend:

- Make the navbar contain more information
