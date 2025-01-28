import { useColorScheme } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const styles = sharedStyles(colorScheme || 'light'); // Default to 'light' if colorScheme is null/undefined
  return { colorScheme, styles };
};