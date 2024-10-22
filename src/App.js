// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';
import ViewProduct from './components/ViewProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/delete-product/:id" element={<DeleteProduct />} />
        <Route path="/view-products" element={<ViewProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
