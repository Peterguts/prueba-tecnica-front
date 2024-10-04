import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // Mock data
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100, sku: 'SKU1', inventory: 10, image: 'image1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200, sku: 'SKU2', inventory: 3, image: 'image2.jpg' },
    // Add more products as needed
  ]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;