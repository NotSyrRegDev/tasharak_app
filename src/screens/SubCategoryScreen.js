import { View, Text , SafeAreaView , StyleSheet , StatusBar , TextInput  , Image , TouchableOpacity , ActivityIndicator } from 'react-native'
import React , {useState , useEffect} from 'react'
import { ScrollView } from 'react-native';
import { FONTFAMILY , COLORS } from '../theme/theme';
import CategoryProduct from '../components/CategoryProduct';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {  query , collection , getDocs , db ,  where   } from "../../firebase";
import SearchBar from '../components/SearchBar';


const SubCategoryScreen = ({ navigation , route }) => {

  const [loading , setLoading] = useState(false);
  const [foundedProducts , setFoundedProducts] = useState([]);

    useEffect(() => {
       let catId = route.params.categoryId;
       let catName = route.params.categoryName;
       setLoading(true);

       const findTheProduct =  async () => {

        try {
          const q = query(collection(db, 'products'), where('product_category', '==', catName));
          const querySnapshot = await getDocs(q);
        
          // Process the querySnapshot and retrieve the matching products with IDs
          const matchingProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setLoading(false);
        
          setFoundedProducts(matchingProducts);
        } catch (error) {
          console.error('Error searching products:', error);
          setLoading(false);
        }

       }

       findTheProduct();
      

    } , [])

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>

      <View  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }

    



      <View className="flex-row flex-wrap items-center justify-center mt-8" >
    
      {!loading ? foundedProducts && foundedProducts.map(({id , product_name , product_images , productAdditional  } , index) => (
      <View key={index} className="w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2" >
      <CategoryProduct navigation={navigation} id={id} title={product_name} product_image={product_images[0]} dailyRentPrice={productAdditional[0].dailyRentPrice} />
      </View>
    )) : (
      <View className="mt-8 mb-8 " >
        <ActivityIndicator animating={true} color={'#007FB7'} />
        </View>
    ) }


      </View>

      { /* END CATEGORIES GRID */ }

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
  topAreaHeadins: {
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    
  },

  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.Gray,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
  },
  
  

} );

export default SubCategoryScreen