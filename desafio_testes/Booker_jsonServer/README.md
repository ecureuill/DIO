JSON SERVER FOR A BOOKING API
===============================
This is a project for DIO's QA BOOTCAMP.
We've been chalange to prototype a server with authentication as an exercise to test new endpoints based in Restful-Booker

## Getting started

Clone this repo

```bash
git clone git@github.com:ecureuill/DIO_GFT_QA_2022.git
```
Install project's dependecies

```bash
cd DIO_GFT_QA_2022/desafio_testes/Booker_jsonServer/hotelroom/
npm install
```
Start Json server

```bash
npm run dev
```

## End Points

### Register Users
Any of the following routes registers a new user :

    POST /register
    POST /signup
    POST /users

*Request Body*

```json
{
    "email": "test@email.com",
    "senha": "123456",
    "firstname": "Sally",
    "lastname": "Brown"
}
```

*Response (201 Created)*
The response contains the JWT access token (expiration time of 1 hour), and the user data (without the password)

```json
{
    "accessToken": "xxxxxx.xxxxxx.xxxxxx",
    "user": {
        "email": "test@mail.com",
        "firstname": "Sally",
        "lastname": "Brown",
        "id": 1
    }
}
```

### Retrieve Users
Any of the following routes logs an existing user in :

    POST /login
    POST /signin

*Request Body*

```json
{
    "email": "test@email.com",
    "senha": "123456",
}
```

*Response (200 OK)*
The response contains the JWT access token (expiration time of 1 hour), and the user data (without the password)

```json
{
    "accessToken": "xxxxxx.xxxxxx.xxxxxx",
    "user": {
        "email": "test@mail.com",
        "firstname": "Sally",
        "lastname": "Brown",
        "id": 1
    }
}
```


### Retrieve Users
Any of the following routes registers a new user :

    GET /register/:id?_embed=booking
    GET /signup/:id?_embed=booking
    GET /users/:id?_embed=booking

*Request Body*

```json
{
    "email": "test2@mail.com",
    "password": "$2a$10$lCLBKF7fPexaUFc8vwpBNOfPE.AfwNP.MBE43hvhuzQD0a9zz4mNi",
    "id": 2,
    "booking": []
    }
}
```

*Response (403 Forbiden)*
 User must own the resource to write or read it

```json
    "Private resource access: entity must have a reference to the owner id"
```

### Retrieve Hotel BedRooms

    ?_sort=[json_parameter]&_order=[desc|asc]
    ?price_lte=[value]
    ?price_gte=[value]
    ?_embed=booking

*Response (200 OK)*
The response contains the user data (without the password) and any booking related do the user:

```json
[
    {
        "id": 1,
        "room": 100,
        "size": 31,
        "type": "Suite",
        "occupancy": 2,
        "vacancy": false,
        "bedDetais": {
            "numberOfBeds": 1,
            "typeOfBed": {
                "singlebed": 0,
                "doublebed": 1
            }
        },
        "numberOfFullBathrooms": 1,
        "numberOfPartialBathrooms": 0,
        "petallowed": false,
        "smokingAllowed": true,
        "price": 500
    }
]
```

#### Retrieve Hotel BedRooms with Related Bookings

    GET /dorms/?_embed=booking

*Response (200 OK)*
The response contains the dorms data and any booking related do the dorm:

```json
[
    {
        "id": 1,
        "room": 100,
        "size": 31,
        "type": "Suite",
        "occupancy": 2,
        "vacancy": false,
        "bedDetais": {
            "numberOfBeds": 1,
            "typeOfBed": {
                "singlebed": 0,
                "doublebed": 1
            }
        },
        "numberOfFullBathrooms": 1,
        "numberOfPartialBathrooms": 0,
        "petallowed": false,
        "smokingAllowed": true,
        "price": 500,
        "booking": [
            {
                "id": 1,
                "dormId": 1,
                "userId": 2,
                "firstname": "Sally",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2013-02-23",
                    "checkout": "2014-10-23"
                },
                "additionalneeds": "Breakfast"
            }
        ]
    }
]
```

