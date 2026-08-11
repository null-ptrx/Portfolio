import React from 'react'

const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Linux', 'C++', 'Git']

const Skills = () => {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-8">
        <span className="font-mono text-sm text-[#3B82F6]">$ cat skills.txt</span>
        <h2 className="font-mono text-3xl text-[#E6EDF3] mt-2">Skills</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-[#3B82F6] rounded-none bg-[#0F1419] px-4 py-2 font-mono text-sm text-[#E6EDF3]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Skills
