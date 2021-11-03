import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, Text, ScrollView, Image, View, Button, TouchableOpacity } from 'react-native';
import { useStore } from '../../providers/StoreContext';
import LogoImg from '../../public/logo.png';
import styles from './styles';
import variables from '../../theme/variables';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
  const { localStorage, setUser } = useStore();
  const [user, setUserValue] = useState(null);
  const [userList, setUserList] = useState(null);

  useFocusEffect(
    useCallback(() => {
      localStorage.load({ key: 'users'}).then((e) => {
        setUserList(e);
      }).catch(() => {
        localStorage.save({ key: 'users', data: [] })
        setUserList([]);
      })
    }, [])
  );

  useEffect(() => {
    if (!userList) return;
    localStorage.load({ key: 'users'}).then((e) => {
      if (JSON.stringify(e) !== JSON.stringify(userList)) {
        localStorage.save({ key: 'users', data: userList })
      }
    }).catch(e => console.error(e))
  }, [userList]);

  const login = (currentUser) => {
    let userData = currentUser;
    if (!userData) {
      userData = { name: user, value: 0, clickers: []};
      localStorage.load({ key: 'users'}).then((e) => {
        setUserList([...e, userData]);
        setUser(userData);
        navigation.navigate('Clicker');
      })
    } else {
      setUser(userData);
      navigation.navigate('Clicker');
    }
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={LogoImg} />

      <View style={styles.loginContainer}>
        <Text style={styles.label}>
          Please enter your username
        </Text>
      
        <TextInput
          testID="user-input"
          style={styles.input}
          value={user}
          onChangeText={(v) => {
            setUserValue(v);
          }}
        />
        <Button
          testID="login-button"
          color={variables.primary}
          disabled={!user || user.lenght < 3}
          title="Join"
          onPress={() => {
            login(userList.find(e => e.name === user))
          }}
        />
      </View>

      <View style={styles.userListContainer}>
        {userList && userList.length > 0 && <Text style={styles.userListTitle}>Top 5 scores</Text>}
        {userList && userList.sort((a, b) => a.value > b.value ? -1 : 1 ).slice(0, 5).map((e) => (
          <TouchableOpacity onPress={() => login(e)} key={e.name} style={styles.userListElement}>
            <Text>
              {e.name}
            </Text>
            <Text>
              {e.value} 
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Home;

