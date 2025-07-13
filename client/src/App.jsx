import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Addblog from './pages/admin/Addblog'
import Listblog from './pages/admin/Listblog'
import Dashboard from './pages/admin/Dashboard'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:id" element={<Blog/>} />

        {/* Admin Routes */}
        {/* nested routing setup */}
        <Route path='/admin' element={false ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="addblog" element={<Addblog/>} />
          <Route path="listblog" element={<Listblog/> }/>
          <Route path="comments" element={<Comments/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
