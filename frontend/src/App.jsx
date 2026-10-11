import React from 'react'

const App = () => {
  const api = import.meta.env.VITE_API_URL || ''
  const web3Key = import.meta.env.VITE_WEB3FORMS_KEY || ''
  const src = `/landing-pages/portfolio.html${api ? `?api=${encodeURIComponent(api)}` : ''}${web3Key ? `&apikey=${web3Key}` : ''}`

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
