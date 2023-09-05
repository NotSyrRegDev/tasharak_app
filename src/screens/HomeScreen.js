import { View, Text ,StatusBar , StyleSheet , SafeAreaView , Image ,TouchableOpacity   ,FlatList  ,ScrollView ,Dimensions , RefreshControl , AppState  } from 'react-native'
import React , {useContext , useState , useEffect} from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';
import {HomeAdsCategories, HomeAdsOffers, HomeAdsTop} from '../components/HomeAds';
import {EstatesProducts} from '../common/Products';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AuthenticationContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const {width} = Dimensions.get('window');

const HomeScreen = ( { navigation } ) => {


  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [categoryThree, setCategoryThree] = useState([]);
  
  const { allProducts } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  
  useEffect(() => {
    // Filter the products based on category names
    const filteredCategoryOne = allProducts.filter(
      (product) => product.product_category === "عقارات"
    );
    const filteredCategoryTwo = allProducts.filter(
      (product) => product.product_category === "مناسبات"
    );
    const filteredCategoryThree = allProducts.filter(
      (product) => product.product_category === "مواصلات"
    );
  
    setCategoryOne(filteredCategoryOne);
    setCategoryTwo(filteredCategoryTwo);
    setCategoryThree(filteredCategoryThree);

  }, [allProducts]);


  return (
   <SafeAreaView  >
   
 <ScrollView >
  
     <View style={styles.container} >
    

  <StatusBar translucent backgroundColor="black" />


  { /* TOP HEADER TEXT */ }
    <View className="flex items-start mt-10 relative pb-5"   >

    <TouchableOpacity onPress={() => navigation.navigate('CountrySubScreen') } className="flex flex-row items-center" >
    <EvilIcons name="location" size={28} color="#DADADA" className="font-bold" />
    <Text className="text-xl text-right "  style={styles.title} >  موقعك </Text>
    
    </TouchableOpacity>
    

    <Text className="mt-2  text-right text-black text-base font-bold" style={styles.subtitle} >   المملكة العربية السعودية , جده </Text>

    {isAuthenticated && (
      <View className="absolute top-5 right-5" >

<View className="relative" >
{/* <View  className="rounded-full w-5 h-5 bg-red-500 absolute z-10 top-0 right-5"  >
    <Text className="text-white text-sm text-center" >2</Text>
  </View> */}
  <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen') } >
  <Ionicons name="notifications-outline" size={28} color="#DADADA" className="font-bold" />
  </TouchableOpacity>

</View>


</View>
    )}
  

    </View>

    { /*End TOP HEADER TEXT */ }

    { /* Search Bar */ }
    <View className="mt-2" >
    <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
    </View>
    

    { /* Start Carsouel */ }

    <HomeAdsTop navigation={navigation}  />

    { /* End SCarsouel */ }


    {/* PRODUCTSCATEGORY ONE START  */}

    <View>

<View className="flex items-start mt-10  "   >

<Text className="text-right text-black text-2xl font-bold" style={styles.subtitle} >  العقارات </Text>
</View>
{ /* Start Carsouel */ }

<FlatList
        data={categoryOne}
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item}) => {
         
          return (
            <Product id={item.id} title={item.product_name}  
             rating={item.productAdditional[0].productCase} price_per={item.productAdditional[0].dailyRentPrice} category={item.product_category} image={item.product_images[0]} navigation={navigation} />
          );
        }}
      />



{ /* End SCarsouel */ }
</View>

    {/* PRODUCTSCATEGORY ONE END  */}


    { /* Offers */ }
    <View>

    <View className="flex items-start mt-10  "   >

<Text className="  text-right text-black text-2xl font-bold" style={styles.subtitle} >  العروض </Text>
</View>
    { /* Start Carsouel */ }

    <HomeAdsOffers navigation={navigation}  />

{ /* End SCarsouel */ }
    </View>

    { /* End Offers */ }


    { /* Offers */ }
    <View>

    <View className="flex items-start mt-10  "   >

<Text className="  text-right text-black text-2xl font-bold" style={styles.subtitle} >  الفئات  </Text>
</View>

    { /* Start Carsouel */ }

    <HomeAdsCategories navigation={navigation}  />

    { /* End SCarsouel */ }

    

        
<View className="flex items-start mt-10  "   >

<Text className="text-right text-black text-2xl font-bold" style={styles.subtitle} >  المناسبات </Text>
</View>
{ /* Start Carsouel */ }

<FlatList
        data={categoryTwo}
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item}) => {
         
          return (
            <Product id={item.id} title={item.product_name}  
             rating={item.productAdditional[0].productCase} price_per={item.productAdditional[0].dailyRentPrice} category={item.product_category} image={item.product_images[0]} navigation={navigation} />
          );
        }}
      />

             
<View className="flex items-start mt-10  "   >

<Text className="text-right text-black text-2xl font-bold" style={styles.subtitle} >  المواصلات </Text>
</View>
{ /* Start Carsouel */ }

<FlatList
        data={categoryThree}
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item}) => {
         
          return (
            <Product id={item.id} title={item.product_name}  
             rating={item.productAdditional[0].productCase} price_per={item.productAdditional[0].dailyRentPrice} category={item.product_category} image={item.product_images[0]} navigation={navigation} />
          );
        }}
      />

    </View>

    { /* End Offers */ }


    </View>

</ScrollView>

   </SafeAreaView>
  )
}


const styles = StyleSheet.create({ 
 container: {
    backgroundColor: COLORS.White,
    height: '100%',
    direction: 'rtl',
    paddingHorizontal: 16,
    paddingBottom: 20,
    felx:1,
 },
 title: {
  color: COLORS.Gray,
  fontFamily: FONTFAMILY.font_bold,
  fontWeight: 'bold',
  
},
subtitle: {
  fontFamily: FONTFAMILY.font_medium,
  fontWeight: 300,
},

itemContainer: {
  
},
image: {
  minWidth: '100%',
  maxWidth: '100%',
  borderRadius: 30,
  maxHeight: '100%',
  minHeight: '50%',
},
slidePointsContainer: {
  marginTop: 10,
},
slidePoint: {
  width: 12,
  height: 12,
  borderRadius: 4,
  backgroundColor: '#bbb',
  marginHorizontal: 4,
},
activeSlidePoint: {
  backgroundColor: '#333',
},
listContainer: {
  paddingVertical: 16,
  paddingHorizontal: 8,
},
circle: {
  width: 20,
  height: 20,
  borderRadius: 100,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
},
text: {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
},
bellContainer: {
  backgroundColor: '#FD241'
},


});

export default HomeScreen