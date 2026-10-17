import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontsFamily } from "@/theme/fonstsFamily";

export const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontsFamily.regular,
  },
  value: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontsFamily.medium,
  },
});