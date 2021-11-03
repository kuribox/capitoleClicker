import { StyleSheet } from 'react-native';
import variables from '../../theme/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: variables.backgroundColor,
    padding: variables.padding
  },
  clickerButton: {
    backgroundColor: variables.primary,
    borderColor: '#32507c',
    borderWidth: 10,
    borderRadius: 60,
    width: '100%',
    marginVertical: variables.padding,
  },
  clickerValue: {
    textAlign: "center",
    fontSize: 35,
    color: variables.secondary,
    padding: variables.padding,
  },
  buttonCountainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  legend: {
    fontSize: 18,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  successText: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});
