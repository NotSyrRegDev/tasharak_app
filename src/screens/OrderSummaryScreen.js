import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView , Text , Image , Modal ,TouchableOpacity , ActivityIndicator } from 'react-native'
import React , {useState , useEffect ,useContext, useCallback } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import SearchBar from '../components/SearchBar';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';



const OrderSummaryScreen = ({ navigation }) => {

  const [orderId , setOrderId] = useState('');
  const [loading , setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const {  findMyProducts , myFoundedProducts , deleteRecord } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const value = await AsyncStorage.getItem('tashark_user');
          let jsonPrsed = JSON.parse(value);
          setUser(jsonPrsed);
          findMyProducts(jsonPrsed.id);
          setLoading(false);
        } catch (error) {
    
        }
      };
  
      getData();
    }, [user?.id])
  );



  const handleEdit = () => {
    setModalEditVisible(!modalEditVisible);
    setTimeout(() => {
      navigation.navigate('EditProductScreen' , {
        productId: orderId
      })
    } , 200)
  }
  const handleDeleteRecord = () => {
    
    deleteRecord("products" , orderId);
    setModalDeleteVisible(!modalDeleteVisible)
    setTimeout(() => {
      navigation.navigate('MyAccountScreen');
     }, 1500);
  }
  

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View style={{ paddingBottom: 130 }}  >

      <StatusBar translucent backgroundColor="black" />

      { /* FAVOURITEs COLUMN */ }

      { /* TOP HEADER TEXT */ }
      <View className="px-6 mt-5 mb-5" >
      <SearchBar navigation={navigation} placeholder={"عن ماذا تبحث"} icon={"search"} />
      </View>

      { !loading ? myFoundedProducts && myFoundedProducts.length !== 0 ? (
        
        myFoundedProducts.map(({ id , product_name , product_category , product_images , productAdditional}) => (
          <View key={id} className="bg-gray-100 flex flex-row items-center justify-between mx-4 rounded-xl" style={styles.orderSummaryDiv} >

      <View style={styles.orderInfo} >
        <Text style={styles.font} className="text-lg text-left w-52" > {product_name}  </Text>

        <View style={styles.productCateogry} className="rounded-full  px-3 py-1 mt-4" >
        <Text style={styles.font} className=" text-xs  text-white" > {product_category} </Text>
        </View>

        <View className="flex flex-row justify-between mt-8" >

        <View className="flex items-start mx-1" >
            <Text style={styles.font} className="text-sm" > السعر اليومي </Text>
            <Text style={styles.productPrice} className="text-blue-800 mt-2 text-sm" > {productAdditional[0].dailyRentPrice} ر.س </Text>
        </View>

        <View className="flex items-start mx-1" >
            <Text style={styles.font} className="text-sm" >  سعر التأمين </Text>
            <Text style={styles.productPrice} className="text-blue-800 mt-2 text-sm" > {productAdditional[0].insurancePrice} ر.س </Text>
        </View>

        </View>

      </View>

      <View style={styles.orderActions} className >
      <Image source={{ uri: product_images[0] }} style={styles.productImage} />

      <View className="flex flex-row items-center justify-around mt-8" >
      <TouchableOpacity onPress={() => {
        setModalEditVisible(!modalEditVisible);
        setOrderId(id);
         }
      } >
      <AntDesignIcons name="edit" size={25} color="#007FB7" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setModalDeleteVisible(!modalDeleteVisible);
        setOrderId(id);
         }
      } >
      <Octicons name="trash" size={25} color="#007FB7" />
      </TouchableOpacity>


      </View>

      </View>


      </View>
        ))

      
      ) : (
        <View>
      <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start w-full">
      <Text style={styles.errorText}>عفوا لم نستطع العثور على أي منتج</Text>
      </View>

      <View className="flex items-center justify-center" >
      <TouchableOpacity
      className="mt-5 p-3 font-bold"
      onPress={() => navigation.navigate('AddScreenInfo')}>
      <Text style={styles.exploreButtonText}>    قم باضافة منتجات </Text>
      </TouchableOpacity>
      </View>

      </View>
      )  : (


      <View className="mt-8 mb-8">
    <ActivityIndicator animating={true} color={'#007FB7'} />
  </View>
      )}

     

    


      </View>

      <Modal transparent={true} visible={modalEditVisible} animationType="slide">

        <View style={styles.modalContainer} >
          <View style={styles.modalContent} className="relative" >

          <View className="flex flex-col items-center justify-between" >
          <Image source={require('../assets/icons/edit_icon.png')} />
          <Text className="text-lg" style={styles.font} > هل تود تعديل غرضك؟ </Text>

          <View className="flex flex-row justify-center items-center mt-8" >
          <TouchableOpacity  className="rounded-lg mx-4" style={[ styles.activeBtnText ]} onPress={() => handleEdit() }   >
      <Text style={styles.buttonText} className=" px-2 py-2 text-white" > نعم متأكد </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mx-4" onPress={() => setModalEditVisible(!modalEditVisible) }  >
      <Text style={styles.blackButtonText}  > إلغاء التعديل </Text>
      </TouchableOpacity>
          </View>
    
          </View>

        <View className="absolute top-5 right-5" >
        <TouchableOpacity onPress={() => setModalEditVisible(!modalEditVisible) } >
        <AntDesignIcons name="close" size={22} color={COLORS.Black} />
        </TouchableOpacity>
        </View>

          </View>
        </View>
          

        </Modal>

      <Modal transparent={true} visible={modalDeleteVisible} animationType="slide">

        <View style={styles.modalContainer} >
          <View style={styles.modalContent} className="relative" >

          <View className="flex flex-col items-center justify-between" >
          <Image source={require('../assets/icons/alert_icon.png')} />
          <Text className="text-lg" style={styles.font} > هل أنت متاكد أتك تريد حذف غرضك؟   </Text>

          <View className="flex flex-row justify-center items-center mt-8" >
          <TouchableOpacity onPress={() => handleDeleteRecord() }  className="rounded-lg mx-4" style={[ styles.activeBtnText ]}    >
      <Text style={styles.buttonText} className=" px-2 py-2 text-white" > نعم متأكد </Text>
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
  productTitle: {
    fontFamily: FONTFAMILY.font_bold,
        fontWeight: 400,
  },
  productCateogry: {
    backgroundColor:COLORS.LightBLue,
    opacity: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    
  },
  productPrice: {
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    color: COLORS.Blue,
  },
  orderSummaryDiv: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  orderInfo: {
    flex: 0.7,
    alignItems: 'flex-start'
  },
  orderActions: {
    flex: 0.3
  },
  font: {
    fontFamily: FONTFAMILY.font_medium,
  },
  productImage: {
    width: 100,
    height: 90,
    borderRadius: 10,
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
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.White,
    textAlign: 'center',
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
    backgroundColor: COLORS.Blue,
    color: COLORS.White,
  },
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
      textAlign: 'right'
  },

} );

export default OrderSummaryScreen