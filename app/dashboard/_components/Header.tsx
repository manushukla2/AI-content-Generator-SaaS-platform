import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-4 px-4 border-b-10  bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center p-2  border rounded-md max-w-lg bg-white'>
        <Search/>
        <input type='text' placeholder='Search....'
        className='outline-none'/>
      </div>
      <div>

      </div>
      <h2 className='bg-primary p-1 rounded-full text-xs text-white px-2'>
        Join Membership for just $9.99/Month
      </h2>
    
    </div>
  )
}

export default Header
