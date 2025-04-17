# Molecules Documentation

Molecules are relatively simple groups of UI elements functioning together as a unit, organized by functionality.

## Cart Components (molecules/cart/)

| Component                 | Description                         | Example Usage       | Types                           |
| ------------------------- | ----------------------------------- | ------------------- | ------------------------------- |
| `CartSummary`             | Displays cart contents overview     | Cart page, checkout | `ICartSummaryProps`             |
| `EmptyCard`               | Empty state for cart                | Empty cart view     | `IEmptyCardProps`               |
| `CartTabs`                | Tab navigation for cart sections    | Cart page           | `ICartTabsProps`                |
| `CartSummaryProductInfo`  | Product details in cart             | Cart item row       | `ICartSummaryProductInfoProps`  |
| `CartSummaryProductPrice` | Price display for cart items        | Cart summary        | `ICartSummaryProductPriceProps` |
| `CartCheckout`            | Checkout action buttons             | Cart page           | `ICartCheckoutProps`            |
| `CartSummaryClearCart`    | Clear cart button with confirmation | Cart management     | `ICartSummaryClearCartProps`    |

## Form Components (molecules/forms/)

| Component   | Description              | Example Usage      | Types             |
| ----------- | ------------------------ | ------------------ | ----------------- |
| `LoginForm` | User authentication form | Login page, modals | `ILoginFormProps` |

## Product Components (molecules/products/)

| Component             | Description                     | Example Usage                  | Types                       |
| --------------------- | ------------------------------- | ------------------------------ | --------------------------- |
| `ProductsList`        | Container for product cards     | Category pages, search results | `IProductsListProps`        |
| `SingleReview`        | Display a single product review | Product detail page            | `ISingleReviewProps`        |
| `Filters`             | Filter controls for products    | Category pages, search         | `IFiltersProps`             |
| `RecommendedProducts` | Related/suggested products      | Product detail page            | `IRecommendedProductsProps` |

## User Components (molecules/user/)

| Component            | Description                       | Example Usage                 | Types                      |
| -------------------- | --------------------------------- | ----------------------------- | -------------------------- |
| `UserAdditionalInfo` | Extended user information display | Profile page, account section | `IUserAdditionalInfoProps` |

## State Components (molecules/state/)

| Component      | Description                  | Example Usage      | Types                |
| -------------- | ---------------------------- | ------------------ | -------------------- |
| `LoadingState` | UI for data loading state    | During API fetches | `ILoadingStateProps` |
| `ErrorState`   | Error display with messaging | Failed operations  | `IErrorStateProps`   |

## Modal Components (molecules/modals/)

| Component     | Description                    | Example Usage           | Types               |
| ------------- | ------------------------------ | ----------------------- | ------------------- |
| `LogoutModal` | Confirmation dialog for logout | User menu, account page | `ILogoutModalProps` |

## Common Components

| Component | Description                        | Example Usage | Types          |
| --------- | ---------------------------------- | ------------- | -------------- |
| `Header`  | Application header with navigation | All pages     | `IHeaderProps` |
