import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative '>
            <div className='text-center mt-20 mb-8'>

                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-primary text-sm'>

                    <p>New : AI feature integreted</p>
                    <img src={assets.star_icon} className='w-2.5' alt="" />

                </div>

                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your AI-enhanced <span className='text-primary'>blogging</span> <br />journey.</h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>Your thoughts belong here. Write freely, share deeply, and let your story begin.</p>

                <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>

                    <input className="w-full pl-4 outline-none"type="text" placeholder='Search for blogs' required />

                    <button className="bg-primary text-white px-8 py-2  m-1.5 rounded hover:scale-105 transition0-all cursor-pointer"type='submit'>Search</button>
                    
                </form>

            </div>

            <img src={assets.gradientBackground} className="absolute -top-50 -z-1 opacity-50" alt="" />

        </div>
    )
}

export default Header
