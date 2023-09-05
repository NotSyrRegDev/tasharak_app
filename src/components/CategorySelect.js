import { View, Text  , TouchableOpacity , Image  , StyleSheet} from 'react-native'
import React , {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const CategorySelect = ({ title, image, index, handleSelectItem, selectedItem }) => {

    const handlePress = () => {
        if (selectedItem === index) {
          handleSelectItem(null);
        } else {
          handleSelectItem(index);
        }
      };

  return (
    <TouchableOpacity onPress={handlePress}>
    <View key={index} className="flex-row items-center justify-between mt-10" >

    <View className="flex flex-row items-center" >
      <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
      <Text className="text-lg mx-2" style={styles.categoryTitle}>{title}</Text>
    </View>

    <View>

          <View style={styles.checkboxForm}>
            {selectedItem === index && (
              <Ionicons name="ellipse" size={18} color="#007FB7" style={styles.checkmark} />
            )}
          </View>
     
    </View>

  </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({ 

    checkboxForm:{
      width: 35,
      height: 35,
      borderWidth: 2,
      borderColor: '#D1D5DB',
      borderRadius: 500,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
  
  });

export default CategorySelect