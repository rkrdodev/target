import { Button, Text, View } from "react-native";
import {router} from "expo-router"
import { HomeHeader } from "@/components/HomeHeader";

export default function Index() {
    return (
        <View style={{flex:1, }}> 
            <HomeHeader data={{total: "2.680,00"}}/>
        </View>
    )
}