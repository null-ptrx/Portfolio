import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-8">
        <span className="font-mono text-sm text-[#3B82F6]">$ send_message</span>
        <h2 className="font-mono text-3xl text-[#E6EDF3] mt-2">Contact</h2>
      </div>

      <div className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-6 max-w-xl">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="name"
            className="bg-[#0A0E14] border border-[#1E3A5F] rounded-none px-4 py-2 font-mono text-sm text-[#E6EDF3] placeholder-[#4B5563] outline-none"
          />
          <input
            type="email"
            placeholder="email"
            className="bg-[#0A0E14] border border-[#1E3A5F] rounded-none px-4 py-2 font-mono text-sm text-[#E6EDF3] placeholder-[#4B5563] outline-none"
          />
          <textarea
            placeholder="message"
            rows={4}
            className="bg-[#0A0E14] border border-[#1E3A5F] rounded-none px-4 py-2 font-mono text-sm text-[#E6EDF3] placeholder-[#4B5563] outline-none"
          />
          <button className="border border-[#3B82F6] rounded-none px-5 py-2 font-mono text-sm text-[#3B82F6] w-fit">
            send -&gt;
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
