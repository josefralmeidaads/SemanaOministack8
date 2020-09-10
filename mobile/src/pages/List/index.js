import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, AsyncStorage, Text, Image } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png'
import socketio from 'socket.io-client'
import SpotList from '../../components/SpotList'

const List = () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then( user_id => {
            const socket = socketio('http://10.0.0.114:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} na data: ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REPROVADA' }`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })

    }, [])

    return(
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo} />
                <ScrollView>
                    {techs.map( tech => <SpotList key={tech} tech={tech} />)}
                </ScrollView>
        </SafeAreaView>
    )
}

export default List;