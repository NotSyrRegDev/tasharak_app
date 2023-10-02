import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity , Image , ActivityIndicator} from 'react-native'
import React , {useContext , useState , useEffect , useRef } from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';
import TopStepNavigation from '../components/TopStepNavigation';
import Feather from '@expo/vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TopOrderStatusStep from '../components/TopOrderStatusStep';
import { Ionicons } from '@expo/vector-icons';
import { getDoc , doc , db   } from '../../firebase';


const BookingDetailScreen = ({ navigation  , route }) => {

  const scrollViewRef = useRef();

  const [loading , setLoading] = useState(false)
  const { isLoading , error , setError   } = useContext(AppContext);

  const [orderId , setOrderId] = useState('');
  const [orderDate , setOrderDate] = useState('');
  const [orderLocation , setOrderLocation] = useState('');
  const [orderSellerName , setOrderSellerName] = useState('');
  const [orderSellerEmail , setOrderSellerEmail] = useState('');
  const [orderSellerId , setOrderSellerId] = useState(null);
  const [productName , setProductName] = useState('');
  const [productImage , setProductImage] = useState('');
  const [productCategory , setProductCateogry] = useState('');
  const [ orderStartDate , setOrderStartDate ] = useState('');
  const [ orderEndDate , setOrderEndDate ] = useState('');
  const [ orderTotalDays , setOrderTotalDays ] = useState('');
  const [ orderCount , setOrderCount ] = useState('');
  const [ orderDelivery , setOrderDelivery ] = useState('');
  const [orderStatus , setOrderStatus] = useState('');
  const [orderTime , setOrderTime] = useState('');
  const [orderPaymentMethod , setOrderPaymentMethod] = useState('');
  const [orderInsurancePrice , setOrderInsurancePrice] = useState('');
  const [dailyPrice , setDailyPrice] = useState('');

  function convertDateToArabic(dateObject) {
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
  
    const date = new Date(dateObject.seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const arabicMonth = months[monthIndex];
    const arabicDay = date.getDate().toString();
  
    return `${arabicDay} ${arabicMonth} ${year}`;
  }

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setLoading(true);
      const docRef = doc(db, "bookings", route.params.orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrderId(route.params.orderId);
        setOrderDate(docSnap.data().booking.booking_date);
        setOrderLocation({
          city: docSnap.data().booking.booking_location_city,
          districty: docSnap.data().booking.booking_location_distrcty,
          street: docSnap.data().booking.booking_location_street,
        });
        setOrderSellerId(docSnap.data().booking.seller_id);
        setProductName(docSnap.data().booking.product_name);
        setProductImage(docSnap.data().booking.product_image);
        setProductCateogry(docSnap.data().booking.product_category);
        setOrderStartDate(docSnap.data().booking.booking_start_date);
        setOrderEndDate(docSnap.data().booking.booking_end_date);
        setOrderTotalDays(docSnap.data().booking.booking_total_days);
        setOrderCount(docSnap.data().booking.booking_total_days);
        setOrderDelivery(docSnap.data().booking.product_delivery);
        setOrderStatus(docSnap.data().booking.booking_order_status);
        setOrderTime(docSnap.data().booking.booking_time);
        setOrderPaymentMethod(docSnap.data().booking.booking_payment_way);
        setOrderInsurancePrice(docSnap.data().booking.insurancePrice);
        setDailyPrice(docSnap.data().booking.dayPrice);
  
        setLoading(false);
      }
    };
    getInfoFromFireStore();
  }, []);


  return (
   
      
    <ScrollView
    style={{ flex: 1 }}
ref={scrollViewRef}
contentContainerStyle={{ flexGrow: 1 }} 
  >

      {isLoading && (
       <LoadingContainer />
      )}

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-16 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >

      {loading ? (
        <View className="mt-8 mb-8">
      <ActivityIndicator animating={true} color={'#007FB7'} />
    </View>
      ) : (
        <View className="mt-12" >
        
        {error && (
        <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </>
      )}

  

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <Feather name="info" size={22} color="#22BC9F" />
  <Text style={styles.font} className="text-lg text-left " >   تفاصيل الطلب  </Text>
  </View>
  
<View className="flex  items-center justify-between flex-row mt-8" >

<View>
<Text style={styles.font} className="text-sm text-left " >  رقم الطلب  </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {orderId} </Text>

</View>

<View>
<Text style={styles.font} className="text-sm text-left " >  تم الطلب في   </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {convertDateToArabic(orderDate)} </Text>

</View>

 
</View>
</View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <Octicons name="location" size={26} color={COLORS.Green} />
  <Text style={styles.font} className="text-lg text-left " >    عنوان الشحن  </Text>
  </View>
  
<View className="flex  items-start  mt-8" >

<View>
<Text style={styles.font} className="text-sm text-left " > {orderLocation?.districty} , {orderLocation?.street} </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   المملكة العربية السعودية ,{orderLocation?.city} </Text>

</View>
 
</View>
</View>

<View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

<View className="flex flex-row items-center mt-2" >
<MaterialCommunityIcons name="star-four-points-outline" size={22} color={COLORS.Green}   />
<Text style={styles.font} className="text-lg text-left " >   تواريخ الاستئجار   </Text>
</View>

<View className="flex  items-center justify-between flex-row mt-8" >

<View>
<Text style={styles.font} className="text-sm text-left " >  من   </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {convertDateToArabic(orderStartDate)} </Text>

</View>

<View>
<Text style={styles.font} className="text-sm text-left " >  الى     </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {convertDateToArabic(orderEndDate)}  </Text>

</View>


</View>

<View className="flex  items-center justify-between flex-row mt-8" >

<View>
<Text style={styles.font} className="text-sm text-left " >  عدد الايام الاجمالي   </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {orderTotalDays} أيام </Text>

</View>

{/* <View>
<Text style={styles.font} className="text-sm text-left " >   عدد الايام المتبقي      </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   10 أيام</Text>

</View> */}


</View>

</View>

<View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

<View className="flex flex-row items-center mt-2" >
<Feather name="user" size={22} color="#22BC9F" />
<Text style={styles.font} className="text-lg text-left " >   تفاصيل المأجر  </Text>
</View>

<View className="flex  items-center justify-between flex-row mt-8" >

<View>
<Text style={styles.font} className="text-sm text-left " >   الاسم  </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >  {orderSellerName} </Text>

</View>

<View>
<Text style={styles.font} className="text-sm text-left " >  الايميل  </Text>
<Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {orderSellerEmail}  </Text>

</View>


</View>
</View>


<View  className="bg-gray-100 shadow-lg flex flex-row items-center justify-between mt-5" style={styles.orderSummaryDiv} >

<View style={styles.orderInfo} >
  <Text style={styles.font} className="text-base text-left w-52" > {productName}   </Text>

  <View style={styles.productCateogry} className="rounded-full  px-3 py-1 mt-4" >
  <Text style={styles.font} className="text-xs  text-white" > {productCategory} </Text>
  </View>

</View>
<View style={styles.orderActions} className >
  <Image className="h-32 w-full rounded-lg"  source={{ uri: productImage }} />

  </View>

</View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <MaterialIcons name="delivery-dining" size={22} color={COLORS.Green}   />
  <Text style={styles.font} className="text-lg text-left " >   التوصيل عبر  </Text>
  </View>

  <View className="flex  items-start" >

  <View className="mt-5 flex flex-row items-center" >

<Image source={require('../assets/icons/box_icon.png')} style={styles.iconinc} />
 <Text className="text-base font-bold text-right mx-1" style={[styles.font ]} > {orderDelivery == 'tasharak' ? "التوصيل عبر تشارك" : 'التوصيل عن طريق البائع' } </Text>


</View>

  </View>
  </View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <Ionicons name="time-outline" size={22} color={COLORS.Green}   />
  <Text style={styles.font} className="text-lg text-left " >    أوقات التوصيل المتوقعة  </Text>
  </View>

  <Text className="text-base font-bold text-left mx-1 mt-4" style={[styles.font ]} > {orderTime} </Text>
  
  </View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <MaterialCommunityIcons name="border-none-variant" size={22} color={COLORS.Green}   />
  <Text style={styles.font} className="text-lg text-left " >     حالة الطلب  </Text>
  </View>

  <View className="flex  items-start  mt-8" >

 <View className="w-full" >
 <TopOrderStatusStep percentage={orderStatus.percentage} step={orderStatus.stepDone} totalStep={4} headline={orderStatus.statusHeadine} />
 </View>

  </View>
  </View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <MaterialIcons name="payment" size={22} color={COLORS.Green}   />
  <Text style={styles.font} className="text-lg text-left " >    طريقة الدفع   </Text>
  </View>

  <View className="flex  items-start  mt-3" >

  <View>
  <Text style={styles.font} className="text-base text-left " >   {orderPaymentMethod == 'on-delivery' ? 'عند الاستلام' : '' } </Text>
  </View>

  </View>
  </View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

  <View className="flex flex-row items-center mt-2" >
  <MaterialCommunityIcons name="border-none" size={22} color={COLORS.Green}   />
  <Text style={styles.font} className="text-lg text-left " >    ملخص الطلبية  </Text>
  </View>
  <View className="flex flex-row items-center justify-between mt-5" >

<View>
<Text style={styles.font} className="text-base text-left " >   المجموع الفرعي   </Text>
<Text style={styles.font} className="text-base text-left mt-3 " >    رسوم التوصيل   </Text>
<Text style={styles.font} className="text-base text-left mt-3 " >   مبلغ التأمين   </Text>
<Text style={styles.font} className="text-xs text-left mt-3 text-red-500" >   سيتم خصمه في حال ارجاع الغرض تالف      </Text>

</View>

<View className="flex flex-col items-center justify-center" >

<Text style={styles.font} className="text-lg text-left " > 
{parseInt(dailyPrice) * parseInt(orderCount)  } ر.س  
 </Text>

<Text style={styles.font} className="text-lg text-left " >  +  </Text>
<Text style={styles.font} className="text-lg text-left " >   25 ر.س   </Text>

<Text style={styles.font} className="text-lg text-left " >  +  </Text>


<Text style={styles.font} className="text-lg text-left " >   {orderInsurancePrice} ر.س   </Text> 

</View>

</View>

<View className="flex flex-row items-center justify-between mt-5" >

<View>
<Text style={styles.font} className="text-lg text-left " >   المجموع   </Text>


</View>
<Text style={styles.font} className="text-lg text-left " >   {parseInt(dailyPrice) * parseInt(orderCount)  } ر.س   </Text>
</View>

  </View>

  <View  className="bg-gray-100 shadow-lg px-2 py-4 mt-5" style={styles.orderSummaryDiv} >

<View className="flex flex-row items-center mt-2" >
<MaterialCommunityIcons name="pen" size={22} color={COLORS.Green}   />
<Text style={styles.font} className="text-lg text-left " >    أكتب تقييما    </Text>
</View>

<View className="flex  items-start  mt-3" >

  <View className="w-full" >
  <TouchableOpacity onPress={() => navigation.navigate('AddProductRating' , {
    product_id: orderId, 
    product_name : productName,
    product_image : productImage,
    product_category : productCategory,
  }) }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2 px-2"  >
  <Feather name="box" size={20} color="#22BC9F" />
 <Text className="text-sm font-bold text-right mx-1" style={[styles.font ]} > تقييم المنتج  </Text>

</TouchableOpacity>
  </View>

  <View className="w-full" >
  <TouchableOpacity onPress={() => navigation.navigate('AddSellerRating' , {
    seller_id: orderSellerId,
    seller_name: '',
    seller_email: '',
  }) }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2 px-2"  >
  <Feather name="user" size={20} color="#22BC9F" />
 <Text className="text-sm font-bold text-right mx-1" style={[styles.font ]} > تقييم المأجر  </Text>

</TouchableOpacity>
  </View>

  <View className="w-full" >
  <TouchableOpacity onPress={() => navigation.navigate('AddDeliveryRating' , {
    product_id: orderId, 
    product_name : productName,
    product_image : productImage,
    product_category : productCategory,
  } ) }  style={styles.borderButton} className="mt-5 flex flex-row items-center justify-center py-2 px-2"  >
  <MaterialIcons name="delivery-dining" size={22} color={COLORS.Green}   />
 <Text className="text-sm font-bold text-right mx-1" style={[styles.font ]} > تقييم التوصيل  </Text>

</TouchableOpacity>
  </View>



</View>
</View>


  </View>
      )}


      </View>
    { /* END BODY HERE */}

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
  font: {
    fontFamily: FONTFAMILY.font_regular
  },
  button: {
    borderColor: 'none',
    backgroundColor:COLORS.LightBLue,
    opacity: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    
  },
  buttonText: {
    fontFamily: FONTFAMILY.font_medium,
    color: 'white',
    textAlign: 'center',
  },
  containerMargin: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerButton: {
    marginBottom: 20,
    fontFamily: FONTFAMILY.font_regular,
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONTFAMILY.font_regular,
    lineHeight: 24,
      textAlign: 'left'
  },
  orderSummaryDiv: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  orderInfo: {
    flex: 0.6,
    alignItems: 'flex-start'
  },
  orderActions: {
    flex: 0.4
  },
  productCateogry: {
    backgroundColor:COLORS.LightBLue,
    opacity: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    
  },
  borderButton: {
    borderWidth: 1,
    borderRadius: 400,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
    
  },
  iconinc: {
    width: 70,
    height: 70,
  },

} );

export default BookingDetailScreen