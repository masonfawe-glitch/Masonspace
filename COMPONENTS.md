# Component Documentation

## Overview

This document provides detailed information about the Spline 3D integration components in the Masonspace project.

## Components

### 1. Splite (`components/ui/splite.tsx`)

A React wrapper component for Spline 3D scenes with enhanced features.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `scene` | `string` | Yes | - | URL to the Spline scene (`.splinecode` file) |
| `className` | `string` | No | - | Additional CSS classes for styling |
| `onLoad` | `(spline: any) => void` | No | - | Callback fired when scene loads |
| `onMouseDown` | `(e: any) => void` | No | - | Mouse down event handler |
| `onMouseUp` | `(e: any) => void` | No | - | Mouse up event handler |
| `onMouseHover` | `(e: any) => void` | No | - | Mouse hover event handler |
| `onKeyDown` | `(e: any) => void` | No | - | Keyboard down event handler |
| `onKeyUp` | `(e: any) => void` | No | - | Keyboard up event handler |
| `onWheel` | `(e: any) => void` | No | - | Mouse wheel event handler |
| `renderOnDemand` | `boolean` | No | `false` | Enable render-on-demand mode |

#### Usage Example

```tsx
import { Splite } from "@/components/ui/splite"

function MyComponent() {
  const handleLoad = (spline: any) => {
    console.log("Spline scene loaded:", spline)
  }

  return (
    <div className="h-[600px]">
      <Splite
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        onLoad={handleLoad}
        className="rounded-lg"
      />
    </div>
  )
}
```

#### Features

- Built-in loading state with animated spinner
- Suspense boundary for code-splitting
- Responsive container sizing
- Full event handler support
- TypeScript type definitions

---

### 2. Spotlight (`components/ui/spotlight.tsx`)

An interactive component that creates a spotlight effect following the mouse cursor.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | Yes | - | Content to display inside spotlight |
| `className` | `string` | No | - | Additional CSS classes |
| `spotlightColor` | `string` | No | `"rgba(255, 255, 255, 0.25)"` | Color of the spotlight effect |

#### Usage Example

```tsx
import { Spotlight } from "@/components/ui/spotlight"

function MyComponent() {
  return (
    <Spotlight 
      className="p-8"
      spotlightColor="rgba(59, 130, 246, 0.3)"
    >
      <h2>Hover over me!</h2>
      <p>The spotlight will follow your cursor</p>
    </Spotlight>
  )
}
```

#### Features

- Smooth mouse tracking
- Customizable spotlight color
- Focus state support
- Framer Motion animations
- Responsive radial gradient

---

### 3. Card (`components/ui/card.tsx`)

A versatile card component following shadcn/ui patterns.

#### Components

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

#### Usage Example

```tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content goes here</p>
      </CardContent>
    </Card>
  )
}
```

#### Features

- Fully composable
- Supports forwarded refs
- Tailwind CSS styled
- Dark mode support
- Accessible by default

---

### 4. SplineDemo (`components/ui/demo.tsx`)

A complete showcase component demonstrating all features.

#### Features

- Multiple scene selection
- Interactive scene gallery
- Responsive grid layout
- Loading states
- Feature highlights
- Usage instructions

#### Usage Example

```tsx
import { SplineDemo } from "@/components/ui/demo"

function Page() {
  return <SplineDemo />
}
```

---

## Integration Guide

### Step 1: Install Dependencies

All dependencies are already included in `package.json`:

```json
{
  "@splinetool/react-spline": "^2.2.6",
  "@splinetool/runtime": "^1.0.0",
  "framer-motion": "^10.18.0"
}
```

### Step 2: Import Components

```tsx
import { Splite } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

### Step 3: Use in Your Pages

```tsx
"use client"

export default function MyPage() {
  return (
    <div className="p-8">
      <Spotlight>
        <Card>
          <CardHeader>
            <CardTitle>My 3D Scene</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px]">
              <Splite scene="your-scene-url" />
            </div>
          </CardContent>
        </Card>
      </Spotlight>
    </div>
  )
}
```

---

## Getting Spline Scene URLs

1. Create your 3D scene at [spline.design](https://spline.design)
2. Click "Export" in the top-right corner
3. Select "Code Export"
4. Choose "React/Next.js"
5. Copy the scene URL (ends with `.splinecode`)
6. Use this URL in the `scene` prop

---

## Customization

### Tailwind CSS

All components accept `className` prop for customization:

```tsx
<Splite 
  scene="..."
  className="rounded-xl shadow-2xl border-2 border-blue-500"
/>
```

### Spotlight Colors

Customize the spotlight effect color:

```tsx
<Spotlight spotlightColor="rgba(139, 92, 246, 0.4)">
  {/* Purple spotlight */}
</Spotlight>
```

### Card Variants

Create custom card styles:

```tsx
<Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
  <CardContent>Custom styled card</CardContent>
</Card>
```

---

## Performance Tips

1. **Code Splitting**: Components use React Suspense for automatic code-splitting
2. **Lazy Loading**: Spline scenes load on demand
3. **Render on Demand**: Enable `renderOnDemand` prop for better performance
4. **Optimize Scene Size**: Keep Spline scene file sizes under 5MB when possible

---

## TypeScript Support

All components are fully typed with TypeScript. Import types as needed:

```tsx
import type { SplineEvent } from "@splinetool/react-spline"
```

---

## Troubleshooting

### Scene Not Loading

1. Verify the scene URL is correct and publicly accessible
2. Check browser console for errors
3. Ensure Spline scene is exported correctly

### Performance Issues

1. Enable `renderOnDemand` mode
2. Reduce scene complexity in Spline
3. Optimize textures and polygon count

### Styling Issues

1. Ensure Tailwind CSS is properly configured
2. Check that global styles are imported
3. Verify CSS variable definitions in `globals.css`

---

## Examples

See the following example pages:

- **Full Demo**: `/` (root page) - Complete showcase
- **Standalone**: `/example` - Individual component usage

---

## Support

For issues or questions:

1. Check the [Spline Documentation](https://docs.spline.design)
2. Review the [shadcn/ui Documentation](https://ui.shadcn.com)
3. Consult the [Framer Motion Documentation](https://www.framer.com/motion)
