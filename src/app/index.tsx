import { Button, Text, View } from "react-native";
import {router} from "expo-router"

export default function Index() {
    return (
        <View style={{
            flex: 1, 
            alignItems: "center", 
            justifyContent: "center"}}>
            <Text> Expo Router </Text>
            <Button title="nova meta" onPress={() => router.navigate("/target")} />
            <Button title= "transação" onPress={() => router.navigate('transaction/765890')} />
            <Button title="Progresso" onPress={() => router.navigate ("/in-progress/12")}/>
        </View>
    )
}