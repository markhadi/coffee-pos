# User API Spec

## Create Category

Endpoint: POST /api/categories (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "name": "test category"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test category"
  }
}
```

## List Category (get all categories)

Endpoint: GET /api/categories/list (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "name": "test category"
    },
    {
      "id": 2,
      "name": "test category 2"
    }
  ]
}
```

## Search Category

Endpoint: GET /api/categories (admin only)

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
      "name": "test category"
    }
  ],
  "paging": {
    "total": 1,
    "hasMore": true,
    "cursor": 1
  }
}
```

## Update Category

Endpoint: PUT /api/categories/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "name": "test category 2"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test category 2"
  }
}
```

## Remove Category

Endpoint: DELETE /api/categories/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test category 2"
  }
}
```
