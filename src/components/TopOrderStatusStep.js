import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';


const TopOrderStatusStep = ( { percentage , step , totalStep , headline  }) => {
  return (
    <View>
    <View className="flex flex-row items-center justify-between mb-4" >
        <Text style={styles.font} className="text-lg text-black text-left" > {headline} </Text>

        <Text style={[styles.font ]} className="text-lg text-black text-left" >  {step} / {totalStep} </Text>
        </View>

        <View style={styles.progrssContainer} >
        <View style={[styles.fill, { width: `${percentage}%` }]} />
        </View>

        <View className="flex flex-row justify-between mt-4" >

      <View>
      <View style={styles.progrssContainer} >
       
       <View style={[styles.fill, { width: `${100}%` }]} />
       </View>
        <View className="flex flex-row items-center mt-2" >
        <Text className="text-xs" style={styles.font} >تم الطلب</Text>
        <Ionicons name="checkmark-circle" size={18} color={COLORS.Green} className="font-bold" />
        </View>
     
      </View>

      <View>
      <View style={styles.progrssContainer} >
       
       <View style={[styles.fill, { width: `${step >= 2 ? 100 : 0}%` }]} />
       </View>
        <View className="flex flex-row items-center mt-2" >
        <Text className="text-xs" style={styles.font} > قيد التنفيذ </Text>
        {step >= 2 && (
          <Ionicons name="checkmark-circle" size={18} color={COLORS.Green} className="font-bold" />
        )}
        
        </View>
     
      </View>

      <View>
      <View style={styles.progrssContainer} >
       
       <View style={[styles.fill, { width: `${step >= 3 ? 100 : 0}%` }]} />
       </View>
        <View className="flex flex-row items-center mt-2" >
        <Text className="text-xs" style={styles.font} >تم الشحن</Text>
        {step >= 3 && (
          <Ionicons name="checkmark-circle" size={18} color={COLORS.Green} className="font-bold" />
        )}
        
        
        </View>
     
      </View>

      <View>
      <View style={styles.progrssContainer} >
       
       <View style={[styles.fill, { width: `${step >= 4 ? 100 : 0}%` }]} />
       </View>
        <View className="flex flex-row items-center mt-2" >
        <Text className="text-xs" style={styles.font} >تم التسليم</Text>
        {step >= 4 && (
          <Ionicons name="checkmark-circle" size={18} color={COLORS.Green} className="font-bold" />
        )}
       
        </View>
     
      </View>


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
        backgroundColor: COLORS.Green,
      },
      stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      step: {
        fontSize: 12,
        color: COLORS.Green,
      },
      stepActive: {
        color: COLORS.Green
      },
      font: {
        fontFamily: FONTFAMILY.font_regular
      }
});

export default TopOrderStatusStep