import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    form: {
        alignSelf: 'stretch', // ocupar toda largura
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },
})

export default styles;