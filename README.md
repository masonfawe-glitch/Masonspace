# Masonspace - Interactive 3D Gallery

A modern React application featuring interactive Spline 3D scenes with shadcn/ui components and Tailwind CSS styling.

## Features

- 🎨 **Interactive 3D Scenes** - Powered by Spline for stunning 3D visualizations
- ✨ **Spotlight Effects** - Beautiful hover effects using Framer Motion
- 🎯 **Responsive Design** - Works seamlessly on mobile and desktop
- 🔧 **TypeScript** - Full type safety throughout the application
- 🎭 **shadcn/ui** - Beautiful and accessible UI components
- 🌈 **Tailwind CSS** - Modern utility-first styling

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Spline** - 3D design and interactive experiences
- **Framer Motion** - Animation library

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
masonspace/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   └── ui/
│       ├── splite.tsx   # Spline scene wrapper
│       ├── spotlight.tsx # Interactive spotlight effect
│       ├── card.tsx     # Card component
│       └── demo.tsx     # Demo showcase component
├── lib/
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Components

### Splite

A wrapper component for Spline 3D scenes with built-in loading states and error handling.

```tsx
import { Splite } from "@/components/ui/splite"

<Splite 
  scene="https://prod.spline.design/your-scene-url/scene.splinecode"
  onLoad={(spline) => console.log("Scene loaded!")}
/>
```

### Spotlight

An interactive spotlight effect that follows the mouse cursor.

```tsx
import { Spotlight } from "@/components/ui/spotlight"

<Spotlight>
  <YourContent />
</Spotlight>
```

### Demo Component

A complete showcase demonstrating all features with multiple 3D scenes, scene selection, and interactive elements.

```tsx
import { SplineDemo } from "@/components/ui/demo"

<SplineDemo />
```

## Customization

### Adding New Scenes

Edit `components/ui/demo.tsx` and add new scenes to the `splineScenes` array:

```tsx
const splineScenes: SplineScene[] = [
  {
    id: "4",
    title: "Your Scene",
    description: "Description of your scene",
    url: "https://prod.spline.design/your-scene/scene.splinecode",
  },
]
```

### Styling

All components use Tailwind CSS and can be customized through the `tailwind.config.ts` file or by passing className props.

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for your own purposes.
