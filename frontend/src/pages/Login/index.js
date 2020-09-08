import React, { useState } from 'react';

import api from '../../services/api'

import './styles.css';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    //armazenando o _id em um banco local no browser
    localStorage.setItem('user', _id);

    history.push('/dashboard')

    setEmail('');
  }

    return( 
            <>
                <p>
                    Ofereça <strong>spots</strong> 
                    para programadores e encontre 
                    <strong> talentos</strong> para sua empresa
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-MAIL</label>
                    <input 
                        value={email}
                        onChange={ e => setEmail(e.target.value)} //setando o valor do evento do onChange para meu Email
                        type="email"  
                        id="email" 
                        required placeholder="Digite seu e-mail"
                    />

                    <button className="btn" type="submit">Entrar</button>
                </form>
            </>    
    )
}

export default Login;