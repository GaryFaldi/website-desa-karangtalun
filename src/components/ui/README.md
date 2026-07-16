# UI Components Library

Reusable components untuk Website Desa Karangtalun.

## 📦 Components

### 1. Card

Container component dengan variants dan sub-components.

**Usage:**
```jsx
import { Card } from '../../components/ui'

// Basic card
<Card variant="default">
  <Card.Header>Header</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>

// Card with image
<Card variant="hoverable">
  <Card.Image src="/image.jpg" alt="Description" />
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
  </Card.Body>
</Card>

// Clickable card (as link)
<Card as="a" href="/path" variant="clickable">
  Content
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'hoverable' | 'clickable'
- `as`: Element type (default: 'div')
- `onClick`: Click handler
- `className`: Additional CSS classes

---

### 2. Button

Button component dengan multiple variants dan sizes.

**Usage:**
```jsx
import { Button } from '../../components/ui'

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Outline button
<Button variant="outline">
  Secondary Action
</Button>

// Button as link
<Button to="/path" variant="primary">
  Navigate
</Button>

// External link
<Button href="https://example.com" target="_blank">
  External Link
</Button>

// Loading state
<Button loading={true}>
  Loading...
</Button>

// Full width
<Button fullWidth>
  Submit
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean
- `to`: Internal route (React Router Link)
- `href`: External URL
- `onClick`: Click handler

---

### 3. Badge

Small label/tag component untuk categories.

**Usage:**
```jsx
import { Badge } from '../../components/ui'

// Basic badge
<Badge variant="primary">New</Badge>

// Badge with icon
<Badge variant="info" icon="🔔">
  Notification
</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success' | 'teal' | 'purple'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React node (emoji or icon)

---

### 4. EmptyState

Display when no data is available.

**Usage:**
```jsx
import { EmptyState } from '../../components/ui'
import { Button } from '../../components/ui'

<EmptyState
  icon="🔍"
  title="Tidak ada data"
  description="Belum ada fasilitas untuk kategori ini."
  action={<Button variant="primary">Tambah Data</Button>}
/>
```

**Props:**
- `icon`: Emoji atau icon string
- `title`: Heading text
- `description`: Description text
- `action`: React node (biasanya Button)

---

### 5. Skeleton

Loading placeholder component.

**Usage:**
```jsx
import { Skeleton } from '../../components/ui'

// Basic skeletons
<Skeleton variant="text" width="60%" height="20px" />
<Skeleton variant="circular" width="40px" height="40px" />
<Skeleton variant="rectangular" width="100%" height="200px" />

// Pre-built patterns
<Skeleton.Card />

<Skeleton.List count={5} />
```

**Props:**
- `variant`: 'text' | 'circular' | 'rectangular'
- `width`: CSS width value
- `height`: CSS height value

**Pre-built Patterns:**
- `Skeleton.Card`: Card skeleton dengan image dan text
- `Skeleton.List`: List skeleton dengan avatar dan text

---

## 🎨 Design Tokens

Components menggunakan CSS custom properties dari `src/styles/tokens.css`:

- `--color-primary-*`: Primary color palette
- `--color-text-*`: Text colors
- `--color-border-*`: Border colors
- `--color-background-*`: Background colors
- `--spacing-*`: Spacing scale
- `--radius-*`: Border radius scale

---

## 📝 Notes

- Semua components responsive by default
- Focus states untuk accessibility
- Consistent spacing menggunakan design tokens
- Minimal dependencies (hanya React Router untuk Button)

---

## 🔄 Future Enhancements

- Modal/Dialog component
- Tabs component
- Dropdown/Select component
- Input components (TextField, TextArea, Checkbox, Radio)
- Toast/Notification component
- Pagination component