### Create Hotel BedRoom

    POST /dorm/
*Request Body*

```json
{
    "room": 200,
    "size": 24,
    "type": "Economic",
    "occupancy": 2,
    "vacancy": true,
    "bedDetais": {
        "numberOfBeds": 1,
        "typeOfBed": {
            "singlebed": 1,
            "doublebed": 0
        }
    },
    "numberOfFullBathrooms": 0,
    "numberOfPartialBathrooms": 0,
    "petallowed": false,
    "smokingAllowed": false,
    "price": 150
}
```

*Response (200 OK)*

```json
{
    "room": 200,
    "size": 24,
    "type": "Economic",
    "occupancy": 2,
    "vacancy": true,
    "bedDetais": {
        "numberOfBeds": 1,
        "typeOfBed": {
            "singlebed": 1,
            "doublebed": 0
        }
    },
    "numberOfFullBathrooms": 0,
    "numberOfPartialBathrooms": 0,
    "petallowed": false,
    "smokingAllowed": false,
    "price": 150,
    "id": 2
}
```

*Response (401 Unauthorized)*
 User must be logged to create

```json
    "Missing authorization header"
```

### Update Hotel BedRoom

    PUT /dorm/:id
*Request Body*

```json
{
    "room": 200,
    "size": 24,
    "type": "Economic",
    "occupancy": 2,
    "vacancy": true,
    "bedDetais": {
        "numberOfBeds": 2,
        "typeOfBed": {
            "singlebed": 2,
            "doublebed": 0
        }
    },
    "numberOfFullBathrooms": 0,
    "numberOfPartialBathrooms": 0,
    "petallowed": false,
    "smokingAllowed": false,
    "price": 200
}
```

*Response (201 Created)*

```json
{
    "room": 200,
    "size": 24,
    "type": "Economic",
    "occupancy": 2,
    "vacancy": true,
    "bedDetais": {
        "numberOfBeds": 2,
        "typeOfBed": {
            "singlebed": 2,
            "doublebed": 0
        }
    },
    "numberOfFullBathrooms": 0,
    "numberOfPartialBathrooms": 0,
    "petallowed": false,
    "smokingAllowed": false,
    "price": 200,
    "id": 2
}
```

*Response (401 Unauthorized)*
 User must be logged to create

```json
    "Missing authorization header"
```

*Response (404 Not Found)*
 Id not existent id

```json
{}
```

### Partial Update Hotel BedRoom

    PATCH /dorm/:id
*Request Body*

```json
{
    "vacancy": false
}
```

*Response (201 Created)*

```json
{
    "room": 200,
    "size": 24,
    "type": "Economic",
    "occupancy": 2,
    "vacancy": false,
    "bedDetais": {
        "numberOfBeds": 2,
        "typeOfBed": {
            "singlebed": 2,
            "doublebed": 0
        }
    },
    "numberOfFullBathrooms": 0,
    "numberOfPartialBathrooms": 0,
    "petallowed": false,
    "smokingAllowed": false,
    "price": 200,
    "id": 2
}
```

*Response (401 Unauthorized)*
 User must be logged to create

```json
    "Missing authorization header"
```

*Response (404 Not Found)*
 User must be logged to create

```json
{}
```

### Delete Hotel BedRoom

    DELETE /dorm/:id
*Response (200 OK)*

```json
{}
```

*Response (401 Unauthorized)*
 User must be logged to create

```json
    "Missing authorization header"
```

*Response (404 Not Found)*
 Id not existent id

```json
{}
```

### Retrieve Bookings

*Response (200 OK)*

    GET /booking/:id
```json
[
    {
        "id": 1,
        "dormId": 1,
        "userId": 2,
        "firstname": "Sally",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2013-02-23",
            "checkout": "2014-10-23"
        },
        "additionalneeds": "Breakfast"
    }
]
```

*Response (401 Unauthorized)*
 User must own the resource to write or read it

