import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';


const Dashboard = () => {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    console.log(requests);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), []); 
    
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests,data]);
        })    
    }, []);
    
    
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
            <ul className="notifications">
                {requests.map( item => (
                    <li key={item._id}>
                        Company{item.spot.company}
                    </li>
                ))}
            </ul>

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