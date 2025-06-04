import { Route, Routes } from 'react-router-dom'
import './App.css'
import RandomRoute from './screens/FallBack/RandomRoute'
import Dashboard from './screens/Dashbaord/Dashboard'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='*' element={<RandomRoute/>}/>
      </Routes>
      
    </div>
  )
}

export default App
