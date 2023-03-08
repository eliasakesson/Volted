import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";

import TLektion1 from "./TLektion1";
import TLektion2 from "./TLektion2";

export const tutorials = [
    {
        screen: <TLektion1 />,
        title: "Introduktion elektricitet i vardagen",
        id: "t15815",
        popular: true,
        tutorialNumber: 1,
        difficulty: 0,
        length: "5 min",
        icon: <Feather name="book-open" size={30} color="#fff" />,
        next: "t43985",
    },
    {
        screen: <TLektion2 />,
        title: "Vad är en elektrisk krets?",
        id: "t43985",
        popular: true,
        tutorialNumber: 2,
        difficulty: 0,
        length: "10 min",
        icon: <Feather name="book-open" size={30} color="#fff" />,
        next: "p86545",
    },
]

export const difficulties = ["Enkel", "Mellan", "Svår"]

export function tutorialCard(tutorial, navigation) {
    return (
        <TouchableOpacity key={tutorial.id} style={styles.tutorial} onPress={() => navigation.navigate("Tutorial", { data: tutorial })}>
            <View style={styles.innerTutorial}>
                <View style={styles.tutorialIcon}>
                    {tutorial.icon}
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.tutorialNumber}>Lektion {tutorial.tutorialNumber}</Text>
                    <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                </View>
            </View>
            <View style={[styles.innerTutorial, {borderTopColor: colors.border, borderTopWidth: 0.5}]}>
                <Text style={styles.tutorialLightText}>
                    Svårighetsgrad: <Text style={styles.tutorialText}>{difficulties[tutorial.difficulty]}</Text>
                </Text>
                <Text style={styles.tutorialLightText}>
                    Längd: <Text style={styles.tutorialText}>{tutorial.length}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tutorial: {
        backgroundColor: colors.card,
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 0.5,
        marginBottom: 20,
    },
    innerTutorial: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    tutorialTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
    tutorialText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "bold",
    },
    tutorialLightText: {
        color: colors.textLight,
        fontSize: 14,
    },
    tutorialNumber: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
    tutorialIcon: {
        backgroundColor: colors.primary,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
})