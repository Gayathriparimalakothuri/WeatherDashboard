import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/search'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0)
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  return (
    <>
      <div>
        <Search apikey={apiKey}/>
        </div>
        <div>
          <Dashboard/>
        </div>
    </>
  )
}

export default App
