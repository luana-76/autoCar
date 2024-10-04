import { Header } from './components/Header'
import { Main } from './components/main'
import { useState, useEffect } from 'react';

function App() {

  const url = 'http://localhost:3000/products';
  const [products, setProducts] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState(false);
  const [preco, setPreco] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // useEffect para buscar os produtos ao montar o componente
  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const data = await resp.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <>

      <Header/>
      <Main 
        url={url}
        products={products}
        setProducts={setProducts}
        marca={marca}
        modelo={modelo}
        ano={ano}
        preco={preco}
        editId={editId}
        setModelo={setModelo}
        setPreco={setPreco}
        setMarca={setMarca}
        setAno={setAno}
        editMode={editMode}
        setEditMode={setEditMode}
        setEditId={setEditId}
        />
    
    </>
    

  )
}

export default App
