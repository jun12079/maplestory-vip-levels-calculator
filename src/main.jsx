import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/all.scss'

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
