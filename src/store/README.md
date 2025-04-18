# Store Documentation

This application uses Zustand for state management, providing lightweight, reactive stores with persistence capabilities.

## Overview

The store layer manages global application state, handling authentication, cart management, and UI controls. Each store follows a consistent pattern with state definitions and actions, some with persistence for data that should survive page refreshes.

## Available Stores

| Store           | Description                       | Persistence   | Key Features                                             |
| --------------- | --------------------------------- | ------------- | -------------------------------------------------------- |
| `useAuthStore`  | Manages user authentication state | Yes           | User ID, token management, session handling              |
| `useCartStore`  | Manages shopping cart data        | Yes, per-user | Add/remove products, quantity management, stock tracking |
| `useModalStore` | Controls modal dialogs state      | No            | Open/close modals, modal content management              |

## Store Details

### useAuthStore

Manages authentication state across the application.

#### State Properties

| Property         | Type                | Description                           |
| ---------------- | ------------------- | ------------------------------------- |
| `userId`         | `number \| null`    | Current authenticated user's ID       |
| `token`          | `string \| null`    | Authentication token for API requests |
| `allUserData`    | `IAuthData \| null` | Complete user data object             |
| `expirationDate` | `Date \| null`      | Token expiration timestamp            |

#### Actions

| Method        | Parameters      | Description                   |
| ------------- | --------------- | ----------------------------- |
| `setUserId`   | `id: number`    | Sets the current user ID      |
| `setToken`    | `token: string` | Sets the authentication token |
| `clearUserId` | None            | Clears all user data (logout) |

#### Persistence Configuration

Uses Zustand's persist middleware with the storage key "Sikuro Group - FE Technical Interview" to maintain authentication state across page refreshes.

```tsx
// Usage example
const { userId, token, setUserId, clearUserId } = useAuthStore()
```

### useCartStore

Manages shopping cart data with comprehensive product and quantity tracking.

#### State Properties

| Property   | Type              | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `cartData` | `ICart[] \| null` | Current authenticated user's ID |

#### Actions

| Method                      | Parameters                          | Description                                                                                  |
| --------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `createNewCart`             | `cartData: ICart`                   | Creates a new shopping cart                                                                  |
| `updateCartWithNewProducts` | `cartId: number, products: ICart[]` | Updates existing cart with new products, handling quantity validation and price calculations |
| `removeProductFromCart`     | `cartId: number, productId: number` | Removes a specific product from the cart and recalculates totals                             |
| `clearCart`                 | `none`                              | Empties the entire cart                                                                      |
| `loadUserCart`              | `None`                              | Loads cart data specific to the current user                                                 |

#### Helpers

| Method                     | Parameters                              | Description                                                    |
| -------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| `isProductMaxedOut`        | `productId: number, stock: number`      | Checks if a product has reached its maximum available stock    |
| `getProductQuantityInCart` | `productId: number`                     | Gets the total quantity of a specific product across all carts |
| `getRemainingStock`        | `productId: number, totalStock: number` | Calculates remaining available stock for a product             |

### Persistance Configuration

Uses a sophisticated persistence setup with:

- Storage key: "sikuro-cart-store"
- User-specific storage: Appends the current userId to the storage key
- Custom storage implementation to handle user-specific cart data
- Partial state persistence: Only persists the cartData property

The cart store implements user-specific storage by:

- Retrieving the current user ID from useAuthStore
- Creating a unique storage key for each user (sikuro-cart-store-{userId})
- Using this key to store and retrieve cart data in localStorage

**This approach ensures that each user has their own separate cart, even on shared devices.**

```tsx
const { cartData, updateCartWithNewProducts, removeProductFromCart } =
  useCartStore()
```

### useModalStore

Manages the state of modal windows in the application.

#### State Properties

| Property      | Type               | Description                                        |
| ------------- | ------------------ | -------------------------------------------------- |
| `isModalOpen` | `boolean`          | Indicates whether the modal is currently displayed |
| `productData` | `IProduct \| null` | Product data to display in the modal               |

#### Actions

| Method       | Parameters | Description                                                  |
| ------------ | ---------- | ------------------------------------------------------------ |
| `openModal`  | None       | Sets `isModalOpen` to true, showing the modal                |
| `closeModal` | None       | Sets `isModalOpen` to false and resets `productData` to null |

#### Usage Example

```tsx
const { isModalOpen, productData, openModal, closeModal } = useModalStore()
```

**This store does not use persistence since modal state should not survive page refreshes.**
