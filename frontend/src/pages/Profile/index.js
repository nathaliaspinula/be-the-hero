import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../service/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile',
        {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            alert('Registro excluído com sucesso.');
            setIncidents(incidents.filter(i => i.id !== id))
        }).catch(err => alert('Ocorreu um erro. Tente novamente.'));
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key = {incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>
                            
                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>
                            
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat(
                                'pt-BR',
                                { style: 'currency',
                                currency: 'BRL' }).format(incident.value)}</p>
        
                            <button onClick={ () => handleDeleteIncident(incident.id) } type = "button">
                                <FiTrash2 size={28} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))
                }
               
            </ul>
            {
                incidents.length === 0 ? 
                <span>Não há casos cadastrados.</span> : null
            }
        </div>
    )
}