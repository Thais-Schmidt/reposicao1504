import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const db = new DatabaseConnection.getConnection;

export default function App() {

  const navigation = useNavigation()
  const navegaHome = () => {
    navigation.navigate('Home');
  };

  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const [registros, setRegistros] = useState([]);
  const [marca, setMarca] = useState(null);
  const [memoria, setMemoria] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [armazenamento, setArmazenamento] = useState(null);
  const [anoLancamento, setAnoLancamento] = useState(null);
  const [dataCad, setDataCad] = useState(dataAtual);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS loja (id INTEGER PRIMARY KEY AUTOINCREMENT, modelo TEXT, marca TEXT, memoria TEXT, armazenamento TEXT, ano_lancamento TEXT, data_cadastro TEXT)',
        [],
        () => console.log('Tabela loja criada com sucesso!'),
        (_, error) => console.error(error)
      );
    });

    //excluir a tabela
    //db.transaction(tx => {
    //  tx.executeSql(
    //    'DROP TABLE IF EXISTS loja;',
    //    [],
    //    () => console.log('Tabela loja excluída com sucesso!'),
    //    (_, error) => console.error('Erro ao excluir a tabela loja:', error)
    //  );
    //});

  }, []);

  //cadastrando o produto

  const cadastrarProduto = () => {

    if (
      modelo === null || modelo.trim() === '' ||
      marca === null || marca.trim() === '' ||
      memoria === null || memoria.trim() === '' ||
      armazenamento === null || armazenamento.trim() === '' ||
      anoLancamento === null || anoLancamento.trim() === '' ||
      dataCad === null || dataCad.trim() === '') {
      Alert.alert('Erro', 'Preencha corretamente todos os campos');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO loja (modelo, marca, memoria, armazenamento, ano_lancamento, data_cadastro) VALUES (?, ?, ?, ?, ?, ?);',
        [modelo, marca, memoria, armazenamento, anoLancamento, dataCad],
        (_,) => {
          Alert.alert('Oba!', 'O registro foi inserido com sucesso!');
          setModelo('');
          setMarca('');
          setMemoria('');
          setArmazenamento('');
          setAnoLancamento('');
          atualizaLista();
          navegaHome();
        },
        (_, error) => {
          console.error('Erro ao adicionar produto', error);
          Alert.alert('Erro', 'Ocorreu um erro ao adicionar o produto');
        }
      );
    });
  }

  const atualizaLista = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM loja;',
        [],
        (_, { rows }) => {
          setRegistros(rows._array)
        }
      );
    })
  }

  useEffect(() => {
    atualizaLista();
  }, [])

  return (

    <View style={styles.container}>

      <Text style={{ fontSize: 18 }}>Preencha os campos abaixo</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>para realizar o cadastro de um novo aparelho:</Text>

      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira o modelo'
        onChangeText={setModelo}
      />

      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira a marca'
        onChangeText={setMarca}
      />

      <Text style={styles.label}>Memória:</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira o tamanho da mémoria'
        onChangeText={setMemoria}
      />

      <Text style={styles.label}>Armazenamento:</Text>
      <TextInput
        style={styles.input}
        placeholder='Armazenamento disponivel'
        onChangeText={setArmazenamento}
      />

      <Text style={styles.label}>Ano de lançamento:</Text>
      <TextInput
        style={styles.input}
        placeholder='Ano em que foi lançado'
        onChangeText={setAnoLancamento}
      />

      <Text style={styles.label}>Data de cadastro:</Text>
      <TextInput
        style={styles.input}
        value={dataAtual}
        editable={false}
        onChangeText={setDataCad}
      />

      <Pressable
        onPress={cadastrarProduto}
        style={
          {
            backgroundColor: 'blue',
            width: 200,
            height: 40,
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 10,
            fontSize: 18
          }
        }
      >

        <Text style={{ color: 'white' }}>
          Cadastrar novo cliente
        </Text>

      </Pressable>




    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 5
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
