import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormInput, FormLabel } from './FormStyles';
import { API_ROUTES } from '../../config/config';

const CrearProductoForm = ({ fetchProducts }) => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    sku: '',
    inventario: '',
    imagenURL: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(API_ROUTES.PRODUCT_CREAR, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
      clearForm();
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.response ? error.response.data.message : 'Error creating product');
    }
  };

  const clearForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      precio: '',
      sku: '',
      inventario: '',
      imagenURL: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormGroup>
        <FormLabel htmlFor="nombre">Nombre</FormLabel>
        <FormInput
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
        <FormInput
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="precio">Precio</FormLabel>
        <FormInput
          type="number"
          name="precio"
          id="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="sku">SKU</FormLabel>
        <FormInput
          type="text"
          name="sku"
          id="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="inventario">Inventario</FormLabel>
        <FormInput
          type="number"
          name="inventario"
          id="inventario"
          placeholder="Inventario"
          value={form.inventario}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="imagenURL">Imagen URL</FormLabel>
        <FormInput
          type="text"
          name="imagenURL"
          id="imagenURL"
          placeholder="Imagen URL"
          value={form.imagenURL}
          onChange={handleInputChange}
        />
        {form.imagenURL && (
          <img src={form.imagenURL} alt="Producto" style={{ marginTop: '10px', maxWidth: '100%' }} />
        )}
      </FormGroup>
      <Button type="submit">Crear Producto</Button>
    </form>
  );
};

export default CrearProductoForm;