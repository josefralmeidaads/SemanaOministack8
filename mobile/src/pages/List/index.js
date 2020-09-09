import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, Text, Image } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png'

import SpotList from '../../components/SpotList'

const List = () => {
    const [techs, setTechs] = useState([]);

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