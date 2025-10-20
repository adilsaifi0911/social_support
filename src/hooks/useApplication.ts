import { useContext } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import type { ApplicationContextType } from '../context/ApplicationContext';

// Custom hook to use the application context
export const useApplication = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};