import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

export default function App({ route }) {

  const navigation = useNavigation()
  const navegaHome = () => {
    navigation.navigate('Home');
  };
  const { item } = route.params; // Recebe o item a ser editado da tela anterior
  const [modelo, setModelo] = useState(item.modelo);
  const [marca, setMarca] = useState(item.marca);
  const [memoria, setMemoria] = useState(item.memoria);
  const [armazenamento, setArmazenamento] = useState(item.armazenamento);
  const [anoLancamento, setAnoLancamento] = useState(item.anoLancamento);

  const salvarEdicao = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE loja SET modelo=?, marca=?, memoria=?, armazenamento=?, ano_lancamento=? WHERE id=?;',
          [modelo, marca, memoria, armazenamento, anoLancamento, item.id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              Alert.alert('Sucesso', 'Registro atualizado com sucesso!');
              navegaHome();
            } else {
              Alert.alert('Erro', 'Não foi possível atualizar o registro.');
            }
          },
          (_, error) => console.error('Erro ao atualizar registro:', error)
        );
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Insira o modelo"
      />

      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Insira a marca"
      />

      <Text style={styles.label}>Memória:</Text>
      <TextInput
        style={styles.input}
        value={memoria}
        onChangeText={setMemoria}
        placeholder="Insira a memória"
      />

      <Text style={styles.label}>Armazenamento:</Text>
      <TextInput
        style={styles.input}
        value={armazenamento}
        onChangeText={setArmazenamento}
        placeholder="Insira o armazenamento"
      />

      <Text style={styles.label}>Ano de lançamento:</Text>
      <TextInput
        style={styles.input}
        value={anoLancamento}
        onChangeText={setAnoLancamento}
        placeholder="Insira o ano de lançamento"
      />

      <Button title="Salvar" onPress={salvarEdicao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
