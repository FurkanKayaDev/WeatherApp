import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import styles from './Home.styles';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = {
    key: '486a7dceff36934a00e8daaa99a9630e',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `${api.baseUrl}weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.dir(err))
      .finally(() => {
        setLoading(false);
      });
  }, [api.key, input]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/bg3.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter city name and press return..."
            style={styles.textInput}
            onChangeText={text => setInput(text)}
            placeholderTextColor={'#000'}
            onSubmitEditing={fetchDataHandler}
            value={input}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data?.name}, ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>
              {`${Math.round(data?.main?.temp)}`} °C
            </Text>
            <View>
              <Text style={styles.minMaxText}>
                {`Min ${Math.round(data?.main?.temp_min)} °C / Max ${Math.round(
                  data?.main?.temp_max,
                )} °C`}
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Home;
