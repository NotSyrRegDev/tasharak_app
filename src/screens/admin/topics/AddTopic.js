import React, { useState , useContext , useRef} from 'react';
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



const AddTopic = ({navigation , route}) => {
  
  const [isLoading , setIsLoading] = useState(false);
  const [cityName , setCityName] = useState('');

  const { addTopic , error  , success , setError   } = useContext(AdminContext);


  const scrollViewRef = useRef();

  const handleAddCateogry = () => {
    setIsLoading(true);
    addTopic( cityName  , () => {
      navigation.navigate('AdminTabs');
      setIsLoading(false);
    } );

   
  }

  return (
    <ScrollView style={styles.container} bounces={false}
          
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
    >
      <StatusBar  />

      { /* INPUTS DASHBOARD */  }
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="mt-16" >

      {error && (
        <>
        {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
        <View className=" p-4 text-sm text-black rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        </>
         
        )}

        {success && (
          <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className=" p-4 text-sm text-black rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
          </>
    
        )}

        <View className="mb-8"  >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      اسم الموضوع   <Text className="text-red-500 text-base text-right" > * </Text>  
    </Text>

    <View style={styles.inputBox} >
    <TextInput
      style={styles.inputStyle}
      id="cityName"
          autoCapitalize="none"
          value={cityName}
          onChangeText={(text) => setCityName(text) }
    />
    </View>

    </View>

      {isLoading ? (
      
            <View className="mb-5 mt-5" >
            <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
            </View>
      ) : (
        <TouchableOpacity
              className="text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
                style={styles.button}
                onPress={() => handleAddCateogry() }>
                <Text style={styles.buttonText}> إضافة الموضوع </Text>
              </TouchableOpacity>
      )}

      </View>

      </KeyboardAvoidingView>
   
    
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

export default AddTopic;
