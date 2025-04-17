# API Layer Documentation

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

| Function                | Parameters                          | Return Type                            | Description                                         |
| ----------------------- | ----------------------------------- | -------------------------------------- | --------------------------------------------------- |
| `getCartByUserId`       | `userId: number`                    | `Promise<TPromiseResponse<ICartData>>` | Gets all shopping carts for a user                  |
| `addNewCart`            | `userId: number, product: IProduct` | `Promise<TPromiseResponse<ICart>>`     | Creates a new cart or adds product to existing cart |
| `removeProductFromCart` | `cartId: number, productId: number` | `Promise<TPromiseResponse<ICart>>`     | Removes a product from a cart                       |
| `clearCart`             | `cartId: number`                    | `Promise<TPromiseResponse<null>>`      | Clears all products from a cart                     |

### Product API

| Function                | Parameters                         | Return Type                               | Description                         |
| ----------------------- | ---------------------------------- | ----------------------------------------- | ----------------------------------- |
| `getProducts`           | `limit?: number, skip?: number`    | `Promise<TPromiseResponse<IProductData>>` | Gets a paginated list of products   |
| `getProductById`        | `productId: number`                | `Promise<TPromiseResponse<IProduct>>`     | Gets details for a specific product |
| `getProductsByCategory` | `category: string, limit?: number` | `Promise<TPromiseResponse<IProductData>>` | Gets products by category           |
| `searchProducts`        | `query: string, limit?: number`    | `Promise<TPromiseResponse<IProductData>>` | Searches products by query string   |
