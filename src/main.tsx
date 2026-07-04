import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Content quality guardrail: audit all lessons/puzzles/nodes on every dev boot.
if (import.meta.env.DEV) {
  import('./content/validate').then(({ validateContent }) => {
    const problems = validateContent()
    if (problems.length) {
      console.error(`[content-validation] ${problems.length} problem(s):\n` + problems.map((p) => ' • ' + p).join('\n'))
    } else {
      console.info('[content-validation] ✓ all content valid')
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
