import { colors, fontsFamily } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    minHeight: 48,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontsFamily.medium,
    fontSize: 14,
    color: colors.white,
  },
});