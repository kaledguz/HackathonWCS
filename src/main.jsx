import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import Home from './pages/Home.jsx';
import ChatInterface from './pages/ChatInterface.jsx';
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },  
  {
    path: "chatInterface",
    element: <ChatInterface />
  },
  {
    path: "contact",
    element: <Contact />
  } 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
