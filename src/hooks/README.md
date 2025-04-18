# Hooks Documentation

Custom hooks encapsulate reusable logic across components, providing clean abstractions for common functionality.

## useLoadingDelay

A utility hook for creating controlled loading states with minimum durations.

| Parameter | Type     | Default | Description                      |
| --------- | -------- | ------- | -------------------------------- |
| `delay`   | `number` | `2000`  | Loading duration in milliseconds |

**Returns:** `boolean` - Current loading state

**Purpose:** Prevents UI flickering by ensuring loading states display for a minimum time, improving perceived performance for fast operations.

```tsx
const isLoading = useLoadingDelay(1500)

return <div>{isLoading ? <Spinner /> : <Content />}</div>
```

## useCheckJWTExpiration

Manages JWT token expiration checks and automatic logout handling.

| Parameter        | Type          | Description               |
| ---------------- | ------------- | ------------------------- |
| `expirationDate` | `Date\| null` | JWT token expiration date |

**Purpose:** Automatically handles expired authentication tokens by:

- Clearing authentication state when tokens expire
- Redirecting to login page
- Setting timers to handle token expiration that occurs while using the app

```tsx
// In a protected route or layout component
const { expirationDate } = useAuthStore()
useCheckJWTExpiration(expirationDate)
```

## useCartActions

Comprehensive hook for managing product-to-cart interactions and state.

### Parameters

| Parameter | Type                   | Description                           |
| --------- | ---------------------- | ------------------------------------- |
| `product` | `IProduct\| undefined` | Product or cart item to interact with |

**Returns:** Object containing state and methods for cart interactions

### States

| Property              | Type      | Description                                   |
| --------------------- | --------- | --------------------------------------------- |
| `currentQuantity`     | `number`  | Current selected quantity for the product     |
| `isLoading`           | `boolean` | Loading state during cart operations          |
| `isMaxStockReached`   | `boolean` | Whether maximum stock has been reached        |
| `isIncrementDisabled` | `boolean` | Whether quantity increment should be disabled |
| `isDecrementDisabled` | `boolean` | Whether quantity decrement should be disabled |
| `isDecrementDisabled` | `boolean` | Whether add to cart button should be disabled |

### Methods

| Property                  | Type                                      | Description                                                    |
| ------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| `retrieveCurrentQuantity` | `quantity: number`                        | Updates current quantity and recalculates state flags          |
| `onAddToCart`             | `product: Partial<ICart>, userId: number` | Adds product to cart with API interaction and state updates    |
| `handleAddToCart`         | `none`                                    | Convenience method that calls onAddToCart with current product |

### Key Features

- Smart Context Detection: Automatically detects if the product is a regular item or a cart item
- Stock Management: Tracks available stock to prevent over-ordering
- Minimum Order Quantities: Respects product minimum order quantity constraints
- Persistence: Preserves critical product metadata during API operations
- Error Handling: Provides toast notifications for operation success/failure
- Seamless Integration: Works with Zustand store for centralized state management

### Usage Examples

```tsx
const { state, handleAddToCart, retrieveCurrentQuantity } =
  useCartActions(product)

return (
  <div>
    <QuantityCounter
      value={state.currentQuantity}
      onChange={retrieveCurrentQuantity}
      isIncrementDisabled={state.isIncrementDisabled}
      isDecrementDisabled={state.isDecrementDisabled}
    />

    <Button
      onClick={handleAddToCart}
      disabled={state.isAddToCartDisabled}
      isLoading={state.isLoading}
    >
      Add to Cart
    </Button>
  </div>
)
```
