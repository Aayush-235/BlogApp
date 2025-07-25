import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/appContext'

const Layout = () => {

    const navigate = useNavigate()
    const {setToken, axios} = useAppContext()
    const logout = () => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common['Authorization']
        setToken(null)
        navigate('/')
    }
    return (
        <>
            <div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <img src={assets.logo} className="cursor-pointer w-32 sm:w-40" onClick={() => (navigate('/'))} alt="" />
                <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
            </div>

            <div className='flex h-calc(100vh-70px)'>
                <Sidebar/>
                <Outlet/>
            </div>
        </>
    )
}

export default Layout
