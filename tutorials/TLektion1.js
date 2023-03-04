import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function TEnkelLampa({ styles, ChoiceComponent }) {
  return (
    <>
      <Text style={styles.lektion}>Lektion 1</Text>
      <Text style={styles.title1}>Introduktion elektricitet i vardagen</Text>
      <Text style={styles.text}>Elektricitet möter du troligtvis varje dag. Till exempel håller du troligtvis just nu i en apparat som behöver elektricitet. En apparat är en teknisk maskin. Du har kanske också en lampa i närheten. Denna behöver också elektricitet för att kunna lysa.</Text>
      
      <Text style={styles.title2}>Var finns de?</Text>
      <Text style={styles.text}>Vilken av följande prylar behöver elektricitet för att fungera?</Text>
      <ChoiceComponent choices={["Osthyvel", "Torktumlare", "Tejp"]} rightAnswer={"Torktumlare"} />
      
      <Text style={styles.text}>Köket har ofta dessa elektriska prylar: spis, ugn, mikrovågsugn, kylskåp, brödrost, lampa, vattenkokare, våffeljärn.</Text>
      <Text style={styles.text}>Vardagsrummet har ofta en tv, tv dosa, högtalare, bas.</Text>
      <Text style={styles.text}>Kontoret har kanske: dator, skrivare, datormus, headset.</Text>

      <Text style={styles.title2}>Olika typer av elektricitet</Text>
      <Text style={styles.title3}>Elektronisk elektricitet</Text>
      <Text style={styles.text}>Elektricitet som får tidigare apparater att fungera. Den kan antingen fungera genom att den kopplas till ett eluttag eller ett batteri.</Text>
      <Text style={styles.title3}>Statisk elektricitet</Text>
      <Text style={styles.text}>Har du någon gång testat att gnugga en ballong mot huvudet eller hoppat studsmatta? I så fall har du nog märkt att håret oftast reser sig så att du ser ut så här:</Text>
      <Image style={styles.image} source={{uri: "https://djursajten.se/wp-content/uploads/2021/05/pojke-med-statiskt-laddat-ha%CC%8Ar-600x400.jpg"}} />
      <Text style={styles.text}>Ett annat exempel på statisk elektricitet är när det slår ner en blixt vid oväder.</Text>

      <Text style={styles.title2}>Redo att sätta kunskapen på prov?</Text>
      <Text style={styles.text}>Klicka på knappen nedan för att gå vidare till nästa projekt.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sandbox")}>
        <Text style={styles.buttonText}>Starta Projekt</Text>
      </TouchableOpacity>
    </>
  )
}
