import { createContext } from 'react';
import { User } from '../types';

export const UserContext = createContext<{ user?: User; setUser?: () => void }>(
  {}
);
