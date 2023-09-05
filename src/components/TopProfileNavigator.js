import { View, Text  , TouchableOpacity , StyleSheet} from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { FONTFAMILY , COLORS } from '../theme/theme';


const TopProfileNavigator = ( { navigation  , text  } ) => {
  return (
    <View className="pt-16 pb-5" >

<View className="flex-row items-center   relative"   >

    
    <TouchableOpacity className="px-4" onPress={() => navigation.goBack() } >
<SimpleLineIcons name="arrow-right" size={24} color="#007FB7" />
</TouchableOpacity>
      
<Text className="text-2xl text-center"  style={styles.title} > {text}   </Text>
  

</View>



    </View>

  )
}

const styles = StyleSheet.create({ 

  title: {
    color: COLORS.LightBLue,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },
})

export default TopProfileNavigator