import { colors, fontsFamily } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  info: {
    flex: 1,
    gap: 7,
  },
  value: {
    fontSize: 14,
    fontFamily: fontsFamily.medium,
    color: colors.black,
  },
  description: {
    fontSize: 12,
    fontFamily: fontsFamily.regular,
    color: colors.gray[500],
  },
});
