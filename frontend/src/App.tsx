import './App.css'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card,CardContent } from "@/components/ui/card"

type StandoutItem = {
  hook: string
  explanation: string
  stat: string
}

type ReportResponse = {
  zinger_headline: string
  killer_insight: string
  what_we_asked: string
  what_stood_out: StandoutItem[]
}

function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/•/g, '')
}

function App() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [zingerHeadline, setZingerHeadline] = useState('')
  const [killerInsight, setKillerInsight] = useState('')
  const [whatWeAsked, setWhatWeAsked] = useState('')
  const [whatStoodOut, setWhatStoodOut] = useState<StandoutItem[]>([])

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ data: input }),
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const json: ReportResponse = await response.json()
      console.log('Report response:', json)
      setZingerHeadline(json.zinger_headline ?? '')
      setKillerInsight(json.killer_insight ?? '')
      setWhatWeAsked(json.what_we_asked ?? '')
      setWhatStoodOut(Array.isArray(json.what_stood_out) ? json.what_stood_out : [])
    } catch (error) {
      console.error('Failed to generate report', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-left mb-4">Formatting POC</h1>
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Label>Enter data here</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. Here are some different areas of health that some people say..." />
              <Button onClick={handleGenerateReport} disabled={isLoading} aria-busy={isLoading} aria-live="polite">
                {isLoading ? 'Generating...' : 'Generate report'}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-0 mb-4">
              <h1 className="text-1xl font-bold text-left">Zinger headline:</h1>
              <h1 className="text-1xl text-left">{zingerHeadline}</h1>
            </div>
            <div className="flex flex-col gap-0 mb-4">
              <h1 className="text-1xl font-bold text-left">Killer insight:</h1>
              <h2 className="text-1xl text-left">{killerInsight}</h2>
            </div>
            <div className="flex flex-col gap-0 mb-4">
              <h1 className="text-1xl font-bold text-left">What we asked:</h1>
              <h3 className="text-1xl text-left">{whatWeAsked}</h3>
            </div>
            <div className="flex flex-col gap-0 mb-4">
              <h1 className="text-1xl font-bold text-left">What stood out:</h1>
            <ul className="list-disc pl-6">
              {whatStoodOut.map((item) => (
                <li key={item.hook} className="mb-2 text-left">
                  <span className="font-bold">{stripMarkdownBold(item.hook)}:</span> {item.explanation} <span className="font-mono">{item.stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App