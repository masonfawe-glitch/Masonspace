"use client"

import React, { useState } from "react"
import { Splite } from "./splite"
import { Spotlight } from "./spotlight"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

interface SplineScene {
  id: string
  title: string
  description: string
  url: string
}

const splineScenes: SplineScene[] = [
  {
    id: "1",
    title: "Interactive Cube",
    description: "A simple interactive 3D cube with smooth animations",
    url: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
  },
  {
    id: "2",
    title: "Abstract Shapes",
    description: "Colorful abstract geometric shapes floating in space",
    url: "https://prod.spline.design/Br2ec4eKystSKfZL/scene.splinecode",
  },
  {
    id: "3",
    title: "3D Room",
    description: "An immersive 3D room environment to explore",
    url: "https://prod.spline.design/llK4adhkb9XfP1NP/scene.splinecode",
  },
]

export const SplineDemo: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<SplineScene>(splineScenes[0])
  const [isLoading, setIsLoading] = useState(true)

  const handleSceneLoad = (spline: any) => {
    setIsLoading(false)
    console.log("Spline scene loaded:", spline)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Masonspace 3D Gallery
          </h1>
          <p className="mt-4 text-lg text-slate-400 md:text-xl">
            Interactive Spline 3D scenes with shadcn/ui and Tailwind CSS
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Spotlight className="h-[400px] md:h-[600px]">
              <div className="relative h-full w-full">
                <Splite
                  scene={selectedScene.url}
                  onLoad={handleSceneLoad}
                  className="h-full w-full rounded-lg"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white">Loading scene...</div>
                  </div>
                )}
              </div>
            </Spotlight>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">{selectedScene.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {selectedScene.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    Interactive
                  </span>
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                    3D
                  </span>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Spline
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Available Scenes</h2>
            {splineScenes.map((scene) => (
              <Card
                key={scene.id}
                className={cn(
                  "cursor-pointer border-slate-800 bg-slate-900/50 backdrop-blur transition-all hover:border-slate-600 hover:bg-slate-800/50",
                  selectedScene.id === scene.id && "border-blue-500 bg-slate-800/70"
                )}
                onClick={() => {
                  setSelectedScene(scene)
                  setIsLoading(true)
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white">{scene.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {scene.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}

            <Card className="border-slate-800 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  <span>Interactive 3D scenes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                  <span>Spotlight hover effects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>Responsive design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                  <span>TypeScript support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                  <span>Tailwind CSS styled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <div>
              <h3 className="mb-2 font-semibold text-white">Mouse Controls:</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Left click and drag to rotate the scene</li>
                <li>Right click and drag to pan</li>
                <li>Scroll to zoom in and out</li>
                <li>Hover over elements for spotlight effects</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">Select a Scene:</h3>
              <p className="text-sm">
                Click on any scene card on the right to switch between different 3D
                environments. Each scene is fully interactive and loads dynamically.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
