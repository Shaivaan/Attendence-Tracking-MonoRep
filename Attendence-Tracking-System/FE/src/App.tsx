import { Route, Routes } from 'react-router-dom'
import './App.css'
import RandomRoute from './screens/FallBack/RandomRoute'
import Dashboard from './screens/Dashbaord/Dashboard'
import Header from './components/created/Header'

function App() {
  return (
    <div className='p-10 flex flex-col gap-15'>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='*' element={<RandomRoute/>}/>
      </Routes>
    </div>
  )
}

export default App
