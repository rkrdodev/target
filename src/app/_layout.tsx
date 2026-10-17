import { Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { colors } from "@/theme/colors";
import { Loading } from "@/components/loading";
import { TargetsProvider } from "@/data/TargetsProvider";
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <TargetsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      />
    </TargetsProvider>
  );
  
}
