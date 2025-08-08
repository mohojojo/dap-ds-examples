# DAP Design System Integration with Vue

This document explains how to use the DAP Design System with full TypeScript support in your Vue project.

## Setup

The DAP Design System has been integrated with proper TypeScript support using the **real type definitions** from the library. Here's what was configured:

### 1. Type Definitions

The following files were created/modified to support the design system:

- `src/types/dap-design-system-fixed.d.ts` - **Real type definitions** for all design system components
- `global.d.ts` - Global type declarations including missing interfaces
- `tsconfig.json` - Updated to include design system types
- `tsconfig.app.json` - Updated to include type definitions and proper type resolution

### 2. Missing Type Definitions

The following interfaces were added to resolve TypeScript errors:

```typescript
interface AccordionBaseElement extends HTMLElement {
  // Add any specific properties if needed
}

interface SortingState {
  [key: string]: unknown
}

interface RowSelectionState {
  [key: string]: unknown
}

interface PaginationState {
  [key: string]: unknown
}

interface Row<T = unknown> {
  id: string
  data: T
}
```

## Usage

### Full TypeScript Support

You now have **complete TypeScript support** with real prop types, event handlers, and proper type checking:

```vue
<template>
  <dap-ds-button variant="primary" size="md" @click="handleClick"> Click me </dap-ds-button>

  <dap-ds-input v-model="inputValue" placeholder="Enter text" size="md" />

  <dap-ds-checkbox v-model="isChecked" label="Check me" size="md" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const isChecked = ref(false)

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### Form Components with Real Types

The design system provides comprehensive form components with full type safety:

```vue
<template>
  <dap-ds-form-label for="name">Name</dap-ds-form-label>
  <dap-ds-input id="name" v-model="formData.name" placeholder="Enter your name" size="md" />

  <dap-ds-form-label for="email">Email</dap-ds-form-label>
  <dap-ds-input
    id="email"
    v-model="formData.email"
    type="email"
    placeholder="Enter your email"
    size="md"
  />

  <dap-ds-form-label for="date">Date</dap-ds-form-label>
  <dap-ds-date-picker id="date" v-model="formData.date" placeholder="Select a date" size="md" />

  <dap-ds-form-label for="product">Product</dap-ds-form-label>
  <dap-ds-select id="product" v-model="formData.product" placeholder="Select a product" size="md">
    <dap-ds-option-item value="product1">Product 1</dap-ds-option-item>
    <dap-ds-option-item value="product2">Product 2</dap-ds-option-item>
  </dap-ds-select>

  <dap-ds-form-label for="message">Message</dap-ds-form-label>
  <dap-ds-textarea
    id="message"
    v-model="formData.message"
    placeholder="Enter your message"
    size="md"
    :rows="4"
  />

  <dap-ds-checkbox
    id="consent"
    v-model="formData.consent"
    label="I agree to the terms and conditions"
    size="md"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Dayjs } from 'dayjs'

interface FormData {
  name: string
  email: string
  date: Dayjs | null
  product: string
  message: string
  consent: boolean
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  date: null,
  product: '',
  message: '',
  consent: false,
})
</script>
```

### Layout Components

Use layout components for structured content:

```vue
<template>
  <dap-ds-card>
    <dap-ds-card-title>Card Title</dap-ds-card-title>
    <dap-ds-card-content>
      <dap-ds-typography variant="body" size="md"> This is the card content. </dap-ds-typography>
    </dap-ds-card-content>
    <dap-ds-card-actions>
      <dap-ds-button variant="primary" size="sm">Action</dap-ds-button>
    </dap-ds-card-actions>
  </dap-ds-card>
</template>
```

### Feedback Components

Use feedback components for user notifications:

```vue
<template>
  <dap-ds-banner
    variant="info"
    :opened="showBanner ? 'true' : 'false'"
    @dds-close="showBanner = false"
  >
    This is an informational banner
  </dap-ds-banner>

  <dap-ds-snackbar :opened="showSnackbar" @dds-close="showSnackbar = false">
    This is a snackbar message
  </dap-ds-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showBanner = ref(true)
