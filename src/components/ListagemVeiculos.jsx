import './css/listagem.css';
import React, { useState } from 'react';

export function ListagemVeiculo({ setEditMode, setEditId, setProducts, products }) {

  const url = 'http://localhost:3000/products';
  const [mostrarLista, setMostrarLista] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ marca: '', modelo: '', ano: '', preco: '' });

  function lista() { setMostrarLista(true); } // Mostra Lista
  function excluir() { setMostrarLista(false); } // Tira lista

  // Deleta um elemento com confirmação
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este veículo?");
    if (confirmDelete) {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    }
  };

  // Edita um elemento
  const handleEdit = (product) => {
    setFormData({ marca: product.marca, modelo: product.modelo, ano: product.ano, preco: product.preco });
    setEditMode(true);
    setEditId(product.id);
    setEditingProduct(product);
  };

  // Sobe um elemento
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...editingProduct, ...formData };

    await fetch(`${url}/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    setEditingProduct(null);
    setEditMode(false);
    setFormData({ marca: '', modelo: '', ano: '', preco: '' }); // Reseta os campos do formulário
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section id='listagem'>
      <button onClick={lista} id='lista'>Veja nossos veículos</button>
      {mostrarLista && (
        <div className='caixaElementos'>
          <div id='headerCaixa'>
            <h3>Veículos disponíveis</h3>
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/ios-filled/50/x.png"
              onClick={excluir}
              alt="Fechar"
              style={{ cursor: 'pointer' }}
            />
          </div>

          {products.map((product) => (
            <div className="veiculos" key={product.id}>
              <div className="elementos">
                <div>
                  <ul>
                    <li><span className="bold">Marca:</span> {product.marca}</li>
                    <li><span className="bold">Modelo:</span> {product.modelo}</li>
                    <li><span className="bold">Ano:</span> {product.ano}</li>
                    <li><span className="bold">Preço:</span> {product.preco}</li>
                  </ul>
                </div>
                <div className="buttons">
                  <button style={{ background: 'green' }} onClick={() => handleEdit(product)}>Editar</button>
                  <button style={{ background: 'red' }} onClick={() => handleDelete(product.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))}

          {/* Formulário de edição */}
          {editingProduct && (
            <form onSubmit={handleUpdate} className='editor'>
              <h3>Editar Veículo</h3>
              <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" required />
              <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo" required />
              <input type="text" name="ano" value={formData.ano} onChange={handleChange} required />
              <input type="text" name="preco" value={formData.preco} onChange={handleChange} placeholder="Preço" required />
              <div className='buttonEditar'>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditingProduct(null)}>Cancelar</button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
