import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-blue-900  to-primary  items-center text-white flex-col flex justify-center items-center'>
      <h2 className='text-3xl  font-bold flex justify-center text-white'>Browse all templates</h2>
      <p>What would you like to create today?</p>
      <div className='w-full flex justify-center items-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[60%] '>
          <Search className='text-primary'/>
          <input type='text' placeholder='Search.....'
          onChange={(event)=>onSearchInput(event.target.value)}
          className='bg-transparent w-full outline-none text-black'/>
        </div>

      </div>
    </div>
  )
}

export default SearchSection
