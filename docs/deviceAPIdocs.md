Base url: `http://localhost:5000/`

- [Get The Latest Temperature API](#get-the-latest-temperature-api)
- [Get The Latest Humidity API](#get-the-latest-humidity-api)
- [Get The Latest Light Status API](#get-the-latest-light-status-api)
- [Get The Latest Fan Data API](#get-the-latest-fan-data-api)

- [Set Fan Data API](#set-fan-data-api)
- [Set LED Data API](#set-led-data-api)
- [Get Last 7 Days Temperature API](#get-last-7-days-temperature-api)
- [Get Last 7 Days Humidity API](#get-last-7-days-temperature-api)
- [Get warnings API](#get-the-number-of-warnings-in-day-api)

# Get The Latest Temperature API

This API endpoint retrieves the latest temperature data.

## Request

`GET api/data/currentTemperature`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `yolo-sensor`.                            |
| value      | string    | Latest temperature value.                 |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8Q4720CM3QKRDBZCRA52H7RC",
    "feed_id": 2446726,
    "value": "29",
    "location": null,
    "created_at": "2023-03-19T15:16:40Z",
    "updated_at": "2023-03-19T15:16:40Z",
    "expiration": "1681831000.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "yolo-sensor",
    "message": "successful"
}
```

# Get The Latest Humidity API

This API endpoint retrieves the current humidity data.

## Request

`GET api/data/currentHumid`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `dht20-humid`.                            |
| value      | string    | Latest humidity value.                    |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8Q46RW97WTE31GWF28KWJ0M3",
    "feed_id": 2447171,
    "value": "65",
    "location": null,
    "created_at": "2023-03-19T15:16:11Z",
    "updated_at": "2023-03-19T15:16:11Z",
    "expiration": "1681830971.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "dht20-humid",
    "message": "successful"
}
```

# Get the Latest Fan Data API

This API endpoint retrieves the latest fan status.

## Request

`GET api/data/lastFan`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| message    | string    | `successful`.                             |
| feed_key   | string    | `yolo-fan`.                               |
| value      | string    | Latest fan status. "0" is off, "1" is on. |
| created_at | string    | The time it was created. ISO Date Format. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "yolo-fan",
    "message": "successful"
}
```

# Get The Latest Light Status API

This API endpoint retrieves the latest light status.

## Request

`GET api/data/lastLed`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property   | Data type | Description                                 |
| ---------- | --------- | ------------------------------------------- |
| message    | string    | `successful`.                               |
| feed_key   | string    | `yolo-led`.                                 |
| value      | string    | Latest light status. "0" is off, "1" is on. |
| created_at | string    | The time it was created. ISO Date Format.   |

#### Example

```json
{
    HTTP/1.1 200 OK
    "id": "0F8PXHVDHFZ0PT9WWC793C30S0",
    "feed_id": 2447170,
    "value": "1",
    "location": null,
    "created_at": "2023-03-19T09:04:04Z",
    "updated_at": "2023-03-19T09:04:04Z",
    "expiration": "1681808644.0",
    "lat": null,
    "lon": null,
    "ele": null,
    "feed_key": "yolo-led",
    "message": "successful"
}
```

# Set Fan Data API

This endpoint is used to set fan status.

## Request

`POST api/data/setFan`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                                        |
| -------- | ------ | ---------------------------------------------------------------------------------- |
| value    | string | Required. The value set to fan level. Value range is from "0" (min) to "100" (max) |

### Example

```json
{
  "value": "100"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```

# Set LED Data API

This endpoint is used to set LED status.

## Request

`POST api/data/toggleLed`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

### Request Body

| Property | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| value    | string | Required. The value set to status of light. "0" is off, "1" is on |

### Example

```json
{
  "value": "1"
}
```

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description          |
| ----------- | -------------------- |
| 201         | Created. Successful. |

#### Response Body

| Property | Data type | Description     |
| -------- | --------- | --------------- |
| message  | string    | Just a message. |

#### Example

```json
{
    HTTP/1.1 201 Created
    "message": "Set data successful"
}
```

### Response Failed

#### HTTP Status Code

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request. `Value is not sent!` or `Value is invalid`. |
| 401         | Unauthorized. Not logged in.                             |
| 403         | Forbidden.                                               |

#### Response Body

| Property | Data type | Description    |
| -------- | --------- | -------------- |
| message  | string    | Error message. |

#### Example

```json
{
    HTTP/1.1 400 Bad Request
    "message": "Value is invalid"
}
```

# Get Last 7 Days Temperature API

This endpoint is used to get the each day average temperatures in 7 days.

## Request

`GET api/data/weektemperatures`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Authorization | Required. Set to `Bearer <access token>`. |

| Param | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| date  | Optional. `ISO Date Format` of the time in day need to get data. |

### Example

`api/data/weektemperatures`

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property | Data type | Description                  |
| -------- | --------- | ---------------------------- |
| feed_key | string    | Name of feed.                |
| data     | array     | Array contains objects data. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "feed_key": "yolo-sensor",
    "data": [
        {
        "dow": "Sunday",
        "value": 32.09090909090909
        },
        ...
        {
        "dow": "Tuesday",
        "value": 31.78048780487805
        },
        {
        "dow": "Wesnesday",
        "value": 30.779661016949152
        },
        ...
        {
        "dow": "Yesterday",
        "value": 30.346153846153847
        }
    ]
}
```

# Get Last 7 Days Humidity API

This endpoint is used to get the avarage humidity of each day in last 7 days.

## Request

`GET api/data/weekhumids`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Authorization | Required. Set to `Bearer <access token>`. |

| Param | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| date  | Optional. `ISO Date Format` of the time in day need to get data. |

### Example

`api/data/weekhumids`

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property | Data type | Description                  |
| -------- | --------- | ---------------------------- |
| feed_key | string    | Name of feed.                |
| data     | array     | Array contains objects data. |

#### Example

```json
{
    HTTP/1.1 200 OK
    "feed_key": "dht20-humid",
    "data": [
        {
        "dow": "Sunday",
        "value": 32.09090909090909
        },
        ...
        {
        "dow": "Tuesday",
        "value": 31.78048780487805
        },
        {
        "dow": "Wesnesday",
        "value": 30.779661016949152
        },
        ...
        {
        "dow": "Yesterday",
        "value": 30.346153846153847
        }
    ]
}
```

# Get The Number of Warnings in day API

This API endpoint count the warning which has high temperature in day.

## Request

`GET api/data/todayWarnings`

### Request Header

| Header        | Description                               |
| ------------- | ----------------------------------------- |
| Content-Type  | Required. Set to `application/json`.      |
| Authorization | Required. Set to `Bearer <access token>`. |

## Response

### Successful Response

#### HTTP Status Code

| Status Code | Description     |
| ----------- | --------------- |
| 200         | OK. Successful. |

#### Response Body

| Property      | Data type | Description       |
| ------------- | --------- | ----------------- |
| warning_times | integer   | Number of warning |

#### Example

```json
{
    HTTP/1.1 2.0 OK
    "warning_times": 3
}
```
