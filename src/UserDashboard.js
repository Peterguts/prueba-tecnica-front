import React from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';

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

const UserDashboard = () => {
  return (
    <Container>
      <Title>Vista Usuario</Title>
      <ProductList />
    </Container>
  );
};

export default UserDashboard;