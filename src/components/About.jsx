import React from 'react'

const About = () => {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-8">
        <span className="font-mono text-sm text-[#3B82F6]">$ about_me</span>
        <h2 className="font-mono text-3xl text-[#E6EDF3] mt-2">About</h2>
      </div>

      <div className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-6">
        <p className="text-[#8B98A5] leading-relaxed">
          Final-year CSE student focused on backend engineering and the MERN stack.
          I build systems that are simple to reason about, from REST APIs to
          Dockerized deployments, and I document everything I learn along the way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-5 text-center">
          <p className="font-mono text-2xl text-[#3B82F6]">5+</p>
          <p className="text-[#8B98A5] text-sm mt-1">Projects built</p>
        </div>
        <div className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-5 text-center">
          <p className="font-mono text-2xl text-[#3B82F6]">150+</p>
          <p className="text-[#8B98A5] text-sm mt-1">DSA problems solved</p>
        </div>
        <div className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-5 text-center">
          <p className="font-mono text-2xl text-[#3B82F6]">MERN</p>
          <p className="text-[#8B98A5] text-sm mt-1">Primary stack</p>
        </div>
      </div>
    </section>
  )
}

export default About
