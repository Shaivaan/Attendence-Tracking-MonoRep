import './App.css'
import { Button } from './components/shad-cn/button'
import useToggleTheme from './hooks/useToggleTheme'

function App() {
  const toggleTheme = useToggleTheme();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
        <Button onClick={toggleTheme} >Theme Toggle</Button>
      </div>
  )
}

export default App
