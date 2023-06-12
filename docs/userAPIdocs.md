- [Registry API](#register-api)
- [Login API](#login-api)



# Register API

This endpoint is used to register new user

## Request

`POST api/user/register`

### Request Header

| Header       | Description                          |
| ------------ | ------------------------------------ |
| Content-Type | Required. Set to `application/json`. |

### Request Body

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| email    | string | **Required**. The username of the user. |
| password | string | **Required**. The password of the user. |
| name | string | **Required**. The user name of  the user

### Example

```json
{
    "email": "your_email@git.com",
    "password": "your_password",
    "name": "your_username"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description           |
| ----------- | --------------------- |
| 201         | OK. Registry successful. |

#### Response Body

| Property | Data type | Description   |
| -------- | --------- | ------------- |
| \_id     | string    | User ID.      |
| name     | string    | Name.         |
| email    | string    | Email.        |
| avatar   | string    | Avatar URL.   |
| token    | string    | Access token. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "_id": "63fa0de6bc0cfe32d5705230",
    "name": "Nguyen Tuan",
    "email": "ndtuan@gmail.com",
    "avatar": "Images url",
    "token": "access token :<<"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                |
| ----------- | -------------------------- |
| 400         | Bad Request. Email has already used! |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Email has already used!"
}
```

---

# Login API

This endpoint is used to log in a user and receive a session token.

## Request

`POST api/user/login`

### Request Header

| Header       | Description                          |
| ------------ | ------------------------------------ |
| Content-Type | Required. Set to `application/json`. |

### Request Body

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| email    | string | Required. The username of the user. |
| password | string | Required. The password of the user. |

### Example

```json
{
    "email": "your_email@gmail.com",
    "password": "your_password"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK. Login successful. |

#### Response Body

| Property | Data type | Description   |
| -------- | --------- | ------------- |
| \_id     | string    | User ID.      |
| name     | string    | Name.         |
| email    | string    | Email.        |
| avatar   | string    | Avatar URL.   |
| token    | string    | Access token. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "_id": "63fa0de6bc0cfe32d5705230",
    "name": "Nguyen Tuan",
    "email": "ndtuan@gmail.com",
    "avatar": "Images url",
    "token": "access token :<<"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                |
| ----------- | -------------------------- |
| 400         | Bad Request. Login failed. |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Invalid email or password"
}
```