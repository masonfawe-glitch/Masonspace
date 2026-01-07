"use client"

import React, { Suspense } from "react"
import Spline from "@splinetool/react-spline"
import { cn } from "@/lib/utils"

interface SpliteProps {
  scene: string
  className?: string
  onLoad?: (spline: any) => void
  onMouseDown?: (e: any) => void
  onMouseUp?: (e: any) => void
  onMouseHover?: (e: any) => void
  onKeyDown?: (e: any) => void
  onKeyUp?: (e: any) => void
  onWheel?: (e: any) => void
  renderOnDemand?: boolean
}

const SplineLoader = () => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-white"></div>
      <p className="text-sm text-slate-400">Loading 3D Scene...</p>
    </div>
  </div>
)

export const Splite: React.FC<SpliteProps> = ({
  scene,
  className,
  onLoad,
  onMouseDown,
  onMouseUp,
  onMouseHover,
  onKeyDown,
  onKeyUp,
  onWheel,
  renderOnDemand = false,
}) => {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene={scene}
          onLoad={onLoad}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseHover={onMouseHover}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onWheel={onWheel}
          renderOnDemand={renderOnDemand}
        />
      </Suspense>
    </div>
  )
}
