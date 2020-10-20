import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

import OrphanageData from "./pages/createOrphanage/OrphanageData";
import SelectMapPosition from "./pages/createOrphanage/SelectMapPosition";
import Header from "./components/Header";

const { Navigator, Screen } = createStackNavigator();

export default function routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "#F2F3F5"
                }
            }}
            >
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                ></Screen>

                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                ></Screen>


                {/* Create Orphanage */}
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Selecione no mapa" />
                    }}
                ></Screen>

                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os Dados" />
                    }}
                ></Screen>


            </Navigator>
        </NavigationContainer>
    )
}