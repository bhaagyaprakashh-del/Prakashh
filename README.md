# Ramnirmalchits CRM - Action System

## Interactive Elements

All buttons, cards, and modals in the application are now fully functional using a centralized action system.

### How to Use Data Actions

Tag any interactive element with `data-action` attributes:

```jsx
// Basic button action
<ActionButton action="create-lead" onClick={handleCreate}>
  Create Lead
</ActionButton>

// Card with click action
<ActionCard action="view-member" id="123" onClick={handleView}>
  Member content...
</ActionCard>

// Confirmation action
<ActionButton 
  action="delete-item" 
  id="123" 
  confirm="Are you sure you want to delete this item?"
  onClick={handleDelete}
>
  Delete
</ActionButton>
```

### Available Actions

- `open-modal` - Opens a modal dialog
- `close-modal` - Closes the current modal
- `navigate` - Navigate to a different page
- `submit-form` - Submit form data
- `confirm-action` - Show confirmation dialog before action
- `download` - Trigger file download
- `refresh-table` - Refresh data table
- `toggle` - Toggle element visibility

### Features

- **Debounced clicks** - Prevents double-click issues
- **Loading states** - Visual feedback during operations
- **Toast notifications** - Success/error messages
- **Keyboard accessibility** - Enter/Space key support
- **Focus management** - Proper focus handling for modals
- **Confirmation dialogs** - Safe destructive actions

### Components

- `ActionButton` - Interactive button with loading states
- `ActionCard` - Clickable card component
- `Modal` - Accessible modal dialog
- `ConfirmDialog` - Confirmation dialog for destructive actions
- `LoadingSpinner` - Loading indicator

All components follow accessibility best practices and maintain the existing Tailwind/glassy UI design.