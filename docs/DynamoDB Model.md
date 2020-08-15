# Database Model

# Access Patterns

|  # |     Entity     | Use Case                        | Lookup Parameters      | Index | Key Conditions                                                | Filter |
|:--:|:--------------:|---------------------------------|------------------------|-------|---------------------------------------------------------------|--------|
| 1  | `ADMIN`        | `getAdmin`                      | `email/password`       | Main  | `PK=ADMIN#<email> AND SK=ADMIN#<password>`                    |        |
| 2  | `USERS`        | `getAllUsers`                   |                        | Main  | `PK=begins_with(USER) AND SK=PROFILE`                         |        |
| 3  | `USERS`        | `getUserProfile`                | `email`                | Main  | `PK=USER#<email> AND SK=PROFILE`                              |        |
| 4  | `ORDERS`       | `getOrderForUser`               | `email/location/order` | GSI1  | `PK=USER#<email> AND SK=ORDER#<location>#<order>`             |        |
| 5  | `ORDERS`       | `getOrdersFromLocation`         | `location`             | Main  | `PK=begins_with(ORDER#<location>) AND SK=META`                |        |
| 6  | `ORDERS`       | `getOrdersByStatus`             | `status`               | GSI1  | `PK=<status> AND SK=begins_with(ORDER)`                       |        |
| 7  | `ORDERS`       | `getOrdersFromLocationByStatus` | `status/location`      | GSI1  | `PK=<status> AND SK=begins_with(ORDER#<location>)`            |        |
| 8  | `ORDERS`       | `getAllOrders`                  |                        | Main  | `PK=begins_with(ORDER) AND SK=META`                           |        |
| 9  | `TRANSACTIONS` | `getOrderTransactions`          | `location/order`       | Main  | `PK=ORDER#<location>#<order> AND SK=begins_with(TRANSACTION)` |        |
| 10 | `USERS`        | `getAllUsersFromLocation`       | `location`             | Main  | `PK=begins_with(USER) and SK=begins_with(ORDER#<location>)`   |        |
| 11 | `USERS`        | `getUsersByOrderStatus`         | `status`               | GSI1  | `PK=<status> and SK=begins_with(USER)`                        |        |
