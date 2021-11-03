import React, { useState, useEffect } from 'react';
import { Button, View } from 'react-native';
import config from '../../config/config';
import variables from '../../theme/variables';

const AutoClicker = ({ name, buyAmount, value, clickAmount, onBuy, activeAutoClickers }) => {
  const [realBuyAmount, setRealBuyAmount] = useState(buyAmount);

  const [loaded, setLoaded] = useState(false);

  // Update buy amount
  useEffect(() => {
    const newAmount = activeAutoClickers * buyAmount + buyAmount;
    setRealBuyAmount(newAmount > config.clicker.maxValue ? config.clicker.maxValue : newAmount);
  }, [activeAutoClickers]);

  useEffect(() => {
    if (!loaded && value >= realBuyAmount) setLoaded(true);
  }, [value]);

  if (!loaded) return null;

  return (
    <View style={{marginBottom: variables.padding}}>
      <Button
        testID="button"
        color={variables.primary}
        disabled={value < realBuyAmount}
        title={`Buy Autoclicker ${name} (${realBuyAmount} Points)`}
        onPress={
          () => onBuy(name, clickAmount, realBuyAmount)
        }
      />
    </View>
  );
}

export default AutoClicker;
