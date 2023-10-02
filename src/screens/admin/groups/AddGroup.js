import { View, Text , SafeAreaView , StyleSheet , StatusBar , Image , TouchableOpacity , ScrollView , TextInput  , Modal  , KeyboardAvoidingView  , TouchableWithoutFeedback , Keyboard , ActivityIndicator } from 'react-native'
import React , {useContext , useState , useEffect , useRef} from 'react'
import { FONTFAMILY , COLORS, BORDERRADIUS, SPACING } from '../../../theme/theme';
import { AppContext } from '../../../context/AppContext';
import TopStepCounter from '../../../components/TopStepCounter';
import TopStepNavigation from '../../../components/TopStepNavigation';
import RNPickerSelect from 'react-native-picker-select';
import Feather from '@expo/vector-icons/Feather';
import { AdminContext } from '../../../context/AdminContext';
import * as ImagePicker from 'expo-image-picker';


const AddGroup = ({ navigation }) => {

  const [userId, setUserId] = useState('');

  const {    topicsArray , citiesArray } = useContext(AppContext);

  const { addGroup   , error  , success , setError , uploadImage  } = useContext(AdminContext);
   

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [isLoading , setIsLoading] = useState(false);
  const [stepDesciption , setStepDescription ] = useState('اضافة المعلومات');
  const [currentStep , setCurrentStep ] = useState(1);
  const [groupLocation , setGroupLocation] = useState('');
  const [groupName , setGroupName] = useState('');
  const [groupDesc , setGroupDesc] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [actorThum , setActorThum] = useState('');


  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const removeSelectedTopic = (topic) => {
    setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic !== topic));
  };

  const handleNextStep =  async () => {
    
    if (currentStep == 1) {
      if (groupLocation !== ''   ) {
        setCurrentStep(2);
        setStepDescription('إضافة الأهتمامات');
      }else {
        setError("يرجى ادخال جميع الحقول المطلوبة");
        setTimeout(() => {
          setError('');
        } , 3200)
      }
    }

    if (currentStep == 2) {
      if ( selectedTopics.length > 2 ) {
        setCurrentStep(3);
        setStepDescription('اضافة العنوان');
      }else {
        setError("يرجى إختيار 3 مواضيع على الاقل");
        setTimeout(() => {
          setError('');
        } , 3200)
      }
    }

    if (currentStep == 3)  {
        if ( groupName !== '' ) {
         setCurrentStep(4);
        setStepDescription('اضافة وصف القروب');
          }else {
            setError("يرجى ادخال جميع الحقول المطلوبة");
            setTimeout(() => {
              setError('');
            } , 3200)
          }
    }

    if (currentStep == 4 ) {
        if ( groupDesc !== '' ) {
          setIsLoading(true);
          addGroup( groupName , groupDesc , groupLocation ,  actorThum , selectedTopics , () => {
            navigation.navigate('AdminTabs');
            setIsLoading(false);
          } );
             }else {
               setError("يرجى ادخال جميع الحقول المطلوبة");
               setTimeout(() => {
                 setError('');
               } , 3200)
             }
        }
     


  }

  const [selectedImageActor , setSelectedImageActor ] = useState(null);

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

  const scrollViewRef = useRef();
  
  return (
    
    <SafeAreaView   style={[ styles.container , isKeyboardOpen ? styles.keyboardOn : '' ]}  >

      
<ScrollView
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
      >

    <View   >

<StatusBar translucent backgroundColor="black" />

    <View style={styles.topAreaHeadins}  >

    <TopStepNavigation navigation={navigation} />

    <View className="mt-12" >
    <TopStepCounter percentage={ (currentStep / 4) * 100 } step={currentStep} totalStep={4} headline={stepDesciption} />
    </View>

    </View>


{ /* CHOOSING CATEGORY */ }
<View style={styles.containerMargin} className="mt-10" >

<KeyboardAvoidingView>

{error && (
        <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </>
      )}

      {currentStep == 1 && (
        <View>
        <View className="mb-8">

<Text style={[styles.textInput , styles.fontBold] } className="block text-gray-700 font-bold mb-2 text-base" >
     منطقة القروب هي المكان الذي يجتمع فيه.... </Text>  
  

    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-3" >
      إختيار منطقة القروب <Text className="text-red-500 text-base" > * </Text>  
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
        </View>
      )}

      {currentStep == 2 && (
        <View>
        <View className="mb-8">

<Text style={[styles.textInput , styles.fontBold] } className="block text-gray-700 font-bold mb-1 text-base" >
    إختيار مواضيع أهتمامات القروب </Text>  
  

<Text style={styles.textInput} className="block text-gray-700 font-bold mb-5" >
      يرجى اختيار 3 مواضيع على الاقل حول القروب 
    </Text>

    <View className="flex flex-row  flex-wrap items-start justify-start" >

    {topicsArray && topicsArray.length !== 0 ? topicsArray.map((item , index) => (

      <TouchableOpacity
      key={index}
      onPress={() => toggleTopic(item.topic_name)}
      className="py-2 rounded-lg text-sm w-2/5 flex flex-row items-center justify-center mx-2 mt-3"
        style={[styles.buttonBorder , selectedTopics.includes(item.topic_name) && styles.activeTopic ]}
        >
        <View className="flex flex-row items-center" >
        <Text className="text-xs" style={[styles.buttonTextBorder , { color: selectedTopics.includes(item.topic_name) ? COLORS.White : COLORS.Black } ]}>  {item.topic_name}  </Text>

        {selectedTopics.includes(item.topic_name) ? (
          <TouchableOpacity  onPress={() => removeSelectedTopic(item.topic_name)} >
                <Feather name="x" size={15} color={COLORS.White }  />
          </TouchableOpacity>
              ) : (
                <TouchableOpacity  onPress={() => toggleTopic(item.topic_name)} > 
          <Feather name="plus" size={15} color={COLORS.Red} style={styles.starIcon} />
          </TouchableOpacity>
               
              )}

        </View>
      </TouchableOpacity>

)) : (
<Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-black font-bold mb-10 text-lg"  >
لا يوجد مواضيع بعد  
</Text>
) }



   

    </View>
  </View>
        </View>
      )}

      {currentStep == 3 && (
        <View>
        <View className="mb-8">

<Text style={[styles.textInput , styles.fontBold] } className="block text-gray-700 font-bold mb-1 text-base" >
      ما هو أسم القروب الخاص بك ؟ </Text>  

      <Text className="text-sm text-gray-600 text-left mb-3" style={styles.font} > أكتب اسم قروب معبر عن محتواه ويجذب الانتباه</Text>
  
        <TextInput
    style={styles.inputStyle}
    className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
    id="title"
        placeholder="أكتب أسم قروبك الرائع"
        value={groupName}
        onChangeText={(text) => setGroupName(text) }
    />

  
  </View>
        </View>
      ) }

  {currentStep == 4 && (
    <View>
        <View className="mb-8">

<Text style={[styles.textInput , styles.fontBold] } className="block text-gray-700 font-bold mb-1 text-base" >
      ما هو وصف القروب الخاص بك ؟ </Text>  

      <Text className="text-sm text-gray-600 text-left mb-3" style={styles.font} >  أكتب وصف جذاب للقروب الخاص بك </Text>
  
      <TextInput
    style={[styles.inputStyle , styles.inputAreaStyle]}
    className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
    id="descrition"
    multiline={true}
    numberOfLines={8}
    placeholder="عرفنا أكثر على القروب الي بتضيفه"
    autoCapitalize="none"
    value={groupDesc}
    onChangeText={(text) => setGroupDesc(text) }
    />

    <View className="mt-5" >

    <View className="flex flex-row items-center mt-3" >
    <View style={styles.ellipse} />
    <Text style={styles.font } className="mx-2 text-sm" >
    ما هو هدف القروب الخاص فيك ؟
      </Text>  
    </View>

    <View className="flex flex-row items-center mt-3" >
    <View style={styles.ellipse} />
    <Text style={styles.font } className="mx-2 text-sm" >
   من هم الأشخاص الذي تتوقع لقائهم ؟
      </Text>  
    </View>

    <View className="flex flex-row items-center mt-3" >
    <View style={styles.ellipse} />
    <Text style={styles.font } className="mx-2 text-sm" >
            ما الذي تخطط لفعله في قروبك ؟
      </Text>  
    </View>

    </View>
  </View>
        </View>
  ) }

  {currentStep == 3 && (
        <View>
        <View className="mb-8">

<Text style={[styles.textInput , styles.fontBold] } className="block text-gray-700 font-bold mb-1 text-base" >
      رفع صورة للقروب الخاص بك </Text>  

      <Text className="text-sm text-gray-600 text-left mb-3" style={styles.font} > في حال عدم رفع صورة ستكون الصورة الافتراضية موجودة </Text>
  
      
      <View className="" >
    <View className="items-center flex mt-4" >
    {selectedImageActor && <Image source={{ uri: selectedImageActor }} style={{ width: 80, height: 80 , borderRadius: 500 }} className="mb-3" />}
    </View>

    
    <TouchableOpacity
            className="block mt-2 text-black py-3 rounded-lg  text-sm px-6  mb-2 w-full"
            style={styles.uploadButton}
              onPress={() =>  handleChooseImageActor() }>
              <Text style={styles.buttonTextBorder}>   اختيار الصورة </Text>
            </TouchableOpacity>
          
    </View>


  
  </View>
        </View>
      ) }
 


  <View className="items-center flex-col mt-8 mb-8" >
      {isLoading ? (
    <View className="mb-5 mt-5" >
    <ActivityIndicator size={'large'} color={COLORS.DarkRed} />
      </View>
    ) : (
      <TouchableOpacity
        className=" text-center rounded-full w-2/3 py-1 px-1"
        style={styles.button}
        onPress={() => handleNextStep() }
        >
        {currentStep == 4 ?(
          <Text style={styles.buttonText}> إضافة القروب  </Text>
        ):(
          <Text style={styles.buttonText}> المتابعة  </Text>
        )}
        </TouchableOpacity>
    )}

       
      </View>
      
    </KeyboardAvoidingView>

</View>

</View>


    </ScrollView>
      
  

    </SafeAreaView>
  )
}


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
    backgroundColor: COLORS.White,
    height: '100%',
    direction: 'rtl',
    felx:1,
    borderRadius: 50,
  },
  textInput: {
    color: COLORS.Black,
    fontFamily: FONTFAMILY.cairo,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  containerMargin: {
    paddingHorizontal: 20,
  },

  button: {
    borderColor: 'none',
    backgroundColor: COLORS.Red,
  },

  activeTopic: {
    borderColor: 'none',
    backgroundColor: COLORS.Red,
  },
  buttonText: {
    fontFamily: FONTFAMILY.cairo,
    fontSize: 14,
    fontWeight: 400,
    
    color: 'white',
    textAlign: 'center',
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FAFAFA',
    textAlign: 'right',
  },
  inputAreaStyle: {
    textAlignVertical: 'top',
    height: 150, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 25,
  },
  modalContent: {
    borderRadius: 10,
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
  font: {
    fontFamily: FONTFAMILY.cairo
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo,
    textAlign: 'right',
  },
  keyboardOn: {
    paddingBottom: 150,
  },
  topAreaHeadins: {
   
    paddingHorizontal: 20,
  },
  datePickerButton: {
    minWidth: '100%',
    fontSize: 14,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 0, 
  },
  timePickerButton: {
    backgroundColor: '#f9f9f9',
    color: COLORS.White,
    fontFamily: FONTFAMILY.tajawal_bold,
    color: 'white',
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonTextBorder: {
    fontFamily: FONTFAMILY.tajawal,
   
    color: COLORS.Black,
    textAlign: 'center',
  },

  opacity: {
    opacity: 1,
  },
  map: {
    marginTop: 30,
    width:'100%',
    height: '95%',
  },
  banner: {
    width: '100%',
    height: '75%'
  },
  fontBold: {
    fontFamily: FONTFAMILY.cairo_bold
  },
  ellipse: {
    width: 11, 
    height: 11, 
    backgroundColor: COLORS.Red, 
    borderRadius: 400, 
  },
  uploadButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },

});

export default AddGroup