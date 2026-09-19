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
    fontSize: 10,
    color: colors.blue[300],
    fontFamily: fontsFamily.regular,
  },
  value: {
    fontSize: 12,
    color: colors.blue[800],
    fontFamily: fontsFamily.medium,
  },
});