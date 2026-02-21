import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import InvoiceBuilder from './Pages/InvoiceBuilder'
import Preview from './Pages/Preview'
import Login from './Pages/Login'
import Layout from './Pages/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:invoiceId' element={<InvoiceBuilder/>}/>
        </Route>

        <Route path='view/:invoiceId' element={<Preview/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App