import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from './ProductContext';

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

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Nombre</TableHeader>
          <TableHeader>Descripción</TableHeader>
          <TableHeader>Precio</TableHeader>
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
              <Card>
                <ProductImage src={product.image || 'https://via.placeholder.com/100'} alt={product.name} />
              </Card>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;