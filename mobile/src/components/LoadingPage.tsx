import React from 'react';
import { Dimensions, StyleSheet, Text, View, Animated, Image } from 'react-native';

import Loading from "../images/loading.gif";

export default function () {

    return (
        <View style={styles.fullPage}>
            <Image style={styles.loadingGif} source={Loading}></Image>
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fullPage: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    loadingGif: {
        resizeMode: "cover",
        height: Dimensions.get("screen").height,
        justifyContent: "center",
        flexDirection: "row"
    },
    textLoading: {
        position: "absolute",
        bottom: 100,
        color: '#FDFDFD',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    }
})