import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'; 
import Hero from './components/ui/custom/Hero';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Hero */}
      <Hero/>

    </>
  )
}

export default App
