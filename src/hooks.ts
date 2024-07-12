import { useContext } from 'react';

import { EngageContext } from './contexts';

export const useEngage = () => useContext(EngageContext);
