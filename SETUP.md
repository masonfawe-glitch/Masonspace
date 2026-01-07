# Masonspace Setup Guide

Complete setup instructions for the Masonspace Spline 3D integration project.

## Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## Installation

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd masonspace

# Install all dependencies
npm install
```

This will install:
- Next.js 16+ (React framework)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- shadcn/ui components
- Spline runtime and React integration
- Framer Motion (Animations)

### 2. Verify Installation

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint
```

---

## Project Structure

```
masonspace/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with global styles
│   ├── page.tsx             # Home page (full demo)
│   ├── example/             # Example page
│   │   └── page.tsx        # Standalone component examples
│   └── globals.css          # Global CSS with Tailwind directives
│
├── components/
│   └── ui/                  # UI Components
│       ├── splite.tsx      # Spline 3D scene wrapper
│       ├── spotlight.tsx   # Interactive spotlight effect
│       ├── card.tsx        # Card component
│       ├── demo.tsx        # Complete demo component
│       └── index.ts        # Component exports
│
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
│
├── public/                  # Static assets (if needed)
│
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
│
├── README.md              # Project overview
├── COMPONENTS.md          # Component documentation
└── SETUP.md              # This file
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

- Opens on [http://localhost:3000](http://localhost:3000)
- Hot reload enabled
- Full error messages in browser

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## Configuration Files Explained

### next.config.js

Configures Next.js with Spline package transpilation:

```javascript
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
}
```

### tailwind.config.ts

Configures Tailwind CSS with:
- Custom color system using CSS variables
- Dark mode support
- Custom animations
- Container configuration

### tsconfig.json

TypeScript configuration with:
- Path aliases (`@/*` → root directory)
- Strict type checking
- Next.js plugin support

### components.json

shadcn/ui configuration:
- Component style: default
- RSC support enabled
- TypeScript enabled
- Path aliases configured

---

## Environment Setup

### No Environment Variables Required

This project works out of the box without environment variables. All Spline scene URLs are public and embedded directly in components.

### Optional: Custom Configuration

If you want to add environment-specific settings:

1. Create `.env.local`:

```bash
# Optional: Custom Spline scene URL
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/your-scene/scene.splinecode
```

2. Use in components:

```tsx
const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || "default-url"
```

---

## Customization

### Adding New Spline Scenes

1. Create your scene at [spline.design](https://spline.design)
2. Export as "Code Export" → "React/Next.js"
3. Copy the scene URL
4. Add to `components/ui/demo.tsx`:

```tsx
const splineScenes: SplineScene[] = [
  // ... existing scenes
  {
    id: "4",
    title: "My New Scene",
    description: "Description of my scene",
    url: "https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode",
  },
]
```

### Customizing Colors

Edit `tailwind.config.ts` or `app/globals.css` to change the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* Add your custom colors */
}
```

### Customizing Components

All components accept `className` prop for Tailwind customization:

```tsx
<Splite 
  scene="..."
  className="border-4 border-blue-500 rounded-2xl shadow-2xl"
/>
```

---

## Troubleshooting

### Issue: TypeScript Errors

**Solution**: Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Spline Scene Not Loading

**Possible Causes**:
1. Invalid scene URL
2. Scene not publicly accessible
3. Network issues

**Solution**: 
- Verify URL in browser
- Check browser console for errors
- Try a different scene URL

### Issue: Build Fails

**Solution**: Check for TypeScript errors:
```bash
npx tsc --noEmit
```

Fix any reported errors before building.

### Issue: Styles Not Applied

**Solution**: Verify Tailwind is configured:
```bash
# Check that globals.css is imported in layout.tsx
# Verify tailwind.config.ts content paths
```

### Issue: Module Not Found

**Solution**: Check path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Development Tips

### Hot Reload

Changes to files automatically reload the browser in development mode. No need to restart the server.

### Component Testing

Create new pages in `app/` to test components:

```tsx
// app/test/page.tsx
import { Splite } from "@/components/ui/splite"

export default function TestPage() {
  return (
    <div className="h-screen">
      <Splite scene="your-test-scene-url" />
    </div>
  )
}
```

### Browser DevTools

Use React DevTools extension for debugging:
- Inspect component props
- Monitor re-renders
- Check component hierarchy

### Performance Profiling

Use Next.js built-in profiling:

```tsx
// Add to any component
import { Profiler } from 'react'

<Profiler id="MyComponent" onRender={callback}>
  <YourComponent />
</Profiler>
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `.next` folder to any Node.js hosting platform.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Spline Documentation](https://docs.spline.design)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## Support

For questions or issues:

1. Check the documentation files:
   - `README.md` - Project overview
   - `COMPONENTS.md` - Component API documentation
   - `SETUP.md` - This file

2. Review example implementations:
   - `/` - Full demo page
   - `/example` - Standalone examples

3. Consult the official documentation links above

---

## Next Steps

After setup, explore:

1. **Full Demo**: Visit [http://localhost:3000](http://localhost:3000)
2. **Examples**: Visit [http://localhost:3000/example](http://localhost:3000/example)
3. **Customize**: Edit components in `components/ui/`
4. **Add Scenes**: Follow the "Adding New Spline Scenes" section
5. **Build**: Create your own pages in `app/`

Happy coding! 🚀
