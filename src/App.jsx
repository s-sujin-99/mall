import { RouterProvider } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import root from './router/root.jsx';

function App() {

  return (
    <>
    <RouterProvider router={root} />
    </>
  )
}

export default App
