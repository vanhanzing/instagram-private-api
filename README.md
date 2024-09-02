## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Get Threads API

### Endpoint

`POST /get-threads`

### Description

This API is used to retrieve threads for a specific user.

### Request

#### URL

`http://localhost:4200/get-threads`

#### Headers

- `Content-Type: application/json`

#### Body

```json
{
  "username": "example@test.com",
  "password": "Example123"
}
```
