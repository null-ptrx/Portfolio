import React from 'react'

const App = () => {
  const api = import.meta.env.VITE_API_URL || ''
  const src = `/landing-pages/portfolio.html${api ? `?api=${encodeURIComponent(api)}` : ''}`

  return (
    <iframe
      src={src}
      title="nullptr portfolio"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block',
      }}
    />
  )
}

export default App
