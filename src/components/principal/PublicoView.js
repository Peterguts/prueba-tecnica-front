import React, { useState, useEffect } from 'react';
import { API_ROUTES } from '../../config/config';
import styled from 'styled-components';
import axios from 'axios';
import Footer from '../footer/Footer'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding-top: 80px;
  padding-bottom: 80px;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0033cc;
  padding: 10px 20px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled.a`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Icon = styled.svg`
  margin-right: 8px;
`;

const Dropdown = styled.select`
  background-color: #0033cc;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0033cc;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 4px;
  width: 200px;
`;

const SearchIcon = styled.span`
  color: #007bff;
  margin-left: 0.5rem;
`;


const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  color: #007bff;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  color: #747a80;
  font-weight: bold;
`;

const Principal = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_ROUTES.PRODUCTS_DIS);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header>
        <HeaderContent>
          <Logo src="/img/letras.png" alt="Letras" />
          <Nav>
            <SearchContainer>
              <SearchInput type="text" placeholder="Buscar..." />
              <SearchIcon>🔍</SearchIcon>
            </SearchContainer>
            <NavLink href="#"></NavLink>
            <NavLink href="#">
              <Icon version="1.0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path d="M895 4536 c-16 -7 -41 -26 -55 -41 -21 -22 -25 -37 -25 -85 0 -48 4 -63 25 -85 48 -51 65 -55 259 -55 l180 0 10 -37 c23 -85 521 -2154 521 -2163 0 -5 -26 -23 -59 -39 -151 -77 -260 -231 -280 -400 -33 -270 157 -528 422 -574 l67 -11 0 -36 c0 -100 57 -230 136 -306 178 -175 461 -174 636 0 30 30 66 76 81 103 28 53 57 157 57 211 l0 32 383 0 384 0 11 -76 c36 -256 271 -437 516 -396 228 37 386 221 386 447 0 210 -138 389 -340 441 -135 34 -277 3 -396 -87 l-65 -49 -495 0 -495 0 -47 39 c-178 148 -428 148 -597 -1 -41 -36 -46 -38 -114 -38 -83 0 -131 17 -179 63 -120 115 -98 300 46 384 l47 28 1165 5 1165 5 60 24 c127 51 237 147 289 254 27 54 456 1433 456 1463 0 29 -38 98 -62 114 -20 13 -227 16 -1653 20 l-1630 5 -76 316 c-42 174 -82 332 -88 352 -18 54 -92 131 -153 158 -50 22 -66 24 -258 26 -157 2 -212 0 -235 -11z m1630 -1306 l0 -185 -331 -3 -330 -2 -42 172 c-23 95 -42 181 -42 191 0 16 22 17 373 15 l372 -3 0 -185z m635 0 l0 -190 -250 0 -250 0 0 183 c0 101 3 187 7 190 3 4 116 7 250 7 l243 0 0 -190z m640 0 l0 -190 -250 0 -250 0 0 190 0 190 250 0 250 0 0 -190z m918 177 c-2 -7 -28 -93 -58 -190 l-54 -177 -333 0 -333 0 0 190 0 190 391 0 c318 0 390 -2 387 -13z m-2188 -657 l0 -150 -280 0 -279 0 -10 38 c-13 48 -61 250 -61 257 0 3 142 5 315 5 l315 0 0 -150z m630 0 l0 -150 -250 0 -250 0 0 150 0 150 250 0 250 0 0 -150z m640 0 l0 -150 -250 0 -250 0 0 150 0 150 250 0 250 0 0 -150z m756 133 c-2 -10 -23 -78 -46 -150 l-41 -133 -264 0 -265 0 0 150 0 150 311 0 c291 0 310 -1 305 -17z m-2026 -608 l0 -185 -219 0 -219 0 -42 178 c-23 97 -44 180 -47 185 -2 4 115 7 261 7 l266 0 0 -185z m630 0 l0 -185 -250 0 -250 0 0 185 0 185 250 0 250 0 0 -185z m640 0 l0 -185 -250 0 -250 0 0 185 0 185 250 0 250 0 0 -185z m590 65 c-67 -212 -118 -250 -331 -250 l-119 0 0 185 0 185 244 0 244 0 -38 -120z m-1892 -1151 c106 -52 134 -192 56 -279 -20 -21 -55 -46 -79 -56 -148 -56 -291 96 -230 243 21 50 42 72 90 94 53 25 109 24 163 -2z m1709 -15 c49 -39 73 -87 73 -147 0 -170 -207 -249 -319 -122 -26 30 -51 89 -51 120 0 32 25 90 53 122 43 49 80 64 149 60 46 -3 65 -9 95 -33z"/>
                  <path d="M525 3748 c-51 -29 -60 -84 -20 -123 l24 -25 331 0 331 0 24 25 c40 40 30 96 -22 123 -30 17 -640 16 -668 0z"/>
                  <path d="M113 3328 c-33 -16 -48 -61 -33 -98 7 -17 21 -35 31 -40 10 -6 163 -10 369 -10 l351 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -348 -1 c-222 0 -356 -4 -370 -11z"/>
                  <path d="M435 2895 c-39 -38 -27 -102 22 -124 16 -7 160 -11 454 -11 l431 0 29 29 c31 32 35 50 17 84 -25 47 -19 46 -486 47 l-443 0 -24 -25z"/>
                </g>
              </Icon>
            </NavLink>
          </Nav>
        </HeaderContent>
        <HeaderContent>
        <Dropdown>
              <option value="">Departamentos</option>
              <option value="electronics">Electrónica</option>
              <option value="clothing">Ropa</option>
              <option value="home">Hogar</option>
            </Dropdown>
          <Nav>
            <NavLink href="#">Bodas y registros</NavLink>
            <NavLink href="#">Revistas</NavLink>
            <NavLink href="#">Privilegios</NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      <Container>
        <ProductsContainer>
        {products.map(product => (
          <ProductCard key={product.productoID}>
            <ProductImage src={product.imagenURL} alt={product.nombre} />
            <ProductTitle>{product.nombre}</ProductTitle>
            <ProductDescription>{product.descripcion}</ProductDescription>
            <ProductPrice>Q{product.precio}</ProductPrice>
          </ProductCard>
        ))}
        </ProductsContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Principal;