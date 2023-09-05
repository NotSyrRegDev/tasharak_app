import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView , Text  , ActivityIndicator} from 'react-native'
import React, { useContext  , useEffect , useState } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import CategoryProduct from '../components/CategoryProduct';
import { AppContext } from '../context/AppContext';
import SearchBar from '../components/SearchBar';



const SearchScreen = ({ navigation , route }) => {
  const [loading , setLoading] = useState(false);
  const {  searchProduct , foundedProducts } = useContext(AppContext);

  

  useEffect(() => {
    setLoading(true);
 searchProduct(route.params.searchText);
 setLoading(false);
  } , [route.params.searchText]);


  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"البحث"} />

      { /* END TOP HEADER TEXT */ }
      <View className="mt-2" >
      <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
    </View>


      { /* FAVOURITEs COLUMN */ }

      { /* TOP HEADER TEXT */ }
     
          <View className="mt-5 p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-left flex items-start mb-5" >
          <Text style={styles.font} className="text-sm" > نتائج البحث عن : {route.params.searchText}  </Text>
          </View>

      { /* END TOP HEADER TEXT */ }


      { /* CATEGORIES GRID */ }

      <View className="flex-row flex-wrap items-center justify-center mt-5" >
    
      {!loading ? (
  foundedProducts.length !== 0 ? (
    foundedProducts.length === 1 ? (
     
      foundedProducts.map(({ id, product_name, product_images, productAdditional }, index) => (
        <View key={index} className="w-full">
          <CategoryProduct navigation={navigation} id={id} title={product_name} product_image={product_images[0]} dailyRentPrice={productAdditional[0].dailyRentPrice} />
        </View>
      ))
      
    ) : (
      // Output something for more than one product
      foundedProducts.map(({ id, product_name, product_images, productAdditional }, index) => (
        <View key={index} className="w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
          <CategoryProduct navigation={navigation} id={id} title={product_name} product_image={product_images[0]} dailyRentPrice={productAdditional[0].dailyRentPrice} />
        </View>
      ))
    )
  ) : (
    <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start w-full">
      <Text style={styles.errorText}>عفوا لم نستطع العثور على أي منتج</Text>
    </View>
  )
) : (
  <View className="mt-8 mb-8">
    <ActivityIndicator animating={true} color={'#007FB7'} />
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
  font: {
    fontFamily: FONTFAMILY.font_regular
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
    textAlign: 'right',
  }
 

} );

export default SearchScreen