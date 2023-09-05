import { View, Text  , StyleSheet , StatusBar  , ScrollView , TouchableOpacity , Image } from 'react-native'
import React , {useContext , useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import { AppContext } from '../context/AppContext';
import LoadingContainer from '../components/LoadingContainer';
import TopStepNavigation from '../components/TopStepNavigation';
import TopStepCounter from '../components/TopStepCounter';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const BookingOrderSummaryScreen = ({ navigation }) => {

  const { isLoading , bookingProduct } = useContext(AppContext);
  const [ productCount , setProductCount ] = useState(bookingProduct?.productCount);

  const handleNextStep = () => {
    navigation.navigate('BookingPaymentScreen');
  }

  const handleAddCountProduct = () => {

    if (bookingProduct?.productCount < productCount) {
      setProductCount(productCount + 1);
    }
  }
  const handleMinusCountProduct = () => {

    if (productCount > 1) { // Check if productCount is greater than 1 before decrementing
      setProductCount(productCount - 1);
    }
  }

  return (
   
      
      <ScrollView>

      {isLoading && (
       <LoadingContainer />
      )}

      <View style={styles.container}  >

      <StatusBar translucent backgroundColor="black" />
      { /* TOP HEADER TEXT */ }
      <View className="pt-20 pb-5" style={styles.topAreaHeadins}  >

        <TopStepNavigation navigation={navigation} />

        <View className="mt-12" >
        <TopStepCounter percentage={80} step={4} totalStep={5} headline="ملخص الطلب" />
      </View>
   
      </View>

      { /* END TOP HEADER TEXT */ }

      { /* BODY HERE */}

      <View style={styles.containerMargin} >
      <View className="mt-12" >

      <View  className="bg-gray-100 shadow-lg flex flex-row items-center justify-between " style={styles.orderSummaryDiv} >

    <View style={styles.orderInfo} >
      <Text style={styles.font} className="text-base text-left w-52" > {bookingProduct?.product_name}   </Text>

      <View style={styles.productCateogry} className="rounded-full  px-3 py-1 mt-4" >
      <Text style={styles.font} className="text-xs  text-white" > {bookingProduct?.product_category} </Text>
      </View>

      <View className="flex flex-row items-center mt-8" >

      <SimpleLineIcons name="location-pin" size={22} color={COLORS.Blue} />
      <Text style={styles.font} className="text-xs w-2/3 text-left mx-1" > {bookingProduct?.booking_location_city} , {bookingProduct?.booking_location_distrcty} , {bookingProduct?.booking_location_street}  </Text>
      </View>
    </View>
    <View style={styles.orderActions} className >
      <Image className="h-32 w-full rounded-lg"  source={{ uri: bookingProduct?.product_image }} />

      </View>

    </View>

      <View  className="bg-gray-100 shadow-lg" style={styles.orderSummaryDiv} >

    <View className="flex flex-row items-center justify-between" >
      <Text style={styles.font} className="text-lg text-left " >  ايام الايجار  </Text>
      <TouchableOpacity onPress={() => navigation.navigate('BookingDateScreen') } >
      <AntDesignIcons name="edit" size={25} color="#007FB7" />
      </TouchableOpacity>
     

    </View>

    <View className="flex flex-row items-center justify-between mt-12" >

    <View>
    <Text style={styles.font} className="text-xs text-left " >  من </Text>
    <Text style={[styles.font , styles.fontBlue]} className="text-xs text-left mt-2" >  {bookingProduct?.booking_start_date.toDateString()} </Text>
    </View>
    
    <View>
    <Text style={styles.font} className="text-xs text-left " >  الى </Text>
    <Text style={[styles.font , styles.fontBlue]} className="text-xs text-left mt-2" > {bookingProduct?.booking_end_date.toDateString()} </Text>
    </View>

    
      <Text style={styles.font} className="text-base text-left " >  {bookingProduct?.booking_total_days} أيام </Text>
    

    </View>
    

    </View>

      <View  className="bg-gray-100 shadow-lg" style={styles.orderSummaryDiv} >

    <View className="flex flex-row items-center justify-between" >
      <Text style={styles.font} className="text-lg text-left " >  الكمية </Text>
      <View className="mt-8 flex flex-row justify-between">

    <View className="flex flex-row items-center " >

      { /*  INCREMENT */ }
      <TouchableOpacity onPress={() => handleAddCountProduct() } >
      <View style={[styles.circleButton , styles.incButton]} >
      <Ionicons name="add-sharp" size={18} color="#fff" clas style={{ fontWeight: 'bold'  }}  />
      </View>
      </TouchableOpacity>
      
    
      { /* THE VALUE */ }
      <Text style={styles.countTitle} className="text-xl" >  {productCount} </Text>

      { /*  DECREMENT */ }
      <TouchableOpacity onPress={() => handleMinusCountProduct() } >
      <View style={[styles.circleButton , styles.minusButton]} >
      <MaterialCommunityIcons name="minus" size={18} color="#fff" clas style={{ fontWeight: 'bold'  }}  />
      </View>
      </TouchableOpacity>
      

    </View>
</View>

    </View>

    </View>

      <View  className="bg-gray-100 shadow-lg" style={styles.orderSummaryDiv} >
    <View className="flex flex-row items-center justify-between" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >  طرق التوصيل </Text>
    <Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >   {bookingProduct?.product_delivery == 'tasharak' ? "التوصيل عبر تشارك" : "التوصيل" }  </Text>

    </View>
    <TouchableOpacity onPress={() => navigation.navigate('BookingDeliveryScreen') } >
       <AntDesignIcons name="edit" size={25} color="#007FB7" />
       </TouchableOpacity>
    </View>
    </View>
    

      <View  className="bg-gray-100 shadow-lg" style={styles.orderSummaryDiv} >
    <View className="flex flex-row items-center justify-between" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >  وقت الاستلام والارجاع  </Text>
    <Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >  {bookingProduct?.booking_time} </Text>

    </View>

    <TouchableOpacity onPress={() => navigation.navigate('BookingTimeScreen') } >
       <AntDesignIcons name="edit" size={25} color="#007FB7" />
       </TouchableOpacity>

    </View>
    </View>

      <View  className="bg-gray-100 shadow-lg" style={styles.orderSummaryDiv} >
    <View className="flex flex-row items-center justify-between" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >   ملخص الرسوم  </Text>
    <Text style={styles.font} className="text-gray-500 mt-3 text-sm text-left " >  رسوم الايجار اليومي   </Text>

    </View>
    <Text style={styles.font} className="text-lg text-left " >    {bookingProduct?.dayPrice} ر.س   </Text>
    </View>
    </View>

     
    <View className="flex flex-row items-center justify-between mt-8" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >   المجموع   </Text>
  

    </View>
    <Text style={styles.font} className="text-lg text-left " >   {bookingProduct?.dayPrice *  bookingProduct?.booking_total_days } ر.س   </Text>
    </View>

     
    <View className="flex flex-row items-center justify-between mt-8" >
    
    <View>
    <Text style={styles.font} className="text-lg text-left " >   مبلغ التأمين   </Text>
    <Text style={styles.font} className="text-xs text-left mt-3 text-red-500" >   سيتم خصمه في حال ارجاع الغرض تالف      </Text>

    </View>
    <Text style={styles.font} className="text-lg text-left " >   {bookingProduct?.insurancePrice} ر.س   </Text>
    </View>


        </View>

        <View className="mt-10 mb-8" >
          <TouchableOpacity
      className=" text-center rounded-full p-3"
      style={styles.button}
      onPress={() => handleNextStep() }
      >

      <Text style={styles.buttonText}>  اختر  طريقة الدفع  </Text>
      </TouchableOpacity>
          </View>


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
  },
  orderSummaryDiv: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginTop: 20,
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
  orderInfo: {
    flex: 0.6,
    alignItems: 'flex-start'
  },
  orderActions: {
    flex: 0.4
  },
  fontBlue: {
    color: COLORS.Blue
  },
  incButton: {
  
    backgroundColor: COLORS.Blue
  },
  minusButton: {
  
    backgroundColor: COLORS.Gray
  },
  circleButton: {
    width: 20,
    height: 20,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12
  },
  countTitle: {
    color: COLORS.LightBLue,
      fontFamily: FONTFAMILY.font_bold,
      fontWeight: 'bold',
  },

} );

export default BookingOrderSummaryScreen