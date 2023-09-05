import { View, Text , TextInput , StyleSheet } from 'react-native'
import React from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';


const DaysInput = ( { title ,state , setState  } ) => {
  return (
    <View className="text-center relative w-full h-16 flex justify-center mr-3" >

    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" htmlFor="username">
      {title}  <Text className="text-red-500 text-base" > * </Text>  
      </Text>
    <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="title"
      placeholder="يوم"
      keyboardType='numeric'
      value={state}
      onChangeText={(text) => setState(text) }

      />
      <View className="absolute top-5 right-0 px-2 h-14 " style={styles.buttonSubContainer} >
                <Text className="text-white text-lg text-center pt-3 " stlye={styles.font} > يوم </Text>
            </View>

    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
        color: COLORS.Black,
        fontFamily: FONTFAMILY.font_medium,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    inputStyle: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.Blue,
        backgroundColor: '#FAFAFA',
        textAlign: 'right',
      },
      buttonSubContainer: {
        backgroundColor: COLORS.LightBLue,
        borderRadius: 20,
      },
      font: {
        fontFamily : FONTFAMILY.font_medium,
        fontWeight: 300
      },

})

export default DaysInput