import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormInput, FormLabel } from './ProductoForm.styles';
import { API_ROUTES } from '../../config/config';

const ActualizarProductoForm = ({ product, fetchProducts, closeModal }) => {
  const [form, setForm] = useState(product);
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(API_ROUTES.PRODUCT(form.productoID), form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setError(error.response ? error.response.data.message : 'Error updating product');
    }
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
      </FormGroup>
      <Button type="submit">Actualizar Producto</Button>
    </form>
  );
};

export default ActualizarProductoForm;