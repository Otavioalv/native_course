import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './utils/convertCurrency';


export default function App() {
  const [amount, setAmount] = useState(""); 
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  



  async function fetchExchangeRate() {
    try {
      setLoading(true);
      if(!amount) return;

      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
      

      const converted = convertCurrency(amount, rate);
      // console.log(converted);

      setResult(converted);  
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
    // console.log("clicou");
    
  }

  function swapCurrency(){
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult("");
  }

  return (
    // View = div
    // Text = p
    // StatusBar = Barra de cima do celular
    // KeyboardAvoidingView = Garante que o 
    //  teclado nao fique na frente dos 
    //  componentes 

    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View 
          style={styles.content}
        >
          <StatusBar style="light"/>

          <View style={styles.header}>
            <Text style={styles.title}>
              Conversor de Moedas
            </Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes moedas  
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>

            <View style={styles.currencyGrid}>
              {currencies.map((currency, i) => (
                <Button 
                  variant='primary' 
                  currency={currency}
                  key={currency.code}
                  onPress={() => setFromCurrency(currency.code)}  
                  isSelected={fromCurrency === currency.code}
                >
                  
                </Button> 
              ))}
    
            </View>
            
            <Input 
              label="Valor: "
              value={amount}
              onChangeText={setAmount}
            />


            <TouchableOpacity
              style={styles.swapButton}
              onPress={swapCurrency}
            >
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.label}>
              Para:
            </Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency, i) => (
                <Button 
                  variant='secondary' 
                  currency={currency}
                  key={currency.code}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={toCurrency === currency.code}
                >
                </Button> 
              ))}
            </View>
            {/* <Button variant='secondary'></Button> */}
          </View>
          <TouchableOpacity 
            style={[
              styles.convertButton,
              (!amount || loading) && styles.convertButtonDisabled
            ]}
            onPress={fetchExchangeRate}
          >

            {loading ? (
              <ActivityIndicator color="white"/>
            ) : (
              <Text style={styles.swapButtonText}>
                Converter
              </Text>
            )}
          </TouchableOpacity>

          <ResultCard
            exchangeRate={exchangeRate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
