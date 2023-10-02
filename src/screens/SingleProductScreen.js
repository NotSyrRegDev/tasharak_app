import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView  , Image , Text , TouchableOpacity , ActivityIndicator } from 'react-native'
import React , {useState , useEffect , useRef , useContext} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import {  getDoc , db ,  doc   } from "../../firebase";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductSlider from '../components/ProductSlider';
import { AppContext } from '../context/AppContext';
import { AuthenticationContext } from '../context/AuthContext';




const SingleProductScreen = ({ navigation , route }) => {

  const { isAuthenticated } = useContext(AuthenticationContext);

  const { setBookingProduct } = useContext(AppContext);

  const [loading , setLoading] = useState(true);
  const [productData , setProductData] = useState(null);
  function generateRandomValue() {
    const minValue = 2.9;
    const maxValue = 4.9;
  
    const randomValue = Math.random() * (maxValue - minValue) + minValue;
    return randomValue.toFixed(1);
  }

  
  const randomValue = generateRandomValue();
  const mapRef = useRef();

  useEffect(() => {

    const findTheProduct =  async () => {
        setLoading(true);
        const docRef = doc(db, "products", route.params.productId );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productDataWithId = { id: docSnap.id, ...docSnap.data() };
       
          setProductData(productDataWithId);
          setLoading(false);
        } else {
          setProductData(null)
          setLoading(false);
        }
     }

     findTheProduct();

  } , [])

const [fullScreen , setFullScreen] = useState(false);

const handleFullScreenMap = () => {

  setFullScreen(!fullScreen);
}

const handleBookingProduct = () => {

  setBookingProduct({ 
    product_id: productData.id ,
    product_image: productData.product_images[0],
    product_name: productData.product_name ,
    product_category: productData.product_category ,
    product_delivery: productData.productAdditional[0].deliveryWay,
    dayPrice: productData.productAdditional[0].dailyRentPrice,
    insurancePrice: productData.productAdditional[0].insurancePrice,
    productCount: productData.productAdditional[0].productCount,
    minDay: productData.productAdditional[0].minRentalPrice,
    maxDay: productData.productAdditional[0].maxRentalPrice,
    seller_id: productData.user_id,
    booking_location_city: productData?.location_details.cityLocation ,
    booking_location_distrcty:  productData?.location_details.districyLocation,
    booking_location_street:  productData?.location_details.streetLocation,

   });
   
    navigation.navigate('BookingDateScreen' );
}


  return (

    <View style={{flex: 1}} >

        <ScrollView>

        <View  style={[styles.container , { paddingBottom: 20 }]}  >

        <StatusBar translucent backgroundColor="black" />

        {loading ? (
        <View className="flex items-center mt-8 mb-8 " >
          <ActivityIndicator animating={true} color={'#007FB7'} />
          </View>
        ) : (
        <View>
        { !fullScreen  ? (
          <View>
        { /* PRODUCT SLIDER */  }
        <View style={styles.marginHor} className="rounded-xl" >

        <ProductSlider productImages={productData.product_images} />
        </View>
        { /* End PRODUCT SLIDER */  }

        {  /* PRODUCT DETIALS */ }
        <View style={styles.marginHor}  >

        <View className="flex flex-row justify-between items-center" >

        <View className="flex items-start" >
        <Text className="text-xl text-black text-right" style={styles.font} > {productData.product_name} </Text>

        <Text className="text-base font-bold text-right mt-2" style={[styles.font , styles.ratingTitle]} > التقييمات : {randomValue}   <FontAwesome name="star" size={18} color="#FFD700" /> </Text>


        </View>

        <View className="flex-row items-center" >
          <Feather name="info" size={22} color="#22BC9F" />
          <Text className="text-base font-bold text-right" style={[styles.font ]} > {productData.productAdditional[0].productCase}    </Text>

        </View>

        </View>

        {  /* PRODUCT PRICE */ }

        <View className="mt-10" >

        <Text className="text-2xl text-black text-left" style={styles.font} > السعر </Text>

        <View className="flex flex-row justify-around  mt-5" >

          <View className="text-center" >
            <Text className="text-lg text-black text-left" style={styles.font} > يومي </Text>
            <Text className="text-sm mt-2 text-left" style={[styles.font , styles.price]} > {productData.productAdditional[0].dailyRentPrice} <Text style={styles.currency} > ر.س </Text> </Text>
          </View>

          <View className="text-center" >
            <Text className="text-lg text-black text-left" style={styles.font} > أسبوعي </Text>
              <Text className="text-sm mt-2 text-left" style={[styles.font , styles.price]} > {productData.productAdditional[0].weekRentPrice} <Text style={styles.currency} > ر.س </Text> </Text>
          </View>

          <View className="text-center" >
            <Text className="text-lg text-black text-left" style={styles.font} > شهري </Text>
              <Text className="text-sm mt-2 text-left" style={[styles.font , styles.price]} > {productData.productAdditional[0].monthlyRentPrice} <Text style={styles.currency} > ر.س </Text> </Text>
          </View>

        </View>

        </View>

        {  /* PRODUCT DEscribiton */ }

        <View className="mt-12" >

        <View className="flex flex-row justify-between items-center" >

        <Text className="text-2xl text-black text-left" style={styles.font} > الوصف </Text>

        {/* <View className="flex-row" >
          <MaterialIcons name="date-range" size={20} color="#DADADA" />
          <Text className="text-base text-right mx-1/2" style={[styles.font , styles.paraStyle ]} > 30/ 7/2023    </Text>

        </View> */}


        </View>
        <Text style={styles.paraStyle}  className="text-left mt-4" > 
        {productData.product_desc}
        </Text>



        </View>
        {  /* PRODUCT DEscribiton */ }

        <View className="mt-12" >

        <Text className="text-2xl text-black text-left" style={styles.font} > التوافر </Text>


        <View className="flex flex-row justify-around flex-wrap items-start mt-5" >

          <View className="text-center w-1/2 flex-row items-center" > 

          <Image source={require('../assets/icons/shop_icon.png')} style={styles.iconinc} />

          <View>
          <Text className="text-base text-black text-left" style={styles.font} > {productData.productAdditional[0].productCount}  غرض </Text>
            <Text className="text-sm mt-1 text-left " style={[styles.font , styles.price]} > متوفر  </Text>
          </View>
          
          </View>

          <View className="text-center w-1/2 flex-row items-center" > 

        <Image source={require('../assets/icons/date_icon.png')} style={styles.iconinc} />

        <View>
        <Text className="text-base text-black text-left" style={styles.font} > {productData.productAdditional[0].minRentalPrice} يوم </Text>
        <Text className="text-sm mt-1 text-left w-36" style={[styles.font , styles.price]} > الحد الادنى لمدة الايجار  </Text>
        </View>

        </View>

        <View className="text-center w-1/2 flex-row items-center mt-3" > 

        <Image source={require('../assets/icons/date_icon.png')} style={styles.iconinc} />

        <View>
        <Text className="text-base text-black text-left" style={styles.font} > {productData.productAdditional[0].maxRentalPrice} أيام </Text>
        <Text className="text-sm mt-1 text-left " style={[styles.font , styles.price]} > الحد الأعلى لمدة الإيجار  </Text>
        </View>

        </View>
          


        </View>



        </View>



        <View className="mt-12" >

        <Text className="text-2xl text-black text-left" style={styles.font} > الفئة  </Text>

        <View className="mt-5" >
        <TouchableOpacity className="rounded-full w-1/2" style={styles.button} >
        <Text className="text-xs text-white text-center" style={styles.buttonText} >  {productData.product_category}  </Text>
        </TouchableOpacity>

        </View>

        </View>

        <View className="mt-12" >

        <Text className="text-2xl text-black text-left" style={styles.font} > دلالات  </Text>

        <View className="mt-5 flex flex-row items-center flex-wrap" >
        {productData.product_tags !== 0 && productData.product_tags.map((item , index) => (
          <TouchableOpacity key={item} className="rounded-full mx-1 w-24 text-center mt-2" style={styles.button} >
        <Text className="text-xs text-white " style={styles.buttonText} >  {item}  </Text>
        </TouchableOpacity>
        )) }

        </View>

        </View>

        <View className="mt-12" >

        <Text className="text-2xl text-black text-left" style={styles.font} > طريقة التوصيل  </Text>

        <View className="mt-5 flex flex-row items-center" >

        <Image source={require('../assets/icons/box_icon.png')} style={styles.iconinc} />
          <Text className="text-base font-bold text-right mx-1" style={[styles.font ]} > {productData.productAdditional[0].deliveryWay == 'tasharak' ? 'التوصيل عبر تشارك' : 'التوصيل عن طريق البائع' }   </Text>


        </View>

        </View>

        <View className="mt-8 mb-8" >

        <Text className="text-2xl text-black text-left" style={styles.font} > الموقع </Text>

        <View className="mt-8 flex flex-row items-center" >

        <Image source={require('../assets/icons/Location.png')} style={styles.location_icon} />
          <Text className="text-sm font-bold text-right  mx-1" style={[styles.font ]} >  {productData?.location_details.cityLocation} , {productData?.location_details.districyLocation} , {productData?.location_details.streetLocation} </Text>


        </View>

        </View>

          <View className="mb-8">

          <Text className="text-2xl text-black text-left" style={styles.font} > الخريطة </Text>

          <View style={{ flex: 1 }}  >

        <MapView
        className="realtive"
        onPress={handleFullScreenMap}
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={styles.map}
        initialRegion={
          {
            latitude: productData.product_location.latitude,
            latitudeDelta: 0.0922,
        longitude: productData.product_location.longitude,
        longitudeDelta: 0.0421,
          }
        }
        >
        <Marker
        draggable
        pinColor="#22BC9F"
        coordinate={productData?.product_location}

        >
        <Callout>
          <Text style={styles.font}>مكان توافر الغرض     </Text>
        </Callout>
        </Marker>


        </MapView>
        </View>

        </View>

        </View>
        </View>

        ) : (
          <View style={styles.container} >
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef} 
          style={styles.fullMap}
          initialRegion={
          {
            latitude: productData.product_location.latitude,
            latitudeDelta: 0.0922,
        longitude: productData.product_location.longitude,
        longitudeDelta: 0.0421,
          }
        }
        >

        <Marker
        draggable
        pinColor="#22BC9F"
        coordinate={productData?.product_location}

        >
        <Callout>
          <Text style={styles.font}>مكان توافر الغرض     </Text>
        </Callout>
        </Marker>

        <TouchableOpacity onPress={() => handleFullScreenMap() } className="absolute top-2 right-2 w-12 h-12 rounded-lg  bg-white flex items-center justify-center shadow-lg" >

        <Octicons name="screen-full" size={26} color="#007FB7" />

        </TouchableOpacity>
        
        </MapView>
        </View>
        )}
        </View>
        )}





        </View>



        </ScrollView>




    <View className="mt-2 mb-8"  style={styles.marginHor}  >

    {productData?.is_available ? (

      isAuthenticated ? (
        <TouchableOpacity
    className=" text-center rounded-full p-3"
    style={styles.button}
    onPress={() => handleBookingProduct() }
    >

    <Text style={styles.buttonText}> حجز الغرض  </Text>
    </TouchableOpacity>
      ) : (
        <TouchableOpacity
    className=" text-center rounded-full p-3"
    style={styles.button}
    onPress={() => navigation.navigate('NeedLoginScreen') }
    >

    <Text style={styles.buttonText}> حجز الغرض  </Text>
    </TouchableOpacity>
      )

    ) : (
    <View
    className=" text-center rounded-full p-3"
    style={styles.borderButton}

    >

    <Text style={styles.font} className="text-black text-center" > عفوا الغرض غير متاح للايجار حاليا   </Text>
    </View>

    )}
        </View>


    </View>
  
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
  font: {
    fontFamily: FONTFAMILY.font_medium
  },
  ratingTitle: {
    color: COLORS.Gray,
    fontFamily: FONTFAMILY.font_bold,
    
  },
  paraStyle: {
    color: COLORS.Gray,
    fontFamily: FONTFAMILY.font_regular,
    
  },
  marginHor: {
    paddingHorizontal: 25,
  },
  price: {
    color: COLORS.Blue,
  },
  currency: { 
    color: COLORS.Gray
  },
  iconinc: {
    width: 70,
    height: 70,
  },
  location_icon: {
    width: 30,
    height: 30,
  },
  productCateogry: {
    backgroundColor:COLORS.LightBLue,
    opacity: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    
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
  banner: {
    resizeMode: 'contain',
    marginTop: -20,
    maxWidth: '100%',
  },
  map: {
    marginTop: 30,
    width:'100%',
    height: '45%',
    paddingBottom: 140
  },
  fullMap: {
    width:'100%',
    height: '140%'
  },
  borderButton: {
    borderWidth: 1,
    borderRadius: 400,
    borderColor: COLORS.LightBLue,
    backgroundColor: 'transparent',
    
  },

} );

export default SingleProductScreen