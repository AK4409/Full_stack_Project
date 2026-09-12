import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex flex-row bg-blue-200 px-5 py-5'>
        <div className='flex flex-row'>
            <img src="/logo.png" alt="logo" className='size-25 mx-1.5' />
            <div className='grid grid-cols-1 leading-tight'>
                <h1 className='font-bold text-green-700 text-3xl'>Cloud Code</h1>
                <div className='font-semibold text-green-700'>
                <p>Build for learning Code</p>
                <p>Estd 2082</p>
                </div> 
            </div>

        </div>
        <div className='font-semibold text-green-500 text-2xl px-50'>
          <ul className='flex gap-5 place-items-end'>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul> 
        </div>

    </div>
  )
}

export default Navbar

