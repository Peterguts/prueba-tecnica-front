import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrash, faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { API_ROUTES, ROLE_CLAIM, ADMIN_ROLE } from '../../config/config';
import '../../styles/styles.css';
import {
  DashboardContainer,
  ProductTable,
  TableHeader,
  TableCell,
  Button,
  AddButton,
  DeleteButton,
  SearchBarContainer,
  SearchBar,
  SearchIcon,
  ListBox,
  FormContainer,
  Modal,
  ModalOverlay,
  CloseButton
} from './Dashboard.styles';
import CrearProductoForm from './CrearProductoForm';
import ActualizarProductoForm from './ActualizarProductoForm';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('nombre');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const role = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))[ROLE_CLAIM];
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ROUTES.PRODUCTS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDelete = async (productoID) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(API_ROUTES.PRODUCT(productoID), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredProducts = products.filter(product =>
    product[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredProducts.slice(offset, offset + itemsPerPage);

  return (
    <DashboardContainer>
      <h1>Dashboard para {role}</h1>
      <div>
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Cerrar Sesión
      </button>
    </div>
      <SearchBarContainer>
        <SearchIcon icon={faSearch} />
        <SearchBar
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ListBox value={searchField} onChange={handleSearchFieldChange}>
          <option value="nombre">Nombre</option>
          <option value="descripcion">Descripción</option>
          <option value="sku">SKU</option>
        </ListBox>
      </SearchBarContainer>
      <AddButton onClick={() => setShowCreateForm(!showCreateForm)} style={{ marginBottom: '1rem' }} >
        <FontAwesomeIcon icon={faPlus} /> {showCreateForm ? 'Ocultar Formulario' : 'Agregar Producto'}
      </AddButton>
      <FormContainer show={showCreateForm ? 'true' : undefined}>
        <CrearProductoForm fetchProducts={fetchProducts} />
      </FormContainer>
      <ProductTable>
        <thead>
        <tr>
  <TableHeader>ProductoID</TableHeader>
  <TableHeader>Nombre</TableHeader>
  <TableHeader>Descripción</TableHeader>
  <TableHeader>Precio</TableHeader>
  <TableHeader>SKU</TableHeader>
<TableHeader>Inventario</TableHeader>
<TableHeader>Imagen</TableHeader>
<TableHeader>Acciones</TableHeader>
</tr>
</thead>
<tbody>
  {currentPageData.map((product) => (
    <tr key={product.productoID}>
      <TableCell data-label="ProductoID">{product.productoID}</TableCell>
      <TableCell data-label="Nombre">{product.nombre}</TableCell>
      <TableCell data-label="Descripción">{product.descripcion}</TableCell>
      <TableCell data-label="Precio">{product.precio}</TableCell>
      <TableCell data-label="SKU">{product.sku}</TableCell>
      <TableCell data-label="Inventario">{product.inventario}</TableCell>
      <TableCell data-label="Imagen">
        {product.imagenURL ? (
          <img src={product.imagenURL} alt="Producto" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        ) : (
          'No Image'
        )}
      </TableCell>
      <TableCell data-label="Acciones">
        <Button onClick={() => handleEdit(product)}>
          <FontAwesomeIcon icon={faEdit} /> Editar
        </Button>
        {role === ADMIN_ROLE && (
          <DeleteButton onClick={() => handleDelete(product.productoID)}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </DeleteButton>
        )}
      </TableCell>
    </tr>
  ))}
</tbody>
</ProductTable>
<ReactPaginate
  previousLabel={'Anterior'}
  nextLabel={'Siguiente'}
  breakLabel={'...'}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>
<ModalOverlay show={showUpdateModal ? 'true' : undefined} onClick={() => setShowUpdateModal(false)} />
      <Modal show={showUpdateModal ? 'true' : undefined}>
        <CloseButton onClick={() => setShowUpdateModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <h2>Actualizar Producto</h2>
        {selectedProduct && (
          <ActualizarProductoForm
            product={selectedProduct}
            fetchProducts={fetchProducts}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Modal>
    </DashboardContainer>
  );
};

export default Dashboard;