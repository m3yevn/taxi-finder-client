# Taxi Finder Client 🚕
This is a technical practice to write a single page web application to find taxi.

### About ℹ️

The task is to create a single page Javascript application using React.
The page should feature a map. The map should show markers illustrating
the up-to-date locations of on-demand taxis in the area.
The page should also feature a UI slider, that enables to change the
amount of drivers displayed on the map. The range should be 1-50.
In order to find the location of local Taxi's, will need to contact API,
and get a list of driver locations.
This endpoint will return a list of driver locations, nearby to the location.

### Tech Stack 📚

 - React for Frontend
 - Rebass for UI
 - Leaflet for canvas map
 - Apollo for GraphQL
 - Jest for testing
 
### Note 🌞

Due to CORS issue on the API, it is not able to call API directly from browser client app.
Therefore, a GraphQL server is developed for calling REST API and act as a medium.
In order to start this project, the GraphQL server is required to run first.
Below is the git repository for it

https://github.com/m3yevn/taxi-finder-graphql/

### How to setup ⚙️

```sh
    $ git clone
    $ npm install
```

### How to run normally 🏃‍♂️

``
    $ npm run start
``

###### The project should be running on http://localhost:3000

### How to test 🧪

``
    $ npm run test
``

### Docker repository 🐳

 - This project image is available at
 - https://hub.docker.com/repository/docker/m3yevn/taxi-finder-client

## ![Docker Pulls](https://img.shields.io/docker/pulls/m3yevn/taxi-finder-client?style=for-the-badge)

### How to run on docker

```sh
    $ docker pull m3yevn/taxi-finder-client:latest
    $ docker run -d -p 3000:80 --name taxi-finder-client m3yevn/taxi-finder-client:latest
```

### How to build docker image

```sh
    $ docker build -t <**image_tag**> .
```

### Screenshot 📸

<img src="screenshots/taxi-finder-client-ss.png" alt="screenshot" />
