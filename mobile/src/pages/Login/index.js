import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


import styles from './styles'
import logo from '../../assets/logo.png'
import api from '../../services/api'

const Login = (props) => {
    const { navigation } = props;

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
         AsyncStorage.getItem('user').then( user => {
             if (user){
               navigation.navigate('List') 
             }
         })
    }, [])

    const handleSubmit = async() => {
        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List');
    }

    return(
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container} >
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL</Text>
                <TextInput
                    value={email} 
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none" // nenhuma letra em caixa alta 
                    autoCorrect={false}
                />

                <Text style={styles.label}>TECNOLOGIAS</Text>
                <TextInput 
                    value={techs}
                    onChangeText={text => setTechs(text)} 
                    style={styles.input}
                    placeholder="Digite as tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words" // nenhuma letra em caixa alta 
                    autoCorrect={false}
                />
                <RectButton onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Encontrar Spots
                    </Text>
                </RectButton>

            </View>
        </KeyboardAvoidingView>
    )
}


export default Login;