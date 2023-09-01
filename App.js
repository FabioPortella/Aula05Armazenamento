import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

export default function App() {

  const path = '/dados/';
  const file = 'exemplo.txt';

  const criarPasta = async () => {

    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path)).exists === false) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + path);
      alert('Pasta criada');
      console.log('Pasta criada');
    }
    else {
      alert('Pasta já existe');
      console.log('Pasta já existe');
    }
  
    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path + file)).exists === false) {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + path + file, '');
      console.log('Arquivo criado');
    }
    else {
      console.log('Arquivo já existe');
    }
  }

  const addTexto = async () => {
    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path + file)).exists === false) {
      alert('Arquivo não criado');
    }
    else {
      const num = Math.floor(Math.random() * 100);
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + path + file, 'Sorteei o número: ' + num);
      alert('Número ' + num + ' sorteado com sucesso');
    }
  }

  const readTexto = async () => {
    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path + file)).exists === false) {
      alert('Arquivo não criado');
    }
    else {
      const data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + path + file);
      alert(data);
    }
  }

  const deletePasta = async () => {
    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path + file)).exists) {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + path + file);
      console.log('Arquivo removido');
    }
  
    if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + path)).exists) {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + path);
      alert('Pasta removida')
      console.log('Pasta removida');
    }
  }

  return (
    <View style={styles.container}>
      <Text>Exemplo de sistema de arquivos</Text>
      <Text></Text>
      <Button title='Criar pasta e arquivo' onPress={criarPasta} />
      <Text></Text>
      <Button title='Adicionar texto no arquivo' onPress={addTexto} />
      <Text></Text>
      <Button title='Ler texto do arquivo' onPress={readTexto} />
      <Text></Text>
      <Button title='Apagar arquivo e pasta' onPress={deletePasta}/>
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