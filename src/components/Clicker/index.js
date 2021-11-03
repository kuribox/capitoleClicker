import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import useInterval from '../../utils/useInterval';
import config from '../../config/config';
import AutoClicker from '../AutoClicker';
import { useStore } from '../../providers/StoreContext';
import styles from "./styles";

const Clicker = ({ user })  => {
  const { updateUser } = useStore();

  const [clickerValue, setClickerValue] = useState(0);
  const [success, setSuccess] = useState(0);

  const [autoClickers, setAutoclickers] = useState([]);

  useEffect(() => {
    if (user) {
      setClickerValue(user.value);
      setAutoclickers(user.clickers);
    }
  }, []);

  useEffect(() => updateUser({ ...user, value: clickerValue, clickers: autoClickers }), [clickerValue, autoClickers]);

  useInterval(() => {
    if (autoClickers.length <= 0) return;
    incrementClicker(autoClickers.reduce((p, c) => p + c.value, 0))
  }, config.clicker.timeout);

  const incrementClicker = (amount = 1) => {
    if (clickerValue + amount > Number.MAX_SAFE_INTEGER) {
      setSuccess(true);
    } else {
      setClickerValue(clickerValue + amount);
    }
  }

  const substractClicker = (value) => {
    if (clickerValue >= value) {
      setClickerValue(clickerValue - value);
      return true;
    }
    return false;
  }

  // create clicker
  const createNewClicker = (name, buyAmount, clickAmount) => {
    if (substractClicker(buyAmount)) {
      setAutoclickers([
        ...autoClickers,
        { id: `${name}_${autoClickers.length}`, name, value: clickAmount }
      ]);
    }
  }

  if (success) return  (
    <View style={styles.successContainer}>
      <Text style={styles.successText}>
        Congratulations!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonCountainer} >
        <TouchableOpacity
          style={styles.clickerButton}
          onPress={() => incrementClicker()}
        >
          <Text testID="value" style={styles.clickerValue}>{clickerValue}</Text>
        </TouchableOpacity>
        {clickerValue < 10 && <Text style={styles.legend}>Please click on button</Text>}
      </View>

      <View style={{flex: 1}} testID="auto-clicker">
        {
          [...Array(config.clicker.autoClickerLevels)].map((e, i) => (
            <AutoClicker
              key={`Lvl ${i}`}
              name={`Lvl ${i}`}
              activeAutoClickers={autoClickers.filter((e) => e.name === `Lvl ${i}`).length}
              buyAmount={Math.floor(config.clicker.buyMinAmount * Math.exp(i))} // Crecimiento exponencial del costo base
              value={clickerValue}
              clickAmount={i + 1}
              onBuy={(name, clickAmount, buyAmount) => {
                createNewClicker(name, buyAmount, clickAmount);
              }}
              />
          ))
        }
      </View>
    </View>
  );
}

export default Clicker;
