# User API Spec

## Create Product

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