```json
    "Cannot read properties of undefined (reading 'userId')"
```

### Create Booking

    POST /booking/
*Request Body*
    `userId` must be the id of the logged user
    `dormId` must be the id of an existent dorm

```json
{
    "dormId": 2,
    "userId": 2,
    "totalprice":"100",
    "depositpaid":"false",
    "bookingdates":
    {
        "checkin":"2023-01-01",
        "checkout":"2023-01-15"
    },
    "additionalneeds":"café da manha"
}
```

*Response (201 Created)*

```json
{
    "dormId": 2,
    "userId": 2,
    "totalprice": "100",
    "depositpaid": "false",
    "bookingdates": {
        "checkin": "2023-01-01",
        "checkout": "2023-01-15"
    },
    "additionalneeds": "café da manha",
    "id": 2
}
```

*Response (403 Forbidden)*
 
```json
    "Private resource creation: request body must have a reference to the owner id"
```

### Update Booking

    PUT /booking/
*Request Body*
    `userId` couldn't be replaced
    `dormId` must be the id of an existent dorm

```json
{
    "dormId": 2,
    "userId": 2,
    "totalprice":"200",
    "depositpaid":true,
    "bookingdates":
    {
        "checkin":"2023-01-01",
        "checkout":"2023-01-15"
    },
    "additionalneeds":"café da manha"
}
```

*Response (200 OK)*

```json
{
    "dormId": 2,
    "userId": 2,
    "totalprice": "200",
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2023-01-01",
        "checkout": "2023-01-15"
    },
    "additionalneeds": "café da manha",
    "id": 2
}
```

*Response (403 Forbidden)*
 User must own the resource to write or read it

```json
    "Private resource access: entity must have a reference to the owner id"
```
### Partial Update Booking

    PATCH /booking/:id
*Request Body*

```json
{
    "depositpaid": false
}
```

*Response (201 Created)*

```json
{
    "dormId": 2,
    "userId": 3,
    "totalprice": "200",
    "depositpaid": false,
    "bookingdates": {
        "checkin": "2023-01-01",
        "checkout": "2023-01-15"
    },
    "additionalneeds": "café da manha",
    "id": 1
}
```

*Response (401 Unauthorized)*
 User must be logged

```json
    "Missing authorization header"
```
*Response (403 Forbidden)*
 User must own the resource to write or read it

```json
    "Private resource access: entity must have a reference to the owner id"
```


### Delete Booking

    DELETE /booking/:id
*Response (200 OK)*

```json
{}
```

*Response (403 Forbidden)*
 User must own the resource

```json
    "Private resource access: entity must have a reference to the owner id"
```

*Response (404 Not Found)*
 Id not existent id

```json
{}
```

## How I run from Docker

DockerFile

```bash
FROM debian:bullseye-slim
ENV NODE_VERSION 16.17.0
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive  && \
    apt-get install -y  sudo curl wget nano locales git-core git gnupg zsh fonts-powerline && \
### node  ###
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash - && \
    apt-get install -y nodejs && \
    npm -v && \
    node -v
### user  ###
    adduser --quiet --disabled-password --home /home/devuser --shell /bin/zsh --gecos "User" devuser && \
    echo devuser:pass | chpasswd && \
    usermod -aG sudo devuser && \
### locales ###
    rm -rf /var/lib/apt/lists/* && \
    localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8
USER devuser
WORKDIR /home/devuser/development
CMD ["zsh"]
```

On terminal 

```bash
# Create image
sudo docker build /path/to/dockerfile-directory -tag devenv:nodejs_16.17.0
# Create a network to connect to other containers (optional)
sudo docker network create myappnet
# cd to desired development directory on host
cd /Dev/nodejs.projects
# Run Docker
sudo docker run --name nodejsenv --rm -it --mount type=bind,source="$(pwd)",target=/home/devuser/development --privileged -v /dev/bus/usb:/dev/bus/usb --net myappnet --publish 3000:3000 devenv:nodejs_16.17.0
##Follow Get Start steps
```
