import {
    Image, Text, View
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFonts } from 'expo-font';
import styles from '../../Styles/SplashScreen.styles';

import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const SplashMunnectScreen = ({navigation}) => {
    React.useEffect(() => {
        setTimeout(async () => {
            try {
                const isLogin = await AsyncStorage.getItem("isLogin");
                if (isLogin !== null && isLogin == 'true') {
                    navigation.navigate('HomeScreen');
                } else {
                    navigation.navigate('LoginScreen');
                }
            } catch (error) {
                console.error(error);
            }
        }, 2000);
    }, []);

    const [fontsLoaded] = useFonts({
        'Aclonica': require('../../assets/fonts/Aclonica.ttf'),
        'Arialn': require('../../assets/fonts/Arialn.ttf'),
        'Carola': require('../../assets/fonts/Carola.ttf'),
        'Garii': require('../../assets/fonts/Garii.ttf'),
        'Valky': require('../../assets/fonts/Valky.ttf'),
        'BohemeFloral': require('../../assets/fonts/BohemeFloral.otf'),
        'EDDrayton': require('../../assets/fonts/EDDrayton.otf'),
        'GoatskinBrush': require('../../assets/fonts/GoatskinBrush.otf'),
        'IndulgeScript': require('../../assets/fonts/IndulgeScript.otf'),
        'LazyFox': require('../../assets/fonts/LazyFox.otf'),
        'MBFSpaceHabitat': require('../../assets/fonts/MBFSpaceHabitat.otf'),
        'Menata': require('../../assets/fonts/Menata.otf'),
        'MightyWings': require('../../assets/fonts/MightyWings.otf'),
        'OPPOSans': require('../../assets/fonts/OPPOSans.otf'),
        'Seraphytes': require('../../assets/fonts/Seraphytes.otf'),
        'Sinistre': require('../../assets/fonts/Sinistre.otf'),
        'TikTokSans': require('../../assets/fonts/TikTokSans.otf'),
        'WorkSans': require('../../assets/fonts/WorkSans.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Image source={require('../../assets/images/iconLogo.png')} style={styles.iconLogo} />
            <Text style={styles.nameApp}>MUNNECT</Text>
        </View>
    )
}

export default SplashMunnectScreen;