import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("dados.db");

export default function App() {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("create table if not exists pessoa (id integer primary key not null, nome text not null, phone text not null)");
    });
    updateTotal();
  }, []);

  const gerar = (tamanho) => {
    let nome = '';
    let characters = '';
    
    characters = tamanho < 9 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';

    for (let i = 0; i < tamanho; i++) {
      nome += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return nome;
  };

  const updateTotal = () => {
    db.transaction((tx) => {
      tx.executeSql("select count(id) as total from pessoa", [], (_,{rows}) =>        
        setTotal(rows._array[0].total)
      );
    })
  }

  const addPessoa = () => {
    const nome = gerar(6);
    const phone = gerar(11);

    db.transaction((tx) => {
      tx.executeSql("insert into pessoa (nome, phone) values (?, ?)", [nome, phone]);
    });
    updateTotal();
  }

  const showAll = () => {
    db.transaction((tx) => {
      tx.executeSql("select id, nome, phone from pessoa", [], (trans, results)=>{
        alert(JSON.stringify(results.rows._array));
        console.log(results.rows._array);
      });
    })
  }

  const removeAll = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from pessoa");
    });
    updateTotal();
  }

  const [total, setTotal] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Cadastros: {total}</Text>
      <Button title='Inserir' onPress={addPessoa} />
      <Button title='Exibir todos' onPress={showAll}/>
      <Button title='Remover todos' onPress={removeAll}/>
      <StatusBar style="auto" />
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
});