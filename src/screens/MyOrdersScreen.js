import { View, Text  , StyleSheet , StatusBar , TouchableOpacity  , Image , ActivityIndicator , Modal } from 'react-native'
import React , {useState , useContext , useEffect, useCallback} from 'react'
import { ScrollView } from 'react-native';
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { useFocusEffect } from '@react-navigation/native';


const MyOrdersScreen = ({ navigation }) => {

  const [activeState ,  setActiveState] = useState('tenant');
  const { isAuthenticated } = useContext(AuthenticationContext);

  const [loading , setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [orderId , setOrderId] = useState('');
  const {  findMyProducts  , myTenantProducts    , deleteRecord   , myRentedProducts } = useContext(AppContext);



  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const value = await AsyncStorage.getItem('tashark_user');
          let jsonPrsed = JSON.parse(value);
          setUser(jsonPrsed);
          findMyRented(jsonPrsed.id);
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
    <ScrollView>

    <View  style={styles.container} >

<StatusBar translucent backgroundColor="black" />
{ /* TOP HEADER TEXT */ }
<View className="flex items-center pt-10 pb-3" style={styles.topAreaHeadins}  >

<Text className="text-3xl text-center text-white mt-8" style={styles.title} > إيجاراتي  </Text>

<View className="flex items-center mb-5" style={styles.topAreaHeadins}  >

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

</View>

    <View className="bg-white rounded-xl -translate-y-5" >

    {activeState === "rented" && (
   !loading ? myRentedProducts && myRentedProducts.length !== 0 ? (
        
    myRentedProducts.map(({id , booking }) => (
      
      <View key={id} className="bg-gray-100 flex flex-row items-center justify-between mx-4 rounded-xl" style={styles.orderSummaryDiv}>
    <View style={styles.orderInfoBooking}>
    
      <Text style={styles.font} className="text-base text-left w-52"> {booking.product_name} </Text>

      <View style={styles.productCateogry} className="rounded-full px-3 py-1 mt-4">
        <Text style={styles.font} className="text-xs text-white"> {booking.product_category} </Text>
      </View>

      <View className="flex flex-row justify-between mt-8">
        <View className="flex items-start mx-1">
          <Text style={styles.font} className="text-sm"> السعر اليومي </Text>
          <Text style={styles.productPrice} className="text-blue-800 mt-2 text-sm"> {booking.dayPrice} ر.س </Text>
        </View>

        {/* Add similar blocks for other properties you want to display */}
      </View>
    </View>

    <View style={styles.orderActionsBooking} className>
    <Image className="w-full rounded-lg h-32"  source={{ uri: booking?.product_image }} />

    <TouchableOpacity onPress={() => navigation.navigate('BookingDetailScreen' , {
      orderId: id
    }) } style={styles.productCateogry} className="rounded-full px-2 py-2 mt-2 flex items-center justify-center">
        <Text style={styles.font} className="text-xs text-white"> عرض التفاصيل </Text>
      </TouchableOpacity>

    </View>
  </View>
        ))

      
      ) : (
        <View className="mt-8 mb-8">
      <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      )  : (

        <View className="flex-col items-center justify-center mt-20"   >
      <Image source={require('../assets/icons/empty_cart.png')} />

      <Text className="text-center text-2xl mt-1" style={styles.font} > لا توجد عناصر حاليا </Text>

  
    </View>
         
      )
)}

{activeState === "tenant" && (
   !loading ? myTenantProducts && myTenantProducts.length !== 0 ? (
      
    myTenantProducts.map(({id , booking }) => (
      
      <View key={id} className="bg-gray-100 flex flex-row items-center justify-between mx-4 rounded-xl" style={styles.orderSummaryDiv}>
    <View style={styles.orderInfoBooking}>
    
      <Text style={styles.font} className="text-base text-left w-52"> {booking.product_name} </Text>

      <View style={styles.productCateogry} className="rounded-full px-3 py-1 mt-4">
        <Text style={styles.font} className="text-xs text-white"> {booking.product_category} </Text>
      </View>

      <View className="flex flex-row justify-between mt-8">
        <View className="flex items-start mx-1">
          <Text style={styles.font} className="text-sm"> السعر اليومي </Text>
          <Text style={styles.productPrice} className="text-blue-800 mt-2 text-sm"> {booking.dayPrice} ر.س </Text>
        </View>

        {/* Add similar blocks for other properties you want to display */}
      </View>
    </View>

    <View style={styles.orderActionsBooking} className>
    <Image className="w-full rounded-lg h-32"  source={{ uri: booking?.product_image }} />

    <TouchableOpacity onPress={() => navigation.navigate('BookingDetailScreen' , {
      orderId: id
    }) } style={styles.productCateogry} className="rounded-full px-2 py-2 mt-2 flex items-center justify-center">
        <Text style={styles.font} className="text-xs text-white"> عرض التفاصيل </Text>
      </TouchableOpacity>

    </View>
  </View>
        ))
      
      ) : (
        <View className="mt-8 mb-8">
      <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      )  : (

        <View className="flex-col items-center justify-center mt-20"   >
      <Image source={require('../assets/icons/empty_cart.png')} />
      <Text className="text-center text-2xl mt-1" style={styles.font} > لا توجد عناصر حاليا </Text>

    {isAuthenticated ? (
      <TouchableOpacity
      className="mt-5 p-3 font-bold"
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.exploreButtonText}>   استأجر الان </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
      className="mt-5 p-3 font-bold"
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.exploreButtonText}>   تسجيل الدخول </Text>
      </TouchableOpacity>
    )}
    </View>
          
      )
)}
    </View>

     




</View>

<Modal transparent={true} visible={modalEditVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} className="relative" >

  <View className="flex flex-col items-center justify-between" >
  <Image source={require('../assets/icons/edit_icon.png')} />
  <Text className="text-lg" style={styles.font} > هل تود تعديل غرضك؟ </Text>

  <View className="flex flex-row justify-center items-center mt-8" >
  <TouchableOpacity   className="rounded-lg mx-4" style={[ styles.activeBtnText ]} onPress={() => handleEdit() }   >
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
  <TouchableOpacity onPress={() => handleDeleteRecord() } className="rounded-lg mx-4" style={[ styles.activeBtnText ]}    >
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
      

  )
}

const styles = StyleSheet.create({ 

  container: {
    backgroundColor: COLORS.White,
    minHeight: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
    paddingBottom: 30,
    
  },
  topAreaHeadins: {
    backgroundColor: COLORS.Blue,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.font_bold,
    fontWeight: 'bold',
    lineHeight: 60,
    
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
  exploreButtonText:{
    fontFamily: FONTFAMILY.font_bold,
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.Blue,
    textAlign: 'center',
  },
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    color: COLORS.Blue,

  },
  font: {
    fontFamily: FONTFAMILY.font_regular
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
  orderInfoBooking: {
    flex: 0.6,
    alignItems: 'flex-start'
  },
  orderActionsBooking: {
    flex: 0.4
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



} );

export default MyOrdersScreen