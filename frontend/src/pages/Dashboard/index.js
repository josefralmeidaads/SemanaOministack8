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
    }), [user_id]); 
    
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests,data]);
        })    
    }, [ requests, socket ]);
    
    
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

    const handleAcceptBooking = async(id) => {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(requests => requests._id !== id));
    }

    const handleRejectionBooking = async(id) => {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(requests => requests._id !== id));
    }

    return(
        <> 
            <ul className="notifications">
                {requests.map( request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva
                            em<strong>{' ' + request.spot.company + ' '}</strong> 
                            para a data <strong>{request.date}</strong>
                        </p>
                        <button
                            onClick={() => handleAcceptBooking(request._id)} 
                            className="accept"
                        >
                            ACEITAR
                        </button>

                        <button 
                            onClick={() => handleRejectionBooking(request._id)} 
                            className="cancel"
                        >
                            RECUSAR
                        </button>
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