# User API Spec

## Create Transaction

Endpoint: POST /api/transactions

Request Header:

- Authorization: Bearer YourAccessToken

Request Body:

```json
{
  "customer_name": "test customer", // max 10 chars
  "total_quantity": 10, // calculated from its items
  "total_amount": 1000, // calculated from its items
  "payment_method_id": 1,
  "service_charge": 0.11, // 0 - 1 (0% - 100%) -> 0.11 means 11%
  "tansaction_items": [
    {
      "product_id": 1,
      "quantity": 5,
      "amount": 500 // calculated by frontend -> quantity * product price (assume 100)
    },
    {
      "product_id": 2,
      "quantity": 5,
      "amount": 500 // calculated by frontend -> quantity * product price (assume 100)
    }
  ]
}
```

Response Body (Success):

```json
{
  "data": {
    "transaction_id": "TF30004955",
    "customer_name": "test customer",
    "total_quantity": 10,
    "total_amount": 1000,
    "payment_method_id": 1,
    "payment_method": "test payment", // from payment.name
    "service_by": "testuser",
    "username": "testuser",
    "service_charge": 0.11,
    "issued_at": "2024-10-27T04:55:55.000Z",
    "transaction_items": [
      {
        "id": 1,
        "transaction_id": "TF30004955",
        "product_id": 1,
        "quantity": 5,
        "amount": 500,
        "product_name": "test product 1",
        "product_price": 100,
        "product_category_id": 1,
        "product_category_name": "test category"
      },
      {
        "id": 2,
        "transaction_id": "TF30004955",
        "product_id": 2,
        "quantity": 5,
        "amount": 500,
        "product_name": "test product 2",
        "product_price": 100,
        "product_category_id": 2,
        "product_category_name": "test category 2"
      }
    ]
  }
}
```

## Get Todays Sales

Endpoint: GET /api/transactions/today-sales

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{ "data": 22.2 }
```

## Count Todays Transactions

Endpoint: GET /api/transactions/today-count

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{ "data": 1 }
```

## Get Average

Endpoint: GET /api/transactions/average

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{ "data": 22.2 }
```

## Get Last 7 Days Sales

Endpoint: GET /api/transactions/last-7-days-sales

Request Header:

- Authorization: Bearer YourAccessToken

Response Body (Success):

```json
{
  "data": [
    { "date": "10-21", "totalSale": 0 },
    { "date": "10-22", "totalSale": 0 },
    { "date": "10-23", "totalSale": 0 },
    { "date": "10-24", "totalSale": 0 },
    { "date": "10-25", "totalSale": 0 },
    { "date": "10-26", "totalSale": 0 },
    { "date": "10-27", "totalSale": 22.2 }
  ]
}
```

## Search / List of Transactions using cursor based

Endpoint: GET /api/transactions

Request Header:

- Authorization: Bearer YourAccessToken

Request Query:

- size: number
- cursor: string | undefined -> get from transaction_id which is string

Response Body (Success):

```json
{
  "data": [
    {
      "customer_name": "Test Customer",
      "issued_at": "2024-10-27T08:51:28.506Z",
      "payment_method": "test payment method",
      "payment_method_id": 163,
      "service_by": "test",
      "service_charge": 0.11,
      "total_amount": 22.2,
      "total_quantity": 2,
      "transaction_id": "TF30019088",
      "username": "test"
    }
  ],
  "paging": { "hasMore": false, "total": 1 }
}
```

## Get Sales by Date Range

Endpoint: GET /api/transactions

Request Header:

- Authorization: Bearer YourAccessToken

Request Query:

- from: Date string (e.g: "2024-10-26") -> mandatory if empty will throw error 400
- to: Date string (e.g: "2024-10-27" -> if you want it includes 27 so you must write "2024-10-28") -> mandatory if empty will throw error 400

Response Body (Success):

```json
{
  "data": [
    { "date": "2024-10-26", "numberOfTransactions": 0, "totalSales": 0 },
    { "date": "2024-10-27", "numberOfTransactions": 1, "totalSales": 22.2 }
  ]
}
```
