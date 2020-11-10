import { useContext } from 'react';
import { StartToolInputContext } from '../contexts/StartToolInputContext';

export function useStartToolInput() {
  return useContext(StartToolInputContext);
}
