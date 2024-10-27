# User API Spec

## Create Product

Endpoint: POST /api/products (admin only)

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "code": "TESTCODE10", // max 10 chars
  "name": "test product",
  "stock": 10,
  "price": 10000,
  "category_id": 1
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test product",
    "created_at": "2024-10-27T04:44:54.909Z",
    "updated_at": "2024-10-27T04:44:54.909Z",
    "code": "TESTCODE10",
    "created_by_username": "testuser",
    "updated_by_username": "testuser",
    "stock": 10,
    "price": 10000,
    "category_id": 1
  }
}
```

## Search Product

Endpoint: GET /api/products (admin only)

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
      "name": "test product",
      "created_at": "2024-10-27T04:44:54.909Z",
      "updated_at": "2024-10-27T04:44:54.909Z",
      "code": "TESTCODE10",
      "created_by_username": "testuser",
      "updated_by_username": "testuser",
      "stock": 10,
      "price": 10000,
      "category_id": 1
    }
  ],
  "paging": {
    "total": 1,
    "hasMore": true,
    "cursor": 1
  }
}
```

## Update Product

Endpoint: PUT /api/products/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "code": "TESTCODE10", // max 10 chars
  "name": "test product changed",
  "stock": 5,
  "price": 12000,
  "category_id": 2
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test product changed",
    "created_at": "2024-10-27T04:44:54.909Z",
    "updated_at": "2024-10-27T04:46:37.963Z",
    "code": "TESTCODE10",
    "created_by_username": "testuser",
    "updated_by_username": "testuser2",
    "stock": 5,
    "price": 12000,
    "category_id": 2
  }
}
```

## Remove Product

Endpoint: DELETE /api/products/:id (admin only)

Request Params:

- id: 1

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "name": "test product changed",
    "created_at": "2024-10-27T04:44:54.909Z",
    "updated_at": "2024-10-27T04:46:37.963Z",
    "code": "TESTCODE10",
    "created_by_username": "testuser",
    "updated_by_username": "testuser2",
    "stock": 5,
    "price": 12000,
    "category_id": 2
  }
}
```
