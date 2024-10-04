import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from './ProductContext';
import ProductForm from './ProductForm';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 0.5rem;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  border: 1px solid #ddd;
`;

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100px;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const AdminDashboard = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <Container>
      <Title>Vista Admin</Title>
      <ProductForm />
      <Table>
        <thead>
          <tr>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Precio</TableHeader>
            <TableHeader>Acciones</TableHeader>
            <TableHeader>Imagen</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
                <ProductForm product={product} />
              </TableCell>
              <TableCell>
                <Card>
                  <ProductImage src={product.image || 'https://via.placeholder.com/100'} alt={product.name} />
                </Card>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;