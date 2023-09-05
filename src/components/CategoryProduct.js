import { View, Text  , StyleSheet , Image    , TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';


const CategoryProduct = ( { navigation , title , product_image , id }) => {

  function generateRandomValue() {
    const minValue = 2.9;
    const maxValue = 4.9;
  
    const randomValue = Math.random() * (maxValue - minValue) + minValue;
    return randomValue.toFixed(1);
  }
  const randomValue = generateRandomValue();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleProductScreen' , {
      productId : id
    }) }  style={styles.containerSlider}  >

<View className="relative  block  overflow-hidden rounded-xl  shadow-xl " >
      <Image className="w-full h-52 object-cover rounded-xl" source={ { uri: product_image } }  resizeMode="cover"  />
    
      <View className="flex items-start" >
        <Text className="text-sm text-left mt-3" style={styles.productTitle} > {title}  </Text>
        </View>


        <View className="absolute top-5 right-5" style={styles.categoryLove} >
      <Ionicons name="heart" size={20} color="#fff" />
      </View>

      <View >

      </View>
      <View className="flex-row justify-between mt-3 mx-3" >
       
        <View>
          <Text className="text-sm" style={styles.productPrice} > 44 ر.س \ يوم </Text>
        </View>
       
        <View className="flex-row items-center" >
          <FontAwesome name="star" size={12} color="#FFD700" />
          <Text >  {randomValue} </Text>
        </View>
      </View>
    </View>

</TouchableOpacity>
  )
}

const styles  = StyleSheet.create({ 

    containerSlider:{
        direction: 'rtl',
        paddingHorizontal: 8
    },
    productTitle: {
        fontFamily: FONTFAMILY.font_regular,
        fontWeight: 400,
      },
      productPrice: {
        fontFamily: FONTFAMILY.font_regular,
        fontWeight: 'bold',
        color: COLORS.Blue,
      },
      categoryProduct: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        color: COLORS.White
      },
      categoryProductTitle: { 
        color: COLORS.White,
        fontFamily: FONTFAMILY.font_regular,
        fontWeight: 400,
        fontSize: 15,
      },

      categoryLove: {
        backgroundColor: COLORS.Green,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
      },
  
} )

export default CategoryProduct