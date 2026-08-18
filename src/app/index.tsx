import { Button, Text, View } from "react-native";
import {router} from "expo-router"
import { HomeHeader } from "@/components/HomeHeader";

export default function Index() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Expo Router</Text>
            <Button title= "nova meta" onPress={() => router.navigate ("/target")}/>
            <Button title= "Transação" onPress={() => router.navigate ("/transaction/765890")}/>
            <Button title= "Progresso" onPress={() => router.navigate ("/in-progress/12")}/>
                
        </View>
    )
}