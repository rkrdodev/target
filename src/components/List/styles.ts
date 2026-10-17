import { colors, fontsFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 72,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    fontSize: 16,
    fontFamily: fontsFamily.medium,
    color: colors.black,
  },
  empty: {
    paddingTop: 16,
    fontSize: 14,
    color: colors.gray[600],
    fontFamily: fontsFamily.regular,
  },
});