import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

const { Navigator, Screen } = createStackNavigator();

export default function routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false
            }}>
                <Screen
                    name="OrphanageMap"
                    component={OrphanagesMap}
                ></Screen>
                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                ></Screen>
            </Navigator>
        </NavigationContainer>
    )
}