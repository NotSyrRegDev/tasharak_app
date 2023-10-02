import React, { useState , useContext , useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import { AdminContext } from '../../../context/AdminContext';
import { getDoc , doc , db   } from '../../../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const EditExperience = ({navigation , route}) => {
  

  const mapRef = useRef();
  const [dataObject , setDataObject] = useState(null);
  const [isLoading , setIsLoading] = useState();
  const [productName , setProductName] = useState('');
  const [productDesc , setProductDesc] = useState('');
  const [eventDate , setEventDate] = useState(new Date());
  const [eventDuration , setEventDuration] = useState('');
  const [eventLocationStatus , setEventLocationStatus] = useState('online');
  const [eventLocation , setEventLocation] = useState('');
  const [eventPrice , setEventPrice] = useState(0);
  const [eventCapacity , setEventCapacity] = useState(0);
  const [eventDateNew , setEventDateNew] = useState(new Date());
  
  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "experiences", route.params.eventId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataObject(docSnap.data())
          setProductName(docSnap.data().exp_name);
          setProductDesc(docSnap.data().exp_desc);
          setEventDate(docSnap.data().exp_date);
          setEventDuration(docSnap.data().exp_duration);
          const newDate = new Date(docSnap.data().exp_date.seconds * 1000) ;
          setEventDateNew(newDate);
          setEventLocationStatus(docSnap.data().exp_location_status);
          setEventLocation(docSnap.data().exp_location);
          setObjectLocation(docSnap.data().exp_location);
          setDraggableMarkerCoord(docSnap.data().exp_location);
          setEventPrice(docSnap.data().exp_price);
          setEventCapacity(docSnap.data().exp_capacity);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);

  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 0.0922,
    longitude: 46.68725,
    longitudeDelta: 0.0421,
  });

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setEventDate(currentDate);
  };


  const { editExpereinceMain , error  , success , setError   , convertTimeToDateString} = useContext(AdminContext);



  const handleEditActor = () => {
    setIsLoading(true);
    editExpereinceMain( productName , productDesc ,  eventDateNew , eventLocation , eventPrice , eventCapacity  ,   route.params.editId , ( ) => {
      navigation.navigate('AdminTabs')
      setIsLoading(false);
    } );

  }

  if (
    dataObject == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.loadingContainer} className="flex items-center justify-center h-full mt-10" >
          <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar  />


      { /* INPUTS DASHBOARD */  }
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex flex-col items-end mt-16" >

      {error && (
          <View className=" p-4 text-sm text-black rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4 text-sm text-black rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}
    
    <View>

    <View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" >
     اسم التجربة <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={styles.inputStyle}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="title"
  placeholder="اكتب لنا اسم التجربة"
      value={productName}
      onChangeText={(text) => setProductName(text) }
  />
  </View>

<View className="mb-8">

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" >
     وصف التجربة <Text className="text-red-500 text-base" > * </Text>  
    </Text>
  <TextInput
  style={[styles.inputStyle , styles.inputAreaStyle]}
  className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
  id="descrition"
  multiline={true}
  numberOfLines={8}
  placeholder="عرفنا أكثر على التجربة الي بتضيفها"
  autoCapitalize="none"
  value={productDesc}
  onChangeText={(text) => setProductDesc(text) }
  />
  </View>

  <View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" >
 مدة التجربة بالساعات <Text className="text-red-500 text-base" > * </Text>  
</Text>

<TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
   id="ticketSeat"
   value={eventDuration}
   keyboardType="numeric"
   onChangeText={(text) => setEventDuration(text)}
 />

   
    </View>

    <View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" >
   السعر لكل حجز <Text className="text-red-500 text-base" > * </Text>  
</Text>

 
<TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
   id="ticketSeat"
   value={eventPrice}
   keyboardType="numeric"
   onChangeText={(text) => setEventPrice(text)}
 />


    </View>

    <View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" >
      عدد مقاعد التجربة <Text className="text-red-500 text-base" > * </Text>  
    </Text>
      <TextInput
            style={styles.inputStyle}
            className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
        id="ticketSeat"
        value={eventCapacity}
        keyboardType="numeric"
        onChangeText={(text) => setEventCapacity(text)}
      />

    </View>

    <View className="mb-8">
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" >
        تاريخ التجربة <Text className="text-red-500 text-base" > * </Text>  
        </Text>

        <View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="eventDate"
   editable={false}
   value={convertTimeToDateString(eventDate)}
 
 />
</View>

<View className="mt-2 " style={styles.datePickerButton} >
   <DateTimePicker
        className=""
          mode="date"
          value={eventDateNew}
          display="default"
          onChange={handleDateChange}
        />
   </View>


   </View>

   {eventLocationStatus == 'online' && ( 
          <View>
          <View className="mb-8">

      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" >
          رابط الحضور <Text className="text-red-500 text-base" > * </Text>  
        </Text>
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="title"
      placeholder="ضع رابط لحضور التجربة"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text) }
      />
  </View>

          </View>
        )}

        {eventLocationStatus == 'presence' && (
          <View  >

      <View className="mt-1 text-sm rounded-lg bg-green-50 text-right  flex items-start py-2 px-2" >
      <Text className="text-base text-center " style={styles.font} >  فضلا قم بتحديد وسحب العلامة الخضراء على الخريطة لتوضيح مكان التجربة  </Text>
        </View>
      
      <View style={{ flex: 1 }}  className="h-96" >
      <MapView
      className="realtive"
      provider={PROVIDER_GOOGLE}
      ref={mapRef} 
      style={styles.map}
      initialRegion={{
        latitude: objectLocation.latitude,
      longitude: objectLocation.longitude,
      latitudeDelta: 0.01, 
       longitudeDelta: 0.01, 
      }}
      >
      <Marker
      draggable
      pinColor="#22BC9F"
      coordinate={draggableMarkerCoord}
      onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
      tooltip={true}
      >
      <Callout>
        <Text style={styles.font}>هذه المكان الذي سيظهر للمستخدمين</Text>
      </Callout>
      </Marker>


      </MapView>

      </View>
      </View>
        )}

    </View>


    {isLoading ? (
    
    <View className="mb-5 mt-5" >
    <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
      </View>
    ) : (
      <TouchableOpacity
        className="text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleEditActor() }>
          <Text style={styles.buttonText}> تعديل التجربة </Text>
        </TouchableOpacity>
    )}


      

</View>
      </KeyboardAvoidingView>
   

      { /* END INPUTS DASHBOARD */  }
     
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.White,
    paddingHorizontal: 20,
  },
  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },

  starIcon: {
    color: COLORS.DarkRed,
  },
  icon_logo: {
    width: 150,
    height: 50,
  },
  button: {
    marginTop: 55,
    marginBottom: 20,
    backgroundColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_4,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
    textAlign: 'right'

  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: 120, 
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  uploadButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
});

export default EditExperience;
