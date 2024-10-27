# User API Spec

## Create Payment

Endpoint: POST /api/payments (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "name": "test payment",
  "description": "test payment description", // optional
  "is_active": true
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test payment",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:10:01.201Z",
    "description": "test payment description",
    "is_active": true,
    "created_by_username": "testuser",
    "updated_by_username": "testuser"
  }
}
```

## List Payment (get all payments)

Endpoint: GET /api/payments/list

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "name": "test payment",
      "created_at": "2024-10-27T04:10:01.201Z",
      "updated_at": "2024-10-27T04:10:01.201Z",
      "description": "test payment description",
      "is_active": true,
      "created_by_username": "testuser",
      "updated_by_username": "testuser"
    },
    {
      "id": 2,
      "name": "test payment 2",
      "created_at": "2024-10-27T04:10:01.201Z",
      "updated_at": "2024-10-27T04:10:01.201Z",
      "description": "test payment description 2",
      "is_active": false,
      "created_by_username": "testuser2",
      "updated_by_username": "testuser2"
    }
  ]
}
```

## Search Payment

Endpoint: GET /api/payments (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Query:

- name: test
- size: 1 (if undefined set to 10 as default value)
- cursor: undefined | number -> get from id

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "name": "test payment",
      "created_at": "2024-10-27T04:10:01.201Z",
      "updated_at": "2024-10-27T04:10:01.201Z",
      "description": "test payment description",
      "is_active": true,
      "created_by_username": "testuser",
      "updated_by_username": "testuser"
    }
  ],
  "paging": {
    "total": 1,
    "hasMore": true,
    "cursor": 1
  }
}
```

## Update Payment

Endpoint: PUT /api/payments/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "name": "test payment changed",
  "description": "test payment description changed", // optional
  "is_active": false
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test payment changed",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:39:02.372Z",
    "description": "test payment description changed",
    "is_active": false,
    "created_by_username": "testuser",
    "updated_by_username": "testuser2"
  }
}
```

## Remove Payment

Endpoint: DELETE /api/payments/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test payment changed",
    "created_at": "2024-10-27T04:10:01.201Z",
    "updated_at": "2024-10-27T04:39:02.372Z",
    "description": "test payment description changed",
    "is_active": false,
    "created_by_username": "testuser",
    "updated_by_username": "testuser2"
  }
}
```
