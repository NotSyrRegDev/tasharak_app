import { View , SafeAreaView , StyleSheet , StatusBar    ,  TouchableOpacity , ScrollView , Text , ActivityIndicator } from 'react-native'
import React , {useEffect , useState} from 'react'

import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
// import {categories} from '../common/Categories';
// import CategoryProduct from '../components/CategoryProduct';
import SearchBar from '../components/SearchBar';
import {getDocs  , collection , db , query , where } from '../../firebase';
import CategoryProduct from '../components/CategoryProduct';


const MyFavouritesScreen = ({ navigation }) => {

  const [loading , setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

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


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productIds = favorites.flatMap((favorite) => favorite.product_ids);
      
      const querySnapshot = await getDocs(collection(db, 'products') , where('id', '==', productIds[0]) );
      
      const allProducts = querySnapshot.docs.map((doc) => {
        const productData = doc.data();
        productData.id = doc.id;
        return productData;
      });
     
  
      setProducts(allProducts);
      setLoading(false);
    };
  
    fetchProducts();
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
  

      { /* END TOP HEADER TEXT */ }


      { /* FAVOURITEs COLUMN */ }

      { /* TOP HEADER TEXT */ }
      <View className="px-6 mt-5 mb-5 flex items-center justify-center" >
      <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
      </View>


      { /* END TOP HEADER TEXT */ }


      { /* CATEGORIES GRID */ }

      <View className="flex-row flex-wrap mx-2 mt-5" >

{loading ?  (
  <View className="mt-8 mb-8" >
        <ActivityIndicator animating={true} color={'#007FB7'} />
        </View>
) : products && products.length !== 0 ? products.map(({id , product_name , product_images , productAdditional  } , index) => (
  <View key={index} className="w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2" >
      <CategoryProduct navigation={navigation} id={id} title={product_name} product_image={product_images[0]} dailyRentPrice={productAdditional[0].dailyRentPrice} />
      </View>
)) : (
  <View className="w-full">

    <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start ">
    <Text style={styles.errorText}>عفوا لم نستطع العثور على أي منتج</Text>
    </View>

    <View className="flex items-center justify-center" >
    <TouchableOpacity
    className="mt-5 p-3 font-bold"
    onPress={() => navigation.navigate('HomeScreen')}>
    <Text style={styles.exploreButtonText}>    اضف منتجات للمفضلة   </Text>
    </TouchableOpacity>
    </View>

    </View>
)}


  </View>

      { /* End FAVOURITEs COLUMN */ }

      </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    minHeight: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },
 

} );

export default MyFavouritesScreen