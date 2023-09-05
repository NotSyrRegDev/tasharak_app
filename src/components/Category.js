import { View, Text  , StyleSheet , Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';

const Category = ({ id , title , image , navigation }) => {
  return (
    <View key={id} className="w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2" >
      <TouchableOpacity
         onPress={() => navigation.navigate('SubCategoryScreen' , {
          categoryId: id ,
          categoryName: title
         })}
        >
    <View className="flex-grow flex-col items-center justify-center h-52 px-4" style={styles.categoryDiv} >
         <Image source={{ uri: image }} style={styles.categoryImg} />
         <Text style={styles.categoryTitle} className="text-lg text-center text-white mt-3" > {title} </Text>
        </View>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({ 

    categoryDiv: {
    borderRadius: 25,
    backgroundColor: COLORS.Blue,
    opacity: 0.5
  },
  categoryImg: {
    width: 70,
    height: 70,
  },
  categoryTitle: {
    fontFamily: FONTFAMILY.font_regular
  },

});

export default Category