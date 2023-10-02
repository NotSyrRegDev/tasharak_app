import { View, Text ,StatusBar , StyleSheet , SafeAreaView , Image ,TouchableOpacity   ,FlatList  ,ScrollView ,Dimensions , RefreshControl   } from 'react-native'
import React , {useContext , useState , useEffect , useCallback} from 'react';
import { FONTFAMILY , COLORS } from '../theme/theme';
import {HomeAdsCategories, HomeAdsOffers, HomeAdsTop} from '../components/HomeAds';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AuthenticationContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import { collection , getDocs , db } from "../../firebase";
import SkeletonLoader from "expo-skeleton-loader";


const {width} = Dimensions.get('window');

const HomeScreen = ( { navigation } ) => {


  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [categoryThree, setCategoryThree] = useState([]);
  const [allProducts , setAllProducts] = useState([]);
  const { isLoading , setIsLoading  } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthenticationContext);

  const PostLayout = () => (
    <SkeletonLoader
    highlightColor="#f9f9f9"
    boneColor="#f9f9f9"
      style={{
        marginVertical: 10,
    
      }}
    >
    
    <SkeletonLoader.Container
    
          style={{ flex: 1, flexDirection: "row" , backgroundColor: '#f9f9f9' }}
        >
    
    <SkeletonLoader.Item
        style={{ width, height: height / 4.5, marginVertical: 10 , borderRadius: 15 }}
      />
    
     </SkeletonLoader.Container>
    
     
     <SkeletonLoader.Container style={{ flexDirection: 'row' , marginTop: 15 , backgroundColor: '#f9f9f9' , alignItems: 'center',  justifyContent: 'center' }} >
    
     <SkeletonLoader.Item
        style={{ width, height: height / 4.5, marginVertical: 10 , borderRadius: 15   }}
      />
    
      </SkeletonLoader.Container>
     
     <SkeletonLoader.Container style={{ flexDirection: 'row' , marginTop: 15 , backgroundColor: '#f9f9f9' , alignItems: 'center',  justifyContent: 'center' }} >
    
     <SkeletonLoader.Item
        style={{ width, height: height / 4.5, marginVertical: 10 , borderRadius: 15   }}
      />
    
      </SkeletonLoader.Container>
    
    </SkeletonLoader>
    );

  const getAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const allProducts = querySnapshot.docs.map((doc) => {
        const productData = doc.data();
        productData.id = doc.id;
        return productData;
      });
      setAllProducts(allProducts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllProducts();
    }, [])
  );

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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
      getAllProducts();
    }, 2000);
  };


  return (
    <ScrollView
    style={{backgroundColor:COLORS.White }}
      refreshControl={
        <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="black" 
    />
        }
    >
   <SafeAreaView  >
   
 <ScrollView >

 {isLoading ? (
  <View style={styles.marginContainer} >
        <View style={styles.container}>
     <PostLayout />
    </View>
        </View>
 ) : (

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
 )}
  


</ScrollView>

   </SafeAreaView>

   </ScrollView>
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
logo: {
  resizeMode: 'cover',
  maxHeight: 110,
  maxWidth: 350,
},
loadingContainer: { 
  flex: 1,
  height: '100%',
  direction: 'rtl',
  paddingHorizontal: 16,
  paddingBottom: 20,
},
textContainer: {
  alignItems: 'center',
},
font: {
  fontFamily: FONTFAMILY.font_regular
},
marginContainer: {
  paddingHorizontal: 15,
},

});

export default HomeScreen