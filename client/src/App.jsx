import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowProducts from './components/ShowProducts';
import AddProduct from './components/AddProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarMenu from './components/NavBarMenu';
import UpdateProduct from './components/UpdateProduct';
import ProductDetail from './components/ProductDetail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBarMenu />   
        <Routes>        
          <Route path="/" element={<ShowProducts />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/:id/" element={<ProductDetail />} />
          <Route path="/:id/update" element={<UpdateProduct />} />
        </Routes>    
    </Router>
  );
}

export default App;
