import React, { useState , useContext , useEffect} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { AdminContext } from '../../../context/AdminContext';
import { getDoc , doc , db   } from '../../../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../../../context/AppContext';
import RNPickerSelect from 'react-native-picker-select';

const EditGroup = ({navigation , route}) => {
  
  const [dataObject , setDataObject] = useState(null);
  const [isLoading , setIsLoading] = useState();
  const [groupLocation , setGroupLocation] = useState('');
  const [groupName , setGroupName] = useState('');
  const [groupDesc , setGroupDesc] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [actorThum , setActorThum] = useState('');

  const {    topicsArray , citiesArray } = useContext(AppContext);
  const { editGroup , error  , success , setError  } = useContext(AdminContext);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "groups", route.params.editId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataObject(docSnap.data())
          setGroupName(docSnap.data().group_name);
          setGroupLocation(docSnap.data().group_city);
          setGroupDesc(docSnap.data().group_desc);
          setSelectedTopics(docSnap.data().group_topics);
          setActorThum(docSnap.data().group_thum);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);


  const handleEditActor = () => {
    editGroup( categoryName , route.params.editId , ( ) => {
      navigation.navigate('AdminTabs')
    } );
  }

  const handleChooseImageActor = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      setIsLoading(false);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      setError("يرجى اكمال العملية");
      setIsLoading(false);
    } else {
      setSelectedImageActor(pickerResult.uri);
      let imageActor =  uploadImage(pickerResult.uri);
      setActorThum(imageActor);
      setIsLoading(false);
    }
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
      </View>
    </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar  />


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

    <View className="mb-8"  >
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
          اسم القروب <Text className="text-red-500 text-base" > * </Text>  
        </Text>

    <View style={styles.inputBox} >
    
    <TextInput
      style={styles.inputStyle}
      id="actorName"
      value={groupName}
      onChangeText={(text) => setGroupName(text)}
    />
    </View>

    </View>

    <View className="mb-8"  >
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
          وصف القروب <Text className="text-red-500 text-base" > * </Text>  
        </Text>
    <View style={styles.inputBox} >
    <TextInput
    style={[styles.inputStyle , styles.inputAreaStyle]}
    id="descrition"
    multiline={true}
    numberOfLines={8}
    placeholder="عرفنا أكثر على القروب الي بتضيفه"
    autoCapitalize="none"
    value={groupDesc}
    onChangeText={(text) => setGroupDesc(text) }
    />
    </View>
    </View>

    <View className="mb-8"  >
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       مكان القروب <Text className="text-red-500 text-base" > * </Text>  
        </Text>
    <RNPickerSelect
      style={pickerSelectStyles}
      pickerProps={{
        accessibilityLabel: groupLocation,
      }}
      placeholder={{
        label: 'اختر',
        value: '',
      }}
      selectedValue={groupLocation }
      onValueChange={(itemValue) => setGroupLocation(itemValue)}
      items={citiesArray.map((item) => ({
        label: item.city_name,
        value: item.city_name,
      }))}
    >
    </RNPickerSelect>
    </View>

    <View className="mb-8"  >
        <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       صورة القروب <Text className="text-red-500 text-base" > * </Text>  
        </Text>

        <View className="" >
    <View className="items-center flex mt-4" >
    {actorThum && <Image source={{ uri: actorThum }} style={{ width: 80, height: 80 , borderRadius: 500 }} className="mb-3" />}
    </View>

    
    <TouchableOpacity
            className="block mt-2 text-black py-3 rounded-lg  text-sm px-6  mb-2 w-full"
            style={styles.uploadButton}
              onPress={() =>  handleChooseImageActor() }>
              <Text style={styles.buttonTextBorder}>   اختيار الصورة </Text>
            </TouchableOpacity>
          
    </View>

   


    </View>


{!isLoading && (
  
<TouchableOpacity
        className="text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleEditActor() }>
          <Text style={styles.buttonText}> تعديل القروب </Text>
        </TouchableOpacity>
)}
      

</View>
      </KeyboardAvoidingView>
   

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
    paddingRight: 30, 
  },
  inputAndroid: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
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
  inputAreaStyle: {
    textAlignVertical: 'top',
    height: 150, 
  },

});

export default EditGroup;
