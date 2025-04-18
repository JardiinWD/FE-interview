# API Layer

This documentation provides details about the API layer used throughout the application. The API layer is organized into separate modules for different functionality areas, following a consistent pattern that ensures type safety and error handling.

## Overview

The API layer is designed to abstract the communication with backend services, providing a clean and consistent interface for the rest of the application. Each API module returns standardized responses that include data, status, and error information, allowing for consistent error handling throughout the application.

## API Modules

| Module       | Description                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `AuthApi`    | Handles authentication operations such as login, current user, and token refresh |
| `CartApi`    | Manages shopping cart operations: create, read, update, and delete cart items    |
| `ProductApi` | Fetches product information and handles product-related operations               |

## API Types and Interfaces

### Common Types

| Type                  | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `TPromiseResponse<T>` | Generic response type containing data, status, and error information |
| `TPromiseError`       | Type for API error objects                                           |

### Authentication API

| Function          | Parameters                           | Return Type             | Description                           |
| ----------------- | ------------------------------------ | ----------------------- | ------------------------------------- |
| `handleLogin`     | `username: string, password: string` | `Promise<IAuthPromise>` | Authenticates user and returns tokens |
| `getCurrentUser`  | None                                 | `Promise<IAuthPromise>` | Retrieves current user's information  |
| `getRefreshToken` | `refreshToken: string`               | `Promise<IAuthPromise>` | Refreshes expired access tokens       |

### Cart API

| Function          | Parameters                          | Return Type                            | Description                                         |
| ----------------- | ----------------------------------- | -------------------------------------- | --------------------------------------------------- |
| `getCartByUserId` | `userId: number`                    | `Promise<TPromiseResponse<ICartData>>` | Gets all shopping carts for a user                  |
| `addNewCart`      | `userId: number, product: IProduct` | `Promise<TPromiseResponse<ICart>>`     | Creates a new cart or adds product to existing cart |
| `getCarts`        | None                                | `Promise<TPromiseResponse<ICartData>>` | Gets all carts in the system                        |
| `updateCart`      | `cartId: number, product: IProduct` | `Promise<TPromiseResponse<ICart>>`     | Updates an existing cart with new product           |
| `deleteCart`      | `cartId: number`                    | `Promise<TPromiseResponse<ICart>>`     | Deletes a cart by its ID                            |

### Product API

| Function                | Parameters                          | Return Type                               | Description                           |
| ----------------------- | ----------------------------------- | ----------------------------------------- | ------------------------------------- |
| `getProducts`           | `queryParams?: IProductQueryParams` | `Promise<TPromiseResponse<IProductData>>` | Gets products with optional filtering |
| `getProductById`        | `id: number`                        | `Promise<TPromiseResponse<IProduct>>`     | Gets details for a specific product   |
| `getProductsByCategory` | `category: string`                  | `Promise<TPromiseResponse<IProductData>>` | Gets products by category             |

## Request Parameters

### Product Query Parameters (IProductQueryParams)

| Parameter | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| `limit`   | `number` | Maximum number of products to return        |
| `skip`    | `number` | Number of products to skip (for pagination) |
| `order`   | `string` | Sort order ('asc' or 'desc')                |
| `sortBy`  | `string` | Field to sort by (default: 'id')            |

## Authentication & Security

The API layers for Cart and Product use axios interceptors to automatically include the authentication token in requests. The token is retrieved from the authentication store and added as a Bearer token in the Authorization header.

## Error Handling

Each API module includes dedicated error handling methods that format errors consistently:

- `handleAuthenticationErrors` for AuthApi
- `handleCartErrors` for CartApi
- `handleProductErrors` for ProductApi

These methods ensure that all API responses follow the same structure, even when errors occur.