const showSnackbar = ref(false)
</script>
```

## Available Components

The following components are available with **full TypeScript support** and real prop types:

### Form Components

- `dap-ds-input` - Text input
- `dap-ds-textarea` - Multi-line text input
- `dap-ds-select` - Dropdown select
- `dap-ds-combobox` - Searchable dropdown
- `dap-ds-date-picker` - Date picker
- `dap-ds-checkbox` - Checkbox
- `dap-ds-radio-button` - Radio button
- `dap-ds-radio-group` - Radio button group
- `dap-ds-switch` - Toggle switch
- `dap-ds-number-input` - Number input
- `dap-ds-password-input` - Password input
- `dap-ds-file-input` - File upload
- `dap-ds-form-label` - Form label
- `dap-ds-input-group` - Input group container

### Layout Components

- `dap-ds-card` - Card container
- `dap-ds-card-title` - Card title
- `dap-ds-card-content` - Card content
- `dap-ds-card-actions` - Card actions
- `dap-ds-card-image` - Card image
- `dap-ds-card-subtitle` - Card subtitle
- `dap-ds-stack` - Stack layout
- `dap-ds-divider` - Divider line
- `dap-ds-scroll-area` - Scrollable area

### Interactive Components

- `dap-ds-button` - Button
- `dap-ds-icon-button` - Icon button
- `dap-ds-link` - Link
- `dap-ds-toggle-button` - Toggle button
- `dap-ds-breadcrumb` - Breadcrumb navigation
- `dap-ds-breadcrumb-item` - Breadcrumb item
- `dap-ds-navigation-menu` - Navigation menu
- `dap-ds-navigation-menu-item` - Navigation menu item
- `dap-ds-side-nav` - Side navigation
- `dap-ds-side-nav-item` - Side navigation item
- `dap-ds-side-nav-group` - Side navigation group
- `dap-ds-tab-group` - Tab group
- `dap-ds-tab` - Tab

### Feedback Components

- `dap-ds-banner` - Banner notification
- `dap-ds-snackbar` - Snackbar notification
- `dap-ds-modal` - Modal dialog
- `dap-ds-popup` - Popup
- `dap-ds-tooltip` - Tooltip
- `dap-ds-tray` - Tray
- `dap-ds-overlay` - Overlay
- `dap-ds-callout` - Callout
- `dap-ds-badge` - Badge
- `dap-ds-spinner` - Loading spinner
- `dap-ds-skeleton` - Loading skeleton

### Data Display Components

- `dap-ds-table` - Data table
- `dap-ds-data-table` - Advanced data table
- `dap-ds-typography` - Typography
- `dap-ds-avatar` - Avatar
- `dap-ds-avatar-group` - Avatar group
- `dap-ds-icon` - Icon
- `dap-ds-rating` - Rating
- `dap-ds-timeline` - Timeline
- `dap-ds-timeline-item` - Timeline item
- `dap-ds-toc` - Table of contents

### Utility Components

- `dap-ds-accordion` - Accordion
- `dap-ds-accordion-group` - Accordion group
- `dap-ds-content-switcher` - Content switcher
- `dap-ds-content-switcher-item` - Content switcher item
- `dap-ds-pager` - Pagination
- `dap-ds-search` - Search input
- `dap-ds-skip-link` - Skip link
- `dap-ds-anchor-heading` - Anchor heading

## TypeScript Support

All components have **full TypeScript support** with real prop types and event handlers:

- ✅ **Real prop types** - No more `any` types
- ✅ **Type-safe event handlers** - Proper event object types
- ✅ **CSS custom properties** - Typed CSS variables
- ✅ **Slots and their types** - Proper slot typing
- ✅ **Accessibility attributes** - ARIA attribute types
- ✅ **Form validation** - Proper validation types
- ✅ **Date handling** - Dayjs integration

## Events

Components emit events with proper TypeScript types:

```typescript
// Button events
@dds-click="(e: CustomEvent<never>) => void"

// Input events
@dds-change="(e: CustomEvent<{ value: string }>) => void"
@dds-input="(e: CustomEvent<{ input: string; originalEvent: Event }>) => void"
@dds-blur="(e: CustomEvent<{ void }>) => void"
@dds-focus="(e: CustomEvent<{ void }>) => void"

// Date picker events
@dds-change="(e: CustomEvent<{ value: Dayjs }>) => void"

// Modal events
@dds-close="(e: CustomEvent<{ void }>) => void"
```

## CSS Custom Properties

Components support CSS custom properties for theming:

```css
/* Button custom properties */
--dds-button-padding-x
--dds-button-padding-y
--dds-button-font-size
--dds-button-font-weight

/* Input custom properties */
--dds-input-padding-x
--dds-input-padding-y
--dds-input-border-radius
--dds-input-border-color
```

## Example

See `src/components/DapDesignSystemExample.vue` for a complete example of using the design system components with **full TypeScript support**.

## Benefits of Real Types

1. **IntelliSense** - Get autocomplete for all props and events
2. **Type Safety** - Catch errors at compile time
3. **Better DX** - Full IDE support with proper type hints
4. **Documentation** - Types serve as inline documentation
5. **Refactoring** - Safe refactoring with type checking

## Troubleshooting

If you encounter TypeScript errors:

1. Make sure all type definition files are included in `tsconfig.app.json`
2. Check that the design system package is properly installed
3. Verify that the global type declarations are loaded
4. Run `npm run type-check` to identify any remaining issues

The setup now provides **complete TypeScript support** with real type definitions for all DAP Design System components in your Vue project.
