import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';

const TopStepCounter = ( { percentage , step , totalStep , headline  }) => {
  return (
    <View>
    <View className="flex flex-row items-center justify-between mb-4" >
        <Text style={styles.font} className="text-lg text-white text-left" > {headline} </Text>

        <Text style={[styles.font ]} className="text-lg text-white text-left" >  {step} / {totalStep} </Text>
        </View>

        <View style={styles.progrssContainer} >
        <View style={[styles.fill, { width: `${percentage}%` }]} />
       
        </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
    progrssContainer: {
        height: 10,
        backgroundColor: COLORS.Gray,
        borderRadius: 5,
        overflow: 'hidden',
      },
    fill: {
        height: 10,
        backgroundColor: 'white',
      },
      stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      step: {
        fontSize: 12,
        color: 'gray',
      },
      stepActive: {
        color: COLORS.Green
      },
      font: {
        fontFamily: FONTFAMILY.font_regular
      }
});

export default TopStepCounter