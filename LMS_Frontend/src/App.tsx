
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Sidebar from './componets/layout/Sidebar'
import Navbar from './componets/layout/Navbar'
import Footer from './componets/layout/Footer'


function App() {
  

  return (
    
    <>
      
      <Routes>
        <Route element={
          <>
            <Navbar/>
            <Sidebar/>
          </>
        }>
          <Route path='/' element={<Home/>}/>


        </Route>
        
      </Routes>
      <Footer/> 
    </>
  )
}

export default App
