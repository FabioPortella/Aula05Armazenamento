import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function App() {

  const [chave, setChave] = useState('');
  const [valor, setValor] = useState('');

  const handleArmazenar = async () => {
    if (chave !== '' && valor !== '') {
      try {
        await SecureStore.setItemAsync(chave, valor);
        alert('Chave salva com sucesso');
        setValor('');
        setChave('');        
      }
      catch(e) {
        alert('erro');
      }
    }
  }

  const handleRecuperar = async () => {
    if (chave !== '') {
      try {
        let v = await SecureStore.getItemAsync(chave); 
        if(v !== null){
          setValor(v);
        }
      }
      catch {
        alert('erro');
      }
    }
  }

  const handleRemover = async () => {
    if (chave !== ''){
      try{
        await SecureStore.deleteItemAsync(chave);
        setChave('');
        setValor('');
      }
      catch{
        alert('erro');
      }
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Chave</Text>
        <TextInput style={{ backgroundColor: '#ccc', width: 300 }} value={chave} onChangeText={setChave} />
        <Text>Valor</Text>
        <TextInput style={{ backgroundColor: '#ccc', width: 300 }} value={valor} onChangeText={setValor} />
        <Button title="Armazenar" onPress={handleArmazenar} />
        <Button title="Recuperar" onPress={handleRecuperar} />
        <Button title="Remover" onPress={handleRemover}/>
      </SafeAreaView >
      <StatusBar style="dark" />
    </>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
)