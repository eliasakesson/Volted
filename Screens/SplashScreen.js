import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Animated, Easing } from 'react-native';

export default function SplashScreen({ navigation }) {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(Dimensions.get("screen").height / 2)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
        }).start();

        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
        }).start();

        setTimeout(() => {
            navigation.replace('HomeTab');
        }, 2000)
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{translateY: translateYAnim}] }}>
                <Image style={styles.logo} source={require('../assets/maskot.png')} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    }
});
  