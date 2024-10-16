import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
const Layout = () => {
  return (
   <Router>
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
    </Routes>
   </Router>
  )
}

export default Layout
