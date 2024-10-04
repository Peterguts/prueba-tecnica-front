import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { API_ROUTES, ROLE_CLAIM, ADMIN_ROLE } from './config/config';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productoID: '',
    nombre: '',
    descripcion: '',
    precio: '',
    sku: '',
    inventario: '',
    imagenURL: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const role = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))[ROLE_CLAIM];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_ROUTES.PRODUCTS);
      console.log('Fetched products:', response.data); // Verificar los datos recibidos
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(API_ROUTES.PRODUCT(form.productoID), form);
      } else {
        await axios.post(API_ROUTES.PRODUCTS, form);
      }
      fetchProducts();
      setForm({
        productoID: '',
        nombre: '',
        descripcion: '',
        precio: '',
        sku: '',
        inventario: '',
        imagenURL: ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = async (productoID) => {
    try {
      await axios.delete(API_ROUTES.PRODUCT(productoID));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          value={form.descripcion}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="inventario"
          placeholder="Inventario"
          value={form.inventario}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="imagenURL"
          placeholder="ImagenURL"
          value={form.imagenURL}
          onChange={handleInputChange}
        />
        <Button type="submit">{isEditing ? 'Actualizar' : 'Agregar'}</Button>
      </form>
      <ProductTable>
        <thead>
          <tr>
            <TableHeader>ProductoID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Descripcion</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>SKU</TableHeader>
            <TableHeader>Inventario</TableHeader>
            <TableHeader>ImagenURL</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productoID}>
              <TableCell>{product.productoID}</TableCell>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>{product.precio}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.inventario}</TableCell>
              <TableCell>{product.imagenURL}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(product)}>Editar</Button>
                {role === ADMIN_ROLE && (
                  <Button onClick={() => handleDelete(product.productoID)}>Eliminar</Button>
                )}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </ProductTable>
    </DashboardContainer>
  );
};

export default Dashboard;