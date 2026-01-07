"use client"

import dynamic from "next/dynamic"

const SplineDemo = dynamic(() => import("@/components/ui/demo").then((mod) => ({ default: mod.SplineDemo })), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white"></div>
        <p className="text-slate-400">Loading 3D Gallery...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return (
    <main>
      <SplineDemo />
    </main>
  )
}
