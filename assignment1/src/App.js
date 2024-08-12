import './App.css';
import { Route, Routes } from 'react-router-dom';
import  HomeRoutes  from './Routes/HomeRoutes';

function App() {
  return (
    <>
      <Routes>
          <Route path="*" element={<HomeRoutes />} />
      </Routes>
    </>
  ); 
}

export default App;
