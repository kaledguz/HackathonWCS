import { Outlet } from "react-router-dom"
import NavBar from "./component/NavBar"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
