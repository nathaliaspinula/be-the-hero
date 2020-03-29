import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../service/api'
import logoImg from '../../assets/logo.svg';
import './styles.css'

export default function() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history =useHistory();

    function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        api.post('incidents', data, {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            alert('Caso criado com sucesso!');
            history.push('/profile');
        }).catch(err => alert('Ocorreu um erro. Tente novamente.'));
    }
    
    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero."/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>
                    <Link to="/" className="black-link">
                        <FiArrowLeft height={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do Caso"
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
                    />
                    <textarea
                        placeholder="Descrição"
                        value={ description }
                        onChange={ e => setDescription(e.target.value) }
                    />
                    <input
                        placeholder="Valor em reais"
                        value={ value }
                        onChange={ e => setValue(e.target.value) }
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}