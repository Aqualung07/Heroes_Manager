# HeroesManager

Application that lets you manage a list of Heroes and view their attributes in detail.

## Setup

  * Clone the repository on your preferred folder.
  * Run `npm install` on the project root location.
  * Run `npm run start` to run both the client application and server.
  * If the client application doesn't automatically launch on your browser, navigate to `localhost:4300`.
  
  <b>If you want to run the client application on a docker container:</b>
  
  * Make sure you have Docker installed. If you don't, this is the easiest way to start ->`https://www.docker.com/products/docker-desktop/`.
  * On the root project directory, run `npm run serve:api` to launch the mock server application. (Future improvement: Dockerize server)
  * On the same root directory, run `./dockerize-front.sh` on your preferred bash shell.
  * Once the image is created and the container is up, navigate to `localhost:8080` to see the client application running.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
