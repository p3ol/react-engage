import { EngageContext } from '../src/contexts';

export const withEngage = (component, engage = {}) => (
  <EngageContext.Provider value={{ ...engage }}>
    { component }
  </EngageContext.Provider>
);
