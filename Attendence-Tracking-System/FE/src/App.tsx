import { Route, Routes } from 'react-router-dom'
import './App.css'
import RandomRoute from './screens/FallBack/RandomRoute'
import Dashboard from './screens/Dashbaord/Dashboard'
import Header from './components/created/Header'
import MarkAttendenceForm from './screens/MarkAttendence/MarkAttendenceForm'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className='p-10 flex flex-col gap-5'>
      <Header/>
      <Toaster/>
      <Router/>
    </div>
  )
}


const Router=()=>{
  return <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/mark' element={<MarkAttendenceForm/>}/>
        <Route path='*' element={<RandomRoute/>}/>
      </Routes>
}

export default App
