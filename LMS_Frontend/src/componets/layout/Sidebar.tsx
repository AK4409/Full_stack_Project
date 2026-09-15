import React from 'react'
import Home from '../../pages/Home'

function Sidebar() {
  return (
    <div className=''>
        <div className='bg-gradient-to-r from-pink-700 via-indigo-600 to-blue-700 mt-5 text-3xl text-green-700 font-bold py-6 px-3' >
          <h1>Dashboard</h1>
        </div>
        <div className='text-white'>
           <ul className='font-bold bg-indigo-400 text-xl '>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>Frontend Development</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>Backend Development</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>Full Stack Web Development</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>MEAN Stack</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>MERN Stack</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>Python</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>Machine Learning</li>
              <li className='border hover:text-green-500 cursor-pointer px-3 py-5'>DevOps</li>
           </ul>
        </div>
        <div>  
            
        </div>
        
    </div>
  )
}

export default Sidebar