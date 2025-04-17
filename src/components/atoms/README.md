# Atoms Documentation

Atoms are the fundamental building blocks of our UI components. They are simple, standalone components that serve a single purpose.

## Common Atoms

| Component       | Description                               | Example Usage                       | Types                 |
| --------------- | ----------------------------------------- | ----------------------------------- | --------------------- |
| `Typography`    | Text component with consistent styling    | Headings, paragraphs, labels        | `ITypographyProps`    |
| `FlexContainer` | Wrapper component for flexbox layouts     | Layout container, alignment control | `IFlexContainerProps` |
| `Image`         | Enhanced image component with fit options | Product images, thumbnails          | `IImageProps`         |
| `Button`        | Basic button with multiple style variants | Form submissions, call-to-actions   | `IButtonProps`        |
| `DataLoop`      | Component for rendering lists of data     | Repeated UI elements                | `IDataLoopProps`      |
| `Modal`         | Dialog window component                   | Confirmations, detailed views       | `IModalProps`         |
| `Pagination`    | Controls for paginated data               | Product listings, tables            | `IPaginationProps`    |
| `Spinner`       | Loading indicator animation               | Async operations, button states     | `ISpinnerProps`       |
| `Input`         | Input field component                     | Forms, search                       | `IInputProps`         |
| `LazyImage`     | Image with lazy loading and placeholder   | Product listings, galleries         | `ILazyImageProps`     |

## Product Components (atoms/product/)

| Component                      | Description                               | Example Usage                  | Types                                |
| ------------------------------ | ----------------------------------------- | ------------------------------ | ------------------------------------ |
| `Card`                         | Base card component for product display   | Product listings               | `ICardProps`                         |
| `ProductRating`                | Star rating visualization                 | Product reviews, ratings       | `IProductRatingProps`                |
| `AdditionalInfo`               | Additional product information display    | Product details page           | `IAdditionalInfoProps`               |
| `DiscountPill`                 | Pill showing discount percentage          | Product cards, listings        | `IDiscountPillProps`                 |
| `QuantityCounter`              | Counter with increment/decrement controls | Cart items, product quantities | `IQuantityCounterProps`              |
| `CategoriesDropdown`           | Dropdown for product categories           | Navigation, filters            | `ICategoriesDropdownProps`           |
| `SingleRecommendedProductCard` | Card for recommended products             | Product detail page            | `ISingleRecommendedProductCardProps` |

## Cart Components (atoms/cart/)

| Component        | Description                         | Example Usage                 | Types                  |
| ---------------- | ----------------------------------- | ----------------------------- | ---------------------- |
| `CartAction`     | Controls for cart item manipulation | Product pages, cart summaries | `ICartActionProps`     |
| `CheckoutItem`   | Individual item in checkout         | Checkout page                 | `ICheckoutItemProps`   |
| `CartHeaderIcon` | Cart icon with item count           | Header, navigation            | `ICartHeaderIconProps` |

## Form Components (atoms/forms/)

| Component   | Description                  | Example Usage             | Types             |
| ----------- | ---------------------------- | ------------------------- | ----------------- |
| `FormInput` | Styled form input with label | Registration, login forms | `IFormInputProps` |

## User Components (atoms/user/)

| Component  | Description                      | Example Usage     | Types            |
| ---------- | -------------------------------- | ----------------- | ---------------- |
| `UserPill` | Compact user information display | Comments, reviews | `IUserPillProps` |
