import Carro from '../assets/image/carroImage.png';
import './css/styleCadastro.css';
import React, { useState } from 'react';

export function CadastroVeiculos({setProducts, editMode}) {

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState();
    const [value, setValue] = useState('R$');

    const url = 'http://localhost:3000/products';
    
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace('', '').replace(/[^0-9.,]/g, '');
        setValue(`R$ ${numericValue}`);
    };

    //Ao Enviar
    const handleSubmit = async (e) => {

        e.preventDefault();
        const product = { marca, modelo, ano, preco: parseFloat(value.replace('', '').replace(',', '.')) };
        let res;

        if (editMode) {
            res = await fetch(`${url}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            setEditId(null);
        } else {
            res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        }

        const data = await res.json();
        setProducts((prevProducts) => {
            if (editMode) {
              return prevProducts.map((p) => (p.id === data.id ? data : p));
            } else {
              return [...prevProducts, data];
            }
        });
        

        // Limpar os campos após a submissão
        setMarca("");
        setModelo("");
        setAno("");
        setValue('R$ ');
    };

    return (
        <section id='cadastro'>
            <div>
                <h2>{editMode ? "Editar Produto" : "Cadastre Seu veículo"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Marca"
                        name="marca"
                        pattern=".{2,}"
                        required
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        title='Digite 2 caracteres no minimo'
                    />
                    <input
                        type="text"
                        placeholder="Modelo"
                        name="modelo"
                        pattern=".{2,}"
                        required
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        title='Digite 2 caracteres no minimo'
                    />
                    <input
                        type="text"
                        placeholder="Ano"
                        name="ano"
                        required
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        pattern="^(1[89][0-9]{2}|2024)$"
                        title={`O ano deve ser entre 1900 e 2024`}
                    />
                    <input
                        type="text"
                        placeholder="Preço"
                        value={value}
                        onChange={handleChange}
                        name="preco"
                        pattern='^R\$\s*([1-9]\d*|0[.][1-9]\d*)$'
                        required
                        title='O preço deve ser maior que 0'
                    />
                    <input type='submit' id='botaoEnviar' value={editMode ? "Atualizar" : "Criar"}  />
                </form>
            </div>
            <div>
                <img src={Carro} alt='Carro' />
            </div>
        </section>
    );
}
