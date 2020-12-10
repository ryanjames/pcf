import { createContext } from 'react';

const LoadedContext = createContext({
  isLoaded: false,
  setIsLoaded: () => {}
});

export default LoadedContext