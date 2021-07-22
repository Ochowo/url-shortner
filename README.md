# [Url-Shortner](https://shotly00.herokuapp.com/)
[![Build Status](https://app.travis-ci.com/Ochowo/url-shortner.svg?branch=develop)](https://app.travis-ci.com/Ochowo/url-shortner)

An application that shortens url.

### Deployment
App is deployed [here](https://shotly00.herokuapp.com/)

## Technologies Used
* [React](https://reactjs.org/) - JavaScript Library for Building User Interfaces
* [Redux](https://redux.js.org/) - Predictable State Container for JavaScript Apps
* [TailwindCss](https://tailwindcss.com/) - A Utility First CSS framework

## Features Implemented
* Users should be able to signin and signup
* Users should be able to paste a url link and shorten the link
* Users should be able to redirect to the url destination using the short url generated above
* Users can logout

## Getting Started
* Clone this repository using git clone `https://github.com/Ochowo/url-shortner.git`
* Use the .env.example file to setup your environmental variables and rename the file to .env
* Run `yarn install` to install all dependencies
* Run `yarn build` to build the project
* Run `yarn start` to start the server
* Navigate to `localhost:3001` in browser to access the application

## Using the Live App
The live application is hosted at [https://shotly00.herokuapp.com/](https://shotly00.herokuapp.com/).
To test the application, you can create short url or register/signin to the app to create and keep track of created short urls:
To register on the app you need:
* Email
* Password
* FirstName
* LastName
* phoneNumber

To login you need:
* Email,
* Password,
Registering/Login into the app will allow you to keep track of the statistics of the urls created by a user.

## Limitations
* Application is not using a real database rather it is storing data in local storage

