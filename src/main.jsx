import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import App from "./App.jsx"
import Home from "./pages/Home.jsx"
import ChatInterface from "./pages/ChatInterface.jsx"
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import RegisterInfo from "./pages/RegisterInfo.jsx"
import Calendar from "./pages/Calendar.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "chatInterface",
        element: <ChatInterface />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "registerInfo",
        element: <RegisterInfo />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
