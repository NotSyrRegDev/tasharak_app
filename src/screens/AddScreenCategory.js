import { View, Text , SafeAreaView , StyleSheet , StatusBar , Image , TouchableOpacity , ScrollView } from 'react-native'
import React , {useContext , useState} from 'react'
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FONTFAMILY , COLORS } from '../theme/theme';
import CategorySelect from '../components/CategorySelect';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';


const AddScreenCategory = ({ navigation }) => {

  const { isLoading, categoryArray } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (index) => {
    setSelectedItem(index);
  };

  return (
    
    <SafeAreaView style={styles.container} >

    <ScrollView>

    <View>

{isLoading && (
 <LoadingContainer />
)}

<StatusBar translucent backgroundColor="black" />
{ /* TOP HEADER TEXT */ }
<TopProfileNavigator navigation={navigation} text={"إضافة غرض"} />

{ /* CHOOSING CATEGORY */ }
<View style={styles.containerMargin} className="mt-10" >

<Text style={styles.textInput} className="text-2xl block text-gray-700 font-bold mb-2" htmlFor="username">
   اختر التصنيف <Text className="text-red-500 text-base" > * </Text>  
  </Text>

  { /* CHOOSING CATEOGRIES */}
  {categoryArray &&
        categoryArray.map(({ id, category_name, category_image }, index) => (
          <CategorySelect
            key={id}
            title={category_name}
            image={category_image}
            index={index}
            handleSelectItem={handleSelectItem}
            selectedItem={selectedItem}
          />
        ))}

          <View className="items-center flex-col mt-8 mb-8" >
          <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => { navigation.navigate('AddScreenInfo') } }
      >

      <Text style={styles.buttonText}> المتابعة  </Text>
      </TouchableOpacity>
          </View>
     
 
  { /* CHOOSING CATEOGRIES */}


</View>

{ /* END CHOOSING CATEGORY */ }

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
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.font_medium,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerMargin: {
    paddingHorizontal: 25,
  },
  categoryTitle: {
    fontFamily: FONTFAMILY.font_medium,
  },
  checkboxForm:{
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  button: {
    borderColor: 'none',
    width: '85%',
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 400,
    
    color: 'white',
    textAlign: 'center',
  },

});

export default AddScreenCategory