import { View, Text  , StyleSheet , StatusBar  , ScrollView} from 'react-native'
import React , {useContext} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import Category from '../components/Category';
import SearchBar from '../components/SearchBar';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';

const CategoryScreen = ({ navigation }) => {

  const { isLoading, categoryArray } = useContext(AppContext);

  return (
   
      
      <ScrollView>

      {isLoading && (
       <LoadingContainer />
      )}

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="flex items-center pt-28 pb-5" style={styles.topAreaHeadins}  >
  
      <Text className="text-3xl text-center text-white mb-8"  style={styles.title} > التصنيفات  </Text>
      <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
    
  
      </View>

      { /* END TOP HEADER TEXT */ }


      { /* CATEGORIES GRID */ }

      <View className="flex-row flex-wrap mx-2 mt-5" >

    {categoryArray && categoryArray.map(({id , category_name , category_image}) => (
     <Category id={id} title={category_name} image={category_image} navigation={navigation}  />
    ))}


      </View>

      { /* END CATEGORIES GRID */ }

      </View>

      </ScrollView>

   
  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    height: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
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
  loading: {
    marginLeft: -25,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  

} );

export default CategoryScreen