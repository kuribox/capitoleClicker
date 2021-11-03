import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ClickerComponent from '../../components/Clicker';
import { useStore } from '../../providers/StoreContext';

const Clicker = ({navigation})  => {
  const { initUser } = useStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    initUser().then(userData => {
      if (userData) {
        setUser(userData)

        navigation.setOptions({
          headerTitle: `Clicker - ${userData.name}`,
        });
      }
    })
  }, []);

  if (!user) return null;

  return <ClickerComponent user={user} />;
}

export default Clicker;