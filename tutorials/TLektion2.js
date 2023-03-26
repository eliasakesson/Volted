import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function TEnkelLampa({ styles, ChoiceComponent, toNextScreen }) {
  
  return (
    <>
      <Text style={styles.lektion}>Lektion 2</Text>
      <Text style={styles.title1}>Vad är en elektrisk krets</Text>
      <Text style={styles.text}>Antag att du sätter samman ett batteri och en lampa. Nu kommer elektricitet gå från ena sidan av batteriet till lampan. Elektriciteten fortsätter från lampan till andra sidan av batteriet. Detta är en krets. Alla prylar som behöver elektricitet består av kretsar.</Text>
      
      <Text style={styles.title2}>I exemplet börjar lampan lysa men hur bör man göra för att lampan ska slutar lysa, trots att den är kopplad till batteriet?</Text>
      <ChoiceComponent choices={["Ta sönder lampan med en hammare", "Knäcka sönder batteriet med en tång", "Bryta strömmen med exempelvis en knapp"]} rightAnswer={"Bryta strömmen med exempelvis en knapp"} />
      
      <Text style={styles.title2}>Har du någon gång suttit i en bil och kört förbi eller gått förbi en sådan här skylt?</Text>
      <Image style={styles.image} source={{uri: "https://th.bing.com/th/id/R.e1673603e87c8c5be05363c5953f0bfb?rik=2vWBx%2fmO7Ts1gg&pid=ImgRaw&r=0"}} />
      <Text style={styles.title3}>En stoppskylt tvingar bilar att stanna.</Text>
      <Text style={styles.text}>Att sätta en knapp i kretsen är som att sätta en stoppskylt i kretsen. Tänk dig nu att elektriciteten måste stanna för stoppskylten. Det blir snabbt kö och ingen elektricitet i hela kretsen kan röra sig. Överallt i kretsen, oavsett om det är efter eller innan stoppskylten/knappen, är elektriciteten stilla och ingen elektricitet kan nå lampan. Lampan släcks nu. Om du lyfter på knappen, tar bort stoppskylten, börjar elektriciteten köra igen och lampan kommer lysa.</Text>
      <Text style={styles.text}>När det inte finns någon stoppskylt i kretsen, när all elektricitet kan röra sig, kallas det att kretsen är sluten.</Text>
      <Text style={styles.text}>När det finns en stoppskylt, då all elektricitet står stilla, kallas det att kretsen är öppen.</Text>
      <Text style={styles.text}>Elektriciteten börjar vandra vid en strömkälla, exempelvis ett batteri eller eluttag. Elektroner börjar vandra från en pluspol (+) till en minuspol (-). Om du har sett ett batteri, har du kanske sett att det finns ett minustecken och ett plustecken. Dessa visar hur man ska sätta batteriet för att electriciteten ska vandra rätt håll. </Text>
      <Image style={styles.image} source={{uri: "https://4.bp.blogspot.com/-Y-eak4PlG3E/WjlwwibjDbI/AAAAAAAAFp8/rhszO6-4O5kTO-eINQEIB25VF1cpC7LFgCLcBGAs/s1600/DC-circuit.gif"}} />

      <Text style={styles.title2}>Redo att sätta kunskapen på prov?</Text>
      <Text style={styles.text}>Klicka på knappen nedan för att gå vidare till följande projekt.</Text>
      <TouchableOpacity style={styles.button} onPress={() => toNextScreen()}>
        <Text style={styles.buttonText}>Starta Projekt</Text>
      </TouchableOpacity>
    </>
  )
}
