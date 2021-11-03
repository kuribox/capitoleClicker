import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  enableCache: true,
});

class RootStore {
  constructor() {
    this.user = null;

    this.setUser = (user) => {
      this.user = user;
    }

    this.updateUser = async (user) => {
      try {
        const userList = await storage.load({ key: 'users'})
        const existUser = !!userList.find(e => e.name === user.name);
        if (existUser) {
          storage.save({ key: 'users', data: userList.reduce((p, c) => {
            return [ ...p, c.name === user.name ? user : c];
          }, []) })
        }
      } catch (e)  {
        if (e.name === "NotFoundError") {
          storage.save({ key: 'users', data: [] })
          return
        }
        console.error(e)
      }
    }
  
    this.initUser = async () => {
      try {
        const userList = await storage.load({ key: 'users'})
        const existUser = userList.find(e => e.name === this.user.name);
        if (existUser) {
          this.setUser(existUser);
          return existUser;
        }
      } catch (e)  {
        if (e.name === "NotFoundError") {
          storage.save({ key: 'users', data: [] })
          return
        }
        console.error(e)
      }
    }

    this.localStorage = storage;
  }
}

export default RootStore;
