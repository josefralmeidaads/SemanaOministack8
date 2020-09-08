import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import './styles.css';

import camera from '../../assets/camera.svg'

const New = ({ history }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState(0);
    const [techs, setTechs] = useState([]);
    const user_id = localStorage.getItem('user');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('company', company)
        data.append('price', price)
        data.append('techs', techs)
        data.append('thumbnail', thumbnail)

        await api.post('/spots', data, {
            headers: {
                user_id: user_id
            }
        });
       
       history.push('/dashboard');
    }

    return(
        <form onSubmit={handleSubmit}>
            <label  
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input 
                    type="file"  
                    onChange={e => setThumbnail(e.target.files[0])}
                />
                <img src={camera} alt="camera" />
            </label>
            

            <label htmlFor="company">EMPRESA</label>
            <input
                value={company}
                onChange={e => setCompany(e.target.value)} 
                id="company"
                type="text" 
                placeholder="Digite o nome da empresa"
                required
            />

            <label htmlFor="price">VALOR</label>
            <input 
                value={price}
                onChange={e => setPrice(e.target.value)}
                id="price"
                type="text" 
                placeholder="Digite o valor da hora"
            />

            <label htmlFor="techs">TECNOLOGIAS</label>
            <input 
                value={techs}
                onChange={e => setTechs(e.target.value)}
                id="techs"
                type="text" 
                placeholder="Digite a tecnologia que a empresa trabalha"
                required
            />

            <button type="submit" className="btn">Cadastrar </button> 
        </form>
    )
}

export default New;