import React, {useContext, useEffect, useState , useRef} from 'react';
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
  ActivityIndicator,
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  query , collection , getDocs , db , where } from "../../../../firebase";
import RNPickerSelect from 'react-native-picker-select';
import { AdminContext } from '../../../context/AdminContext';

const AddTicket = ({navigation , route}) => {

  const [isLoading , setIsLoading] = useState();
  const [ ticketCategory , setTicketCategory ] = useState('');
  const [ ticketSeat , setTicketSeat ] = useState('');
  const [ ticketPrice , setTicketPrice ] = useState('');
  const [ realtedOffer , setRelatedOffer ] = useState('');
  const [ showsArray , setShowsArray ] = useState([]);
  const [tikcetNumber , setTicketNumber] = useState(0);
  const { convertTimeToDateTimeString , addTicket , error ,  setError , success } = useContext(AdminContext);

  useEffect(() => {
    setIsLoading(true);
  
    const getTimesData = async () => {
      try {
        const q = query(collection(db, "shows"), where("rel_event_id", "==", route.params.eventId ) );
        const querySnapshot = await getDocs(q);
        const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setShowsArray(showsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTimesData();
  }, []);

  const handleAddTicket = () => {
    setIsLoading(true);
    addTicket(   tikcetNumber , ticketPrice , realtedOffer  , route.params.eventId , () => {
      navigation.navigate('AdminTabs');
      setIsLoading(false);
    } ); 
    

 
  }
  const scrollViewRef = useRef();

  return (
    <ScrollView 
    style={styles.container} bounces={false}
      ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
    >
      <StatusBar  />

      { /* INPUTS DASHBOARD */  }
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex flex-col items-end mt-16" >

      {error && (
        <>
       
        <View className=" p-4 text-sm text-black rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        </>
               
        )}
        {success && (
          <>
         
          <View className=" p-4 text-sm text-black rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
          </>
         
        )}
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      الفعالية <Text className="text-red-500 text-base" > * </Text>  
    </Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="actorName"
   value={route.params.eventName}
   editable={false}

 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }

{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
        عدد المقاعد في الفعالية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="ticketSeat"
   value={tikcetNumber}
   keyboardType="numeric"
   onChangeText={(text) => setTicketNumber(text)}
 />
</View>

</View>



{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   السعر لكل مقعد <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="ticketPrice"
   keyboardType="numeric"
   value={ticketPrice}
   onChangeText={(text) => setTicketPrice(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-2 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
 العرض الخاص بالفعالية  <Text className="text-red-500 text-base" > * </Text>  
</Text>


 
<RNPickerSelect
  style={pickerSelectStyles}
  pickerProps={{
    accessibilityLabel: realtedOffer,
  }}
  placeholder={{
    label: 'اختر',
    value: '',
  }}
  selectedValue={realtedOffer }
  onValueChange={(itemValue) => setRelatedOffer(itemValue)}
  items={showsArray.map((show) => ({
    label: `${convertTimeToDateTimeString(show.show_date)}`,
    value: show.id,
  }))}
>
</RNPickerSelect>



</View>
{ /*  END SINGLE INPUT */ }

{isLoading ?  (
  <View  className="flex items-center justify-center" >
          <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
        </View>
) : (
  <TouchableOpacity
        className="text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() =>  handleAddTicket( ) } >
          <Text style={styles.buttonText}> إضافة مقاعد </Text>
        </TouchableOpacity>
)}


</View>
      </KeyboardAvoidingView>
      <TouchableOpacity
    className="text-black mt-2 mb-8 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>


      { /* END INPUTS DASHBOARD */  }
     
    
    </ScrollView>
  );
};


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.Black,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.Black,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});


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
    textAlign: 'right',

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
    textAlign: 'right',
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  }
});

export default AddTicket;
