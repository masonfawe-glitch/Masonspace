# Quick Start Guide

Get up and running with Masonspace in 5 minutes!

## 🚀 Quick Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

That's it! The demo page will load with interactive 3D scenes.

---

## 📦 What's Included

✅ **Splite Component** - Spline 3D scene wrapper  
✅ **Spotlight Component** - Interactive hover effects  
✅ **Card Component** - shadcn/ui cards  
✅ **Demo Page** - Full working example  
✅ **TypeScript** - Full type safety  
✅ **Tailwind CSS** - Modern styling  

---

## 🎯 Basic Usage

### 1. Simple Spline Scene

```tsx
import { Splite } from "@/components/ui/splite"

export default function Page() {
  return (
    <div className="h-screen">
      <Splite scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </div>
  )
}
```

### 2. With Spotlight Effect

```tsx
import { Splite } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"

export default function Page() {
  return (
    <Spotlight className="h-screen">
      <Splite scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </Spotlight>
  )
}
```

### 3. With Card Component

```tsx
import { Splite } from "@/components/ui/splite"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My 3D Scene</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <Splite scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 🎨 Customization

### Change Colors

```tsx
<Spotlight spotlightColor="rgba(59, 130, 246, 0.4)">
  {/* Blue spotlight */}
</Spotlight>
```

### Add Classes

```tsx
<Splite 
  scene="..."
  className="rounded-xl shadow-2xl border-2 border-blue-500"
/>
```

### Handle Events

```tsx
<Splite
  scene="..."
  onLoad={(spline) => console.log("Loaded!", spline)}
  onMouseDown={(e) => console.log("Clicked!", e)}
/>
```

---

## 📄 Pages Included

- **`/`** - Full demo with multiple scenes
- **`/example`** - Standalone component examples

---

## 🔧 Key Files

- **`components/ui/splite.tsx`** - Spline wrapper
- **`components/ui/spotlight.tsx`** - Spotlight effect
- **`components/ui/card.tsx`** - Card component
- **`components/ui/demo.tsx`** - Complete demo

---

## 📚 More Documentation

- **`README.md`** - Project overview
- **`SETUP.md`** - Detailed setup guide
- **`COMPONENTS.md`** - Component API docs

---

## 🎓 Next Steps

1. ✅ Run `npm run dev`
2. ✅ Visit [http://localhost:3000](http://localhost:3000)
3. ✅ Explore the demo page
4. ✅ Check `/example` page
5. ✅ Read `COMPONENTS.md` for API details
6. ✅ Create your own scenes at [spline.design](https://spline.design)
7. ✅ Build something awesome!

---

## ❓ Common Questions

**Q: Where do I get Spline scene URLs?**  
A: Create scenes at [spline.design](https://spline.design), export as "Code Export" → "React/Next.js", and copy the URL.

**Q: Can I use my own Spline scenes?**  
A: Yes! Just replace the scene URL in the `scene` prop.

**Q: How do I customize styling?**  
A: Use the `className` prop with Tailwind CSS classes.

**Q: Is TypeScript required?**  
A: TypeScript is configured but you can use JavaScript if preferred.

---

**Need help?** Check `COMPONENTS.md` for detailed documentation!
