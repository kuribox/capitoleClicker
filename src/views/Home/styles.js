import { StyleSheet } from 'react-native';
import variables from '../../theme/variables';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: variables.backgroundColor,
    height: 200,
    flexDirection: 'column',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: variables.backgroundColor,
    padding: variables.padding
  },
  loginContainer: {
    display: "flex",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    paddingVertical: variables.padding,
    marginBottom: 20,
  },
  logo: {
    maxWidth: "80%",
    resizeMode: 'contain'
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    borderColor: variables.primary,
    borderRadius: 5,
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  userListTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userListContainer: {
    flex: 1,
    width: "100%",
  },
  userListElement: {
    paddingVertical: variables.padding,
    borderBottomColor: variables.primary,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
