import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        console.log(response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data); 
        } else {
          setProducts([]); s
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); 
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); 
  };

  return (
    <Container>
      <h2>Product List</h2>
      <Button onClick={handleAddProduct} variant="primary" className="mb-3">
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(product.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewProduct;
