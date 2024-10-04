import React, { useState } from 'react';

const AdminView = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', descripcion: 'Descripción 1', precio: 100, sku: 'SKU1', inventario: 10, imagen: 'url1' },
    { id: 2, name: 'Producto 2', descripcion: 'Descripción 2', precio: 200, sku: 'SKU2', inventario: 3, imagen: 'url2' },
    // Añade más productos aquí
  ]);

  const handleCreate = () => {
    // Implementar la lógica para crear un producto
  };

  const handleUpdate = (id) => {
    // Implementar la lógica para actualizar un producto
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <button onClick={handleCreate}>Crear Producto</button>
      <ul>
        {products.filter(p => p.inventario > 5).map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.descripcion}</p>
            <p>Precio: {product.precio}</p>
            <p>Inventario: {product.inventario}</p>
            <button onClick={() => handleUpdate(product.id)}>Actualizar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;
