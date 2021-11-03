import { createContext, useContext } from 'react';

const context = createContext(null);

const useStore = () => {
  return useContext(context);
};

export default context;
export { useStore };
