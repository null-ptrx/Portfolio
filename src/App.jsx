import React from 'react'
import bg3 from './assets/bg3.mp4'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RequestLogPanel from './components/RequestLogPanel'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

const App = () => {
  return (
    <>
      <video autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover z-0"> <source src={bg3} type="video/mp4" /></video>
      <div className="fixed inset-0 bg-black/50 z-10" />
      
      {/* Left Content Area */}
      <div className="relative z-20 flex flex-col min-h-screen lg:mr-80">
          <Navbar/>
      
        <About />
        <Projects />
        <Skills />
        <Contact />
          <Footer/>
      </div>

      {/* Right Fixed Panel */}
      <RequestLogPanel />
    </>
  )
}

export default App