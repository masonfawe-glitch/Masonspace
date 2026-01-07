"use client"

import { useState } from "react"
import { Splite } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExamplePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Standalone Component Example</h1>
          <p className="mt-2 text-slate-400">
            Using Splite and Spotlight components individually
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Spotlight className="p-0">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Simple Spline Scene</CardTitle>
                <CardDescription>A basic 3D cube with rotation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] overflow-hidden rounded-lg">
                  <Splite
                    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
                <div className="mt-4 text-sm text-slate-400">
                  {isLoaded ? "Scene loaded successfully!" : "Loading..."}
                </div>
              </CardContent>
            </Card>
          </Spotlight>

          <div className="space-y-4">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Component Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div>
                  <strong className="text-white">Splite Component:</strong>
                  <ul className="ml-4 mt-1 list-disc">
                    <li>Easy Spline scene integration</li>
                    <li>Built-in loading states</li>
                    <li>Event handlers support</li>
                    <li>Responsive by default</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-white">Spotlight Component:</strong>
                  <ul className="ml-4 mt-1 list-disc">
                    <li>Interactive hover effects</li>
                    <li>Customizable spotlight color</li>
                    <li>Smooth animations</li>
                    <li>Focus state support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Usage Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded bg-slate-900 p-4 text-xs text-slate-300">
{`import { Splite } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"

<Spotlight>
  <Splite 
    scene="your-scene-url"
    onLoad={(spline) => {
      console.log("Loaded!")
    }}
  />
</Spotlight>`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-700 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardHeader>
            <CardTitle className="text-white">Integration Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  All components are built with TypeScript for full type safety
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">•</span>
                <span>Styled with Tailwind CSS - customize via className props</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>Components use "use client" directive where needed</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">•</span>
                <span>Fully responsive and mobile-friendly</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
