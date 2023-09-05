import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView   , Text , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import Feather from '@expo/vector-icons/Feather';
import { FaqsTenant  , FaqsRented  } from '../common/Faqs';


const FaqScreen = ({ navigation }) => {

  const [activeState ,  setActiveState] = useState('tenant');

  const [showedText , setShowedText] = useState(null);

  const handleToggleText = (info) => {
    setShowedText(showedText === info ? null : info);
  };

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
    <TopProfileNavigator navigation={navigation} text={"الاسئلة الشائعة"} />

      { /* END TOP HEADER TEXT */ }
      <View className="flex items-center" style={styles.topAreaHeadins}  >

      <View
        className="mt-8  rounded-full px-6 py-4"
          style={styles.button}
          >
     
     <View className="flex-row items-center " >

      <TouchableOpacity onPress={() => setActiveState('tenant') } className="mx-2 " >
      <Text style={[styles.buttonText , activeState == "tenant" ? styles.activeBtnText : '' ]} className="mx-3" > مستأجر </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveState('rented') }  >
      <Text style={[styles.buttonText , activeState == "rented" ? styles.activeBtnText : '']} className="mx-3" > مؤجر </Text>
      </TouchableOpacity>
        
          
          </View>
        </View>

      </View>

      {activeState == "tenant" && (
        <View className="flex flex-col  mt-12" style={styles.topAreaHeadins} >

{FaqsTenant && FaqsTenant.map(({id , title , info}) => (

  <View className=" mt-5" key={id} >
<TouchableOpacity onPress={() => handleToggleText(info)} className="flex flex-row justify-between items-center" >
<View>
  <Text style={styles.font} className="text-base mt-5 text-left w-72" > {title} </Text>
  </View>

<View className="pt-2" >
<Feather  name="chevron-down" size={26} color="#22BC9F" />
</View>

  </TouchableOpacity>
  {showedText === info && (
    <View className="flex items-start mt-5 bg-gray-100 rounded-md px-4 py-4 " style={styles.transformY} >
    <Text style={[styles.font , styles.lineHeightFont]} className="text-sm text-left text-gray-500" >  {info} </Text>
  </View>

  )}

</View>
)) }

</View>
      )}

      {activeState == "rented" && (
        <View className="flex flex-col  mt-12" style={styles.topAreaHeadins} >

{FaqsRented && FaqsRented.map(({id , title , info}) => (

  <View className=" mt-5" key={id} >
<TouchableOpacity onPress={() => handleToggleText(info)} className="flex flex-row justify-between items-center" >
<View>
  <Text style={styles.font} className="text-base mt-5 text-left w-72" > {title} </Text>
  </View>

<View className="pt-2" >
<Feather  name="chevron-down" size={26} color="#22BC9F" />
</View>

  </TouchableOpacity>
  {showedText === info && (
    <View className="flex items-start mt-5 bg-gray-100 rounded-md px-4 py-4 " style={styles.transformY} >
    <Text style={[styles.font , styles.lineHeightFont]} className="text-sm text-left text-gray-500" >  {info} </Text>
  </View>

  )}

</View>
)) }




</View>
      )}

  

   


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
    paddingHorizontal: 30,
  },
  button: {
    borderColor: 'none',
    backgroundColor: '#F4F3F3',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    
    color: COLORS.Black,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    color: COLORS.Blue,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  },
  lineHeightFont: {
    lineHeight: 25,
  },
  transformY: {
    transform: [{ translateY: -5 }], 
  }
 

} );

export default FaqScreen