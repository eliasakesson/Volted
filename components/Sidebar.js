import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, Easing } from 'react-native';
import CreateComponent from './CreateComponent';
import Battery from './electronics/Battery';
import Resistor from './electronics/Resistor';

export default function Sidebar() {

    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState("")
    const [components, setComponents] = useState([])
    const rightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rightAnim, {
            toValue: open ? 0 : Dimensions.get("screen").width,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
        }).start();
    }, [open])

    const basics = [
        <Battery />,
        <Resistor />
    ]

    useEffect(() => {
        switch (category) {
            case "basics":
                setComponents(basics)
                break;
            default:
                setComponents([])
                break;
        }
    }, [category])

    const handleCategoryButton = (newCategory) => {
        if (category === newCategory){
            setOpen(false)
            setCategory("")
            return
        }
        
        setOpen(true)
        setCategory(newCategory)
    }
    
  return (
    <View style={[styles.container, {right: open ? 220 : Dimensions.get("screen").width}]}>
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => handleCategoryButton("basics")}>
                <View style={styles.button}>
                    <MaterialCommunityIcons name="electric-switch" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryButton("lamps")}>
                <View style={styles.button}>
                    <MaterialCommunityIcons name="alarm-light" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryButton("wifi")}>
                <View style={styles.button}>
                    <MaterialCommunityIcons name="antenna" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryButton("lol")}>
                <View style={styles.button}>
                    <MaterialCommunityIcons name="check" size={30} color="white" />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            {components.map((component, index) => {
                return (
                    <CreateComponent key={index} /*setComponents={setComponents}*/>
                        {component}
                    </CreateComponent>
                )
            })}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        height: 400,
        width: Dimensions.get('screen').width - 220,
        zIndex: 1,
        backgroundColor: '#3e4553',
        borderBottomRightRadius: 15,
    },
    buttons: {
        position: 'absolute',
        left: "100%",
        top: 0,
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3e4553',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10,
    },
    content: {
        flex: 1,
        padding: 25,
    }
})