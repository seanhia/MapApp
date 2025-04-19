import { View, Text, StyleSheet } from "react-native"



export const TravelChallenges = () => {
    return (
        <View>
            <Text style={style.title}> Achievements</Text>
        <View>
          <Text style={style.yes}> First City Visited!</Text>
          <Text style={style.yes}> Visited 5 Cities </Text>
          <Text style={style.yes}> Visited 3 Countries</Text>
          <Text style={style.no}> Traveled over 1000 meters </Text>
          <Text style={style.no}> Share a post! </Text>
        </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    title: {
      marginTop: 16,
      paddingVertical: 6,
      borderWidth: 6,
      borderColor: '#FFFFFF',
      borderRadius: 15,
      backgroundColor: '#48b3ee',
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    yes: {
      marginTop: 12,
      padding: 12,
      borderRadius: 8,
      color: '#FFFFFF',
      backgroundColor: '#48b3ee',
    },
    no: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        color: '#FFFFFF',
        backgroundColor: '#888888',
      },
    column: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'center',
      marginBottom: 10,
      gap: 20,
    }
    })