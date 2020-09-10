import React, { useState } from 'react';
import { SafeAreaView, View, Text, AsyncStorage, Alert } from 'react-native';
import { TextInput, RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api'

const Book = (props) => {
    const { navigation } = props;
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    const handleSubmit = async() => {
        const user_id = await AsyncStorage.getItem('user');

        const response = await api.post(`/spots/${id}/bookings`, {
            date
        }, { headers: { user_id } })

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    }

    const handleCancel = () => {
        navigation.navigate('List');
    }

    return(
        <SafeAreaView style={styles.container}>
                <Text style={styles.label}>DATA DE INTERESSE</Text>
                <TextInput
                    value={date}
                    onChangeText={text => setDate(text)}
                    style={styles.input}
                    placeholder="Qual data você quer reservar"
                    placeholderTextColor="#999"
                    autoCapitalize="words" // nenhuma letra em caixa alta 
                    autoCorrect={false}
                />
                <RectButton 
                    onPress={handleSubmit} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Solicitar Reserva
                    </Text>
                </RectButton>

                <RectButton 
                    onPress={handleCancel} 
                    style={styles.buttonCancel}
                >
                    <Text style={styles.buttonText}>
                        Cancelar
                    </Text>
                </RectButton>

        </SafeAreaView>
    )
}

export default Book;