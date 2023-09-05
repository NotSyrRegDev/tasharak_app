import { View, Text  , StyleSheet , Image    , Pressable , TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useState , useEffect , useContext } from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import {getDocs  , collection , db } from '../../firebase';

const Product = ( {id , title  , rating , price_per , category , image , navigation} ) => {

  const [user, setUser] = useState(null);
  const {addToFavourite} = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('tashark_user');
        setUser(JSON.parse(value));
      } catch (error) {
     
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, 'favourites'));
      const favoritesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favoritesData);
    };

    fetchFavorites();
  }, []);


  function generateRandomValue() {
    const minValue = 2.9;
    const maxValue = 4.9;
  
    const randomValue = Math.random() * (maxValue - minValue) + minValue;
    return randomValue.toFixed(1);
  }

  const randomValue = generateRandomValue();

  const handleAddToFavourite = (productIdParam) => {

    addToFavourite(user.id, productIdParam);
    const isProductInFavorites = favorites.some((favorite) =>
      favorite.product_ids.includes(productIdParam)
    );

    if (isProductInFavorites) {
      // Remove the product from favorites
      const updatedFavorites = favorites.filter((favorite) =>
        !favorite.product_ids.includes(productIdParam)
      );
      setFavorites(updatedFavorites);
      
    } else {
      // Add the product to favorites
      const newFavorite = { product_ids: [productIdParam] };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
    }
  };
      
 
  return (
    <TouchableOpacity className="w-72" key={id} onPress={() => navigation.navigate('SingleProductScreen' , {
      productId : id
    }) } >

  <View style={styles.containerSlider}  className="mt-5" >

<View className="relative m-3 block overflow-hidden rounded-xl   " >
      <Image className="h-56 w-full object-cover" source={ { uri: image }}  resizeMode="cover" style={styles.productImage} />
    
        <View className="flex items-start" >
        <Text className="text-lg text-right mt-3 mx-2" style={styles.productTitle} > 
            {title} 
         </Text>
        </View>

      <View className="absolute top-5 left-5 px-4 " style={styles.categoryProduct} >
        <Text style={styles.categoryProductTitle} > {category} </Text>
      </View>

      {favorites.find((favorite) => favorite.product_ids.includes(id)) ? (
        <TouchableOpacity onPress={() => handleAddToFavourite(id)} className="absolute top-5 right-5" style={styles.categoryLoved}>
          <Ionicons name="heart" size={22} color="#FF4033" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleAddToFavourite(id)} className="absolute top-5 right-5" style={styles.categoryLove}>
          <Ionicons name="heart" size={22} color="#fff" />
        </TouchableOpacity>
      )}
     
      <View >

       
      </View>
      <View className="flex-row justify-between mt-3" >
       
        <View>
          <Text className="text-sm" style={styles.productPrice} >  يوم \ {price_per} ر.س </Text>
        </View>
       
        <View className="flex-row" >
          <FontAwesome name="star" size={22} color="#FFD700" />
          <Text className="text-sm font-bold mx-1" > {randomValue} </Text>
        </View>
      </View>
    </View>

</View>
    </TouchableOpacity>
  
  )
}

const styles  = StyleSheet.create({ 

    productTitle: {
        fontFamily: FONTFAMILY.font_regular,
        fontWeight: 200,
      },
      productPrice: {
        fontFamily: FONTFAMILY.font_bold,
        fontWeight: 'bold',
        color: COLORS.Blue,
        textAlign: 'left'
      },
      categoryProduct: {
        backgroundColor: COLORS.LightBLue,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        color: COLORS.White
      },
      categoryProductTitle: { 
        color: COLORS.White,
        fontFamily: FONTFAMILY.font_bold,
        fontWeight: 400,
        fontSize: 13,
      },
      categoryLove: {
        backgroundColor: COLORS.Green,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
      },
      categoryLoved: {
        backgroundColor: '#FFFAF5',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
      }
} )

export default Product