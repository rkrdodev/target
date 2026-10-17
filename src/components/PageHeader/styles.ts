import { colors, fontsFamily } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fontsFamily.bold,
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontsFamily.regular,
  },
});
