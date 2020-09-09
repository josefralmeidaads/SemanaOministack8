import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api'
import styles from './styles';

const SpotList = (props) => {
    const { tech, navigation } = props;
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const handleLoadSpots = async() => {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data);
        }
        
        handleLoadSpots();

    }, [])

    const handleNavigate = (id) => {
        navigation.navigate('Book', { id });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Empresas que usam <Text style={styles.bold}>{tech}</Text>
            </Text>

            <FlatList
                style={styles.list}
                data={spots} 
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image 
                            style={styles.thumbnail}
                            source={{uri: item.thumbnail_url}}
                        />
                        <Text style={styles.company}>
                            {item.company}
                        </Text>
                        <Text style={styles.price} >
                            {item.price ? `R$ ${item.price}/DIA` : 'GRATUITO'}
                        </Text>
                        <RectButton 
                            style={styles.button} 
                            onPress={ () => { handleNavigate(item._id) } }
                        >
                            <Text style={styles.buttonText} >
                                Solicitar reserva
                            </Text>
                        </RectButton>
                    </View>
                )}            
            />

        </View>
    )
}

export default withNavigation(SpotList);