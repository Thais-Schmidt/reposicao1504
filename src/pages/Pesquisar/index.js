import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function TelaPesquisa() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarRegistros = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM loja WHERE modelo LIKE ? OR marca LIKE ?;',
        [`%${query}%`, `%${query}%`],
        (_, { rows }) => {
          setResultados(rows._array);
        }
      );
    });
  };

  const renderRegistro = ({ item }) => (
    <View style={styles.registro}>
      <Text>Modelo: {item.modelo}</Text>
      <Text>Marca: {item.marca}</Text>
      <Text>Memória: {item.memoria}</Text>
      <Text>Ano de Lançamento: {item.ano_lancamento}</Text>
      <Text>Data de Cadastro: {item.data_cadastro}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o modelo ou marca"
        onChangeText={text => setQuery(text)}
      />
      <Text onPress={buscarRegistros}> BUSCAR</Text>
      
      <FlatList
        data={resultados}
        renderItem={renderRegistro}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 5,
  },
  registro: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
});
