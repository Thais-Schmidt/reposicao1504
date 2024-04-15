import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function App() {

  const navigation = useNavigation();

  const deletarRegistro = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM loja WHERE id=?;',
      [id],
      (_, { rowsAffected }) => {
        if( rowsAffected > 0 ) {
          atualizaLista();
          Alert.alert('Oia la ein', 'Tu excluiu o registro!')
        } else {
          Alert.alert('Vai paiaço', 'Tenta de novo que não foi!')
        }
      },
      (_, error) => {
        console.error('O registro não foi excluido', error);
      })
    })
  }

  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    atualizaLista();
  }, []);

  const atualizaLista = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM loja;',
        [], (_, { rows }) => {
          setRegistros(rows._array);
        });
    });
  };

  const renderRegistro = ({ item }) => (

    <View style={styles.registro}>
      <View>
        <Text style={styles.fontCard}>Modelo: {item.modelo}</Text>
        <Text style={styles.fontCard}>Marca: {item.marca}</Text>
        <Text style={styles.fontCard}>Memória: {item.memoria}</Text>
        <Text style={styles.fontCard}>Ano de Lançamento: {item.ano_lancamento}</Text>
        <Text style={styles.fontCard}>Data de Cadastro: {item.data_cadastro}</Text>
      </View>
      <View style={{display: 'flex', flexDirection:'row', gap: 30, justifyContent: 'center'}}>
        <Text style={{color: 'red', fontSize: 17}} onPress={() => deletarRegistro(item.id)}>EXCLUIR</Text>
        <Text style={{color: 'red', fontSize: 17}} onPress={() => navigation.navigate('Editar', { item: item })}>EDITAR</Text>
      </View>
    </View>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={registros}
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
  registro: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: 300,
    gap: 5
  },
  fontCard: {
    fontSize: 16
  }
});