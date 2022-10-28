# Revieword

![revieword-gif](https://user-images.githubusercontent.com/60560932/198585461-68f7702a-a12d-4004-b727-bc26e52d7c48.gif)
Check out our live frontend [_here_](google.com)

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

This project, part of Flatiron Software Engineering track, Phase 4, focused on implementing a React frontend and Rails
backend. Authentication requires users to login and protects data access. Servers are deployed to Heroku. We worked as a team of three to develop both the frontend and backend servers in one week.

## GitHub Repo

- [Monorepo - frontend and backend servers](https://github.com/roylee0912/revieword)

## Technologies Used

- Ruby 2.7.4
- Rails 6.1.3
- Active Model Serializers 0.10.12
- NodeJS (v16), and npm
- Postgresql 1.1
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

**clone** the project repository from github: [https://github.com/roylee0912/revieword](https://github.com/roylee0912/revieword)

```console
$ git clone https://github.com/roylee0912/revieword
```

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```sh
ruby -v
```

Make sure that the Ruby version you're running is listed in the [supported
runtimes][] by Heroku. At the time of writing, supported versions are 2.6.8,
2.7.4, or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site
for the latest supported versions.

If it's not, you can use `rvm` to install a newer version of Ruby:

```sh
rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```

[supported runtimes]: https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

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
bundle install
rails db:create
npm install --prefix client
```

## Server Start

You can use the following commands to run the application:

- `rails db:migrate`: migrate the database
- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
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
2. Go to [`Submit`] to start submitting essays. You start with 5 points and your essay will cost anywhere from 1-3 points to submit depending on its length
3. Go to [`Review`] to start reviewing essays. See a list of 5 randomly selected unreviewed essays from other users and start reviewing. Feel free to highlight to help you read and mark any comments.
4. Go to [`Logout`] to sign out of your account and get redirected back to the homepage.


## Project Status

- Project is: _in progress_.

## Room for Improvement

Backend:

- Add Highlights class so highlights from a user review will persist to database

Frontend:

- add mobile responsiveness
- add a preloading screen
