import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text , TouchableOpacity , Modal} from 'react-native'
import React , {useState , useEffect , useContext, useCallback} from 'react'

import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';


const AddressesScreen = ({ navigation }) => {

  const [loading , setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const {  findMyAddresses , myFoundedAddresses , deleteRecord } = useContext(AppContext);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [addressId , setAddressId] = useState('');


  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const value = await AsyncStorage.getItem('tashark_user');
          let jsonPrsed = JSON.parse(value);
          setUser(jsonPrsed);
          findMyAddresses(jsonPrsed.id);
          setLoading(false);
        } catch (error) {
     
        }
      };
  
      getData();
    }, [])
  );


  const handleDeleteRecord = () => {
  
    deleteRecord("addresses" , addressId);
    setModalDeleteVisible(!modalDeleteVisible)
    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 1500);
  }

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View className={styles.subContainer}  >

      <StatusBar translucent backgroundColor="black" />

      <View className="flex items-start mt-16 relative" style={styles.topAreaHeadins}>
  {!loading ? (
    myFoundedAddresses && myFoundedAddresses.length !== 0 ? (
      myFoundedAddresses.map(({id , address_name , address_street , address_city }) => (
        <View
          className="bg-white mt-8 px-4 py-6 flex flex-col items-start w-full rounded-xl"
          style={styles.box}
          key={id}
        >
          <Text style={styles.fontBold} className="text-base">
           {address_name}
          </Text>

          <Text style={styles.font} className="text-base mt-6 text-gray-300">
           {address_street}
          </Text>
          <Text style={styles.font} className="text-base mt-1 text-gray-300">
          {address_city}
          </Text>

          <View className="flex flex-row items-center absolute top-5 right-5">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditAddressScreen', {
                  addressId: id
                });
              }}
              className="mx-2"
            >
              <AntDesignIcons name="edit" size={25} color="#007FB7" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
          setModalDeleteVisible(!modalDeleteVisible);
          setAddressId(id);
          } } className="mx-2">
              <Octicons name="trash" size={25} color="#007FB7" />
            </TouchableOpacity>
          </View>
        </View>
      ))
    ) : (
      <View className="flex-col items-center justify-center mt-20">
       

        <Text className="text-center text-2xl mt-1" style={styles.font}>
        ليس لديك أية عنواين حاليا
        </Text>

        <TouchableOpacity
          className="mt-5 p-3 font-bold"
          onPress={() => navigation.navigate('AddAddressDetails')}
        >
          <Text style={styles.exploreButtonText}>  اضافة عنوان </Text>
        </TouchableOpacity>
      </View>
    )
  ) : null}


</View>

<View style={styles.topAreaHeadins} >
    <TouchableOpacity
      className="mt-8 rounded-full p-3 w-full"
      style={styles.button}
      onPress={() => navigation.navigate('AddAddressDetails')}
    >
      <Text style={styles.buttonText}> إضافة عنوان </Text>
    </TouchableOpacity>
  </View>

    </View>

    <Modal transparent={true} visible={modalDeleteVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} className="relative" >

  <View className="flex flex-col items-center justify-between" >
  <Image source={require('../assets/icons/alert_icon.png')} />
  <Text className="text-lg" style={styles.font} > هل أنت متاكد أتك تريد حذف عنوانك ؟   </Text>

  <View className="flex flex-row justify-center items-center mt-8" >
  <TouchableOpacity onPress={() => handleDeleteRecord() } className="rounded-lg mx-4" style={[ styles.activeBtnText ]}    >
<Text style={[styles.blackButtonText , styles.activeBtnText]} className=" px-2 py-2 text-white" > نعم متأكد </Text>
</TouchableOpacity>

<TouchableOpacity className="mx-4" onPress={() => setModalDeleteVisible(!modalDeleteVisible) }  >
<Text style={styles.blackButtonText}  > إلغاء الحذف </Text>
</TouchableOpacity>
  </View>

  </View>

<View className="absolute top-5 right-5" >
<TouchableOpacity onPress={() => setModalDeleteVisible(!modalDeleteVisible) } >
<AntDesignIcons name="close" size={22} color={COLORS.Black} />
</TouchableOpacity>
</View>

  </View>
</View>
  

</Modal>

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
  subContainer:{

  },
  topAreaHeadins: {
    paddingHorizontal: 20,
  },
  box: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  },
  fontBold: {
    fontFamily: FONTFAMILY.font_semi_bold,
  },
  button: {
    borderColor: 'none',
    backgroundColor: COLORS.LightBLue,
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.White,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    borderRadius: 10,
    maxHeight: '40%',
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
blackButtonText: {
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

} );

export default AddressesScreen