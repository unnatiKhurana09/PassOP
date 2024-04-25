import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white w-full top-0'>
      <div className="mycontainer flex justify-between items-center px-4 py-8 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-600">&lt;</span>
          <span>Pass</span>
          <span className="text-green-600">OP/&gt;</span>
        </div>
        <button className='text-white bg-green-600 p-2 flex gap-4 rounded-full mx-2 font-bold'>
          <img className='w-6' src="./github-mark-white.png" alt="" />
          Github
        </button>
      </div>
    </nav>
  )
}

export default Navbar
