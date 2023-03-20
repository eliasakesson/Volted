import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { colors } from '../colors';
import { AntDesign } from '@expo/vector-icons';

const SandboxProject = ({ data, navigation }) => {

  if (!data) return null;

  const [currentStep, setCurrentStep] = useState(0)
  const snapPoints = useMemo(() => ['15%', '40%'], []);

  return (
    <BottomSheet snapPoints={snapPoints} index={1} backgroundStyle={styles.tutorialBackground}>
      <View style={styles.tutorial}>
        <Text style={styles.tutorialHeader}>{data.title}</Text>
        <Text style={styles.tutorialText}>{data.steps[currentStep]}</Text>
        <View style={styles.tutorialSteps}>
          {currentStep > 0 &&
            <TouchableOpacity onPress={() => setCurrentStep(step => Math.max(step - 1, 0))} style={[styles.tutorialButton, {marginLeft: 0, flex: 0, marginRight: 25}]}>
              <AntDesign name="caretleft" size={18} color="white" />
            </TouchableOpacity>
          }
          {currentStep < data.steps.length - 1 ?
            <TouchableOpacity onPress={() => setCurrentStep(step => Math.min(step + 1, data.steps.length - 1))} style={styles.tutorialButton}>
              <Text style={styles.tutorialButtonText}>Nästa Steg</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => navigation.navigate("Success", { data })} style={styles.tutorialButton}>
              <Text style={styles.tutorialButtonText}>Testa koppling</Text>
            </TouchableOpacity>
          }
        </View>
        <Image source={require('../assets/maskot.png')} style={styles.maskot} />
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  // Tutorial
  tutorial: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: "100%",
  },
  tutorialBackground: {
    backgroundColor: colors.card,
    opacity: 0.7,
  },
  maskot: {
    position: 'absolute',
    top: 0,	
    right: 0,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  tutorialHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    marginRight: 120,
    color: colors.header,
  },
  tutorialText: {
    fontSize: 16,
    marginBottom: 20,
    marginRight: 120,
    color: colors.text,
  },
  tutorialSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: "auto",
    paddingBottom: 25,
  },
  tutorialStep: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 10,
  },
  tutorialButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    marginLeft: "auto",
    flex: 1,
  },
  tutorialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SandboxProject