import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';


const Dashboard = () => {
    const [spots, setSpots] = useState([]);
    const user_id = localStorage.getItem('user')
    
    useEffect(() => {

       const handleLoadSpots = async() => {
          const spots = await api.get('/dashboard', {
                headers:{
                    user_id
                }
            })
            setSpots(spots.data);     
       }

       handleLoadSpots();

    }, [])

    return(
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header 
                            style={{ backgroundImage: `url(${spot.thumbnail_url})` }} 
                        />
                        <strong> 
                            {spot.company} 
                        </strong>
                        
                        <span>
                            {spot.price ? `R$ ${spot.price}/dia` : "Gratuito"}
                        </span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
               <button className="btn">Cadastrar novo spot</button> 
            </Link>
        </>
    )
}

export default Dashboard;