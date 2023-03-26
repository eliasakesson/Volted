import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors } from "../colors";

export const projects = [
    {
        title: "Enkel krets",
        description: "Låt elektriciteten flöda genom kretsen.",
        id: "p64353",
        popular: true,
        difficulty: 0,
        icon: <MaterialIcons name="bolt" size={30} color="#fff" />,
        steps: [
            "Sätt ut ett batteri och en resistor.",
            "Sätt ut två sladdar.",
            "Koppla ihop batteriet och resistorn med sladdarna.",
        ]
    },
    {
        title: "Enkel lampa",
        description: "Använd en lampa och ett batteri för att få lampan att lysa.",
        id: "p86545",
        popular: true,
        difficulty: 0,
        icon: <FontAwesome5 name="lightbulb" size={30} color="#fff" />,
        steps: [
            "Sätt ut ett batteri och en lampa.",
            "Sätt ut två sladdar.",
            "Koppla ihop batteriet och lampan med sladdarna.",
        ]
    },
    {
        title: "Ljusstyrka på lampa",
        description: "Använd en lampa, ett batteri och en svag resistor för att få lampan att lysa.",
        id: "p36436",
        popular: true,
        difficulty: 1,
        icon: <Entypo name="light-up" size={30} color="#fff" />,
        steps: [
            "Sätt ut ett batteri, en lampa och en resistor.",
            "Sätt ut tre sladdar.",
            "Koppla batteriet till resistorn, resistorn till lampan och lampan till batteriet med sladdar.",
        ]
    },
    // {
    //     title: "Lampa med knapp",
    //     description: "Använd en lampa, ett batteri och en knapp för att få lampan att lysa.",
    //     id: "p57634",
    //     popular: true,
    //     difficulty: 0,
    //     icon: <Entypo name="light-up" size={30} color="#fff" />,
    //     steps: [
    //         "Koppla en kabel från batteriet till lampan.",
    //         "Koppla en kabel från lampan till resistorn.",
    //         "Koppla en kabel från resistorn till batteriet."
    //     ]
    // },
]

export const difficulties = ["Enkel", "Mellan", "Svår"]

export const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " år";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " månader";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " dagar";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " timmar";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minuter";
    }
    return Math.floor(seconds) + " sekunder";
  }

export function ProjectCard({project, navigation}) {
    return (
        <TouchableOpacity key={project.id} style={styles.project} onPress={() => navigation.navigate("Sandbox", { data: project })}>
            <View style={styles.innerproject}>
                <View style={styles.projectIcon}>
                    {project.icon}
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectLightText}>{project.description}</Text>
                </View>
            </View>
            {project.completed ?
            <View style={[styles.innerproject, {borderTopColor: colors.border, borderTopWidth: 0.5, flexDirection: "row"}]}>
                <Text style={styles.projectLightText}>
                    Avklarad: <Text style={styles.projectText}>14 dagar</Text> sedan
                </Text>
                <FontAwesome5 name="medal" size={18} color={["#cc6633", "silver", "gold"][project.difficulty]} />
            </View> :
            <View style={[styles.innerproject, {borderTopColor: colors.border, borderTopWidth: 0.5, flexDirection: "row"}]}>
                <Text style={styles.projectLightText}>
                    Svårighetsgrad: <Text style={styles.projectText}>{difficulties[project.difficulty]}</Text>
                </Text>
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    project: {
        backgroundColor: colors.card,
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 0.5,
        marginBottom: 20,
    },
    innerproject: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    projectTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
    projectText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "bold",
    },
    projectLightText: {
        color: colors.textLight,
        fontSize: 14,
    },
    projectNumber: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
    projectIcon: {
        backgroundColor: colors.primary,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
})