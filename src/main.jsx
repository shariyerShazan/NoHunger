import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/Router';
import MyProvider from './context/Context';
// import { MyProvider } from './context/Context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyProvider >
    <RouterProvider router={router} >
    </RouterProvider>
    </MyProvider>
  </StrictMode>,
)
