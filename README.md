# BetterBikeBrussels

## Description

Better Bike Brussels is a Progressive Web App imagined by and made for Brussels citizens to have a safe and hassle-free bike ride in the city.

Try it [now](https://better-bike-brussels.herokuapp.com)!

## Deployment

First, change the `next.config.js` file with the right info, in the case of the main instance:

```js
module.exports = {
    env: {
        APP_NAME: 'BetterBikeBrussels',
        APP_URL: 'https://better-bike-brussels.herokuapp.com',
        SERVER_URL: 'https://better-bike-brussels-backend.herokuapp.com',
        APP_KEY: '',
    },
}
```

BetterBikeBrussels uses Docker to ease the building and deployment procedure. 

BetterBikeBrussels is a NEXT.js app. As such if you don't want to use docker, you can run it locally using:

```bash
# Install npm dependencies
npm install

# Build website
npm run dev

# Start the service
npm run start
```

Please note the following requirements:

* Node.JS (^v10.x.x)
* npm (^v6.x.x)

### Installation from DockerHub

In the image on DockerHub, the `next.config.js` is set for the main instance. This might cause the image not the work properly with other domain names.

![Docker Image Version (latest by date)](https://img.shields.io/docker/v/lavendthomas/betterbikebrussels)

Pull the latest available container, here `20200727`:

```bash
docker pull lavendthomas/betterbikebrussels:20200727
```

Then, launch the container:

```bash
docker run --name betterbikebussels -p 3001:3001 -d <image_id>
```

You can change the port of the Web App by changing the second number of the `-p` option. The default is `3001`.

### Build the Docker container from source

First set a `PORT` environment variable for your desired port.

```bash
export PORT=3001    # choose your port here
```

Do not forget to update the `next.config.js` file.


Once this is done, you can build the docker image:

```bash
docker build -t <your-id>/betterbikebussels .
```

You now have built the container, you can run it:

```bash
docker run --name betterbikebussels -p 3001:3001 -d <your-id>/betterbikebussels
```

The web server is now up and running at the desired port.
