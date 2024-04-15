import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {

    const navigation = useNavigation();

    const cadastrar = () => {
        navigation.navigate('Cadastro');
    };

    const pesquisar = () => {
        navigation.navigate('Pesquisar');
    };

    const editar = () => {
        navigation.navigate('Editar');
    };

    const exibir = () => {
        navigation.navigate('Exibir');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>O que gostaria de fazer?</Text>

            <View style={{ gap: 10 }}>

                <Button
                    title="Cadastrar"
                    onPress={cadastrar}
                />

                <Button
                    title="Pesquisar"
                    onPress={pesquisar}
                />

                <Button
                    title="Exibir"
                    onPress={exibir}
                />

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold'
    }
});
