import React, { useContext, useState } from 'react';
import { ProductContext } from './ProductContext';
import { AuthContext } from './AuthContext';

const ProductForm = ({ product }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
  const { role } = useContext(AuthContext);
  const [formData, setFormData] = useState(product || { name: '', description: '', price: '', sku: '', inventory: '', image: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      updateProduct(formData);
    } else {
      addProduct({ ...formData, id: Date.now() });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
      <input name="inventory" value={formData.inventory} onChange={handleChange} placeholder="Inventory" required />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image" required />
      <button type="submit" disabled={role === 'colaborador' && product}>Submit</button>
    </form>
  );
};

export default ProductForm;