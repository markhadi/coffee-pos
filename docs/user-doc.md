# User API Spec

## Register User

Endpoint: POST /api/users (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "username": "test",
  "password": "test",
  "name": "test"
}
```

Response Body (Success):

```json
{
  "data": "generated_access_token"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "test",
  "password": "test"
}
```

Response Body (Success):

```json
{
  "data": "generated_access_token"
}
```

## Refresh Token

Endpoint: GET /api/users/refresh

Request Body (Success):

```json
{
  "data": "generated_access_token"
}
```

## Search User

Endpoint: GET /api/users (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Query:

- search: test (it searches by username or name)
- size: 1 (if undefined set to 10 as default value)
- cursor: undefined | number -> get from id

Response Body (Success):

```json
{
  "data": [
    {
      "username": "test",
      "name": "test",
      "role": "ADMIN",
      "created_at": "2024-10-27T04:10:01.201Z",
      "updated_at": "2024-10-27T04:10:15.986Z"
    }
  ],
  "paging": {
    "total": 1,
    "hasMore": true,
    "cursor": 1
  }
}
```

## Update User

Endpoint: PUT /api/users/:username (admin only)

Request Params:

- username: test

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "name": "test2",
  "role": "ADMIN",
  "password": "test (if empty it means no changes)" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "test",
    "name": "test2",
    "role": "ADMIN",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:10:15.986Z"
  }
}
```

## Remove User

Endpoint: DELETE /api/users/:username (admin only)

Request Params:

- username: test

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": {
    "username": "test",
    "name": "test2",
    "role": "ADMIN",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:10:15.986Z"
  }
}
```

## Logout User

Endpoint: DELETE /api/users/logout

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": {
    "username": "test",
    "name": "test2",
    "role": "ADMIN",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:10:15.986Z"
  }
}
```
