import { View , SafeAreaView , StyleSheet , StatusBar    , ScrollView   , Text , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { FONTFAMILY , COLORS } from '../theme/theme';
import TopProfileNavigator from '../components/TopProfileNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';


const WhoWeAreScreen = ({ navigation }) => {



  const [showedText , setShowedText] = useState(null);

  const handleToggleText = (info) => {
    setShowedText(showedText === info ? null : info);
  };

  return (
    <SafeAreaView style={styles.container} >
      
      <ScrollView>


      <View   >

      <StatusBar translucent backgroundColor="black" />

      { /* END TOP HEADER TEXT */ }
      <View className="mt-8" style={styles.topAreaHeadins}  >

        <View className="mt-2 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} > من هو تشارك؟ </Text>
        <Text className="text-sm text-left mt-2" style={styles.font} > 
              هذا النص هو مثال لنص يمكن أن يستبدل في 
      نفس المساحة، لقد تم توليد هذا النص من 
      مولد النص العربى، حيث يمكنك أن تولد مثل 
      هذا النص أو العديد من النصوص  الأخرى
      إضافة إلى زيادة عدد الحروف التى يولدها 
      التطبيق إذا كنت تحتاج إلى عدد أكبر.
   </Text>
        </View>

        <View className="mt-8 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} > فكرة التطبيق   </Text>
        <Text className="text-sm text-left mt-2" style={styles.font} > 
        هذا النص هو مثال لنص يمكن أن يستبدل في 
نفس المساحة، لقد تم توليد هذا النص من 
مولد النص العربى، حيث يمكنك أن تولد مثل 
هذا النص أو العديد من النصوص  الأخرى
 إضافة إلى زيادة عدد الحروف التى يولدها 
التطبيق إذا كنت تحتاج إلى عدد أكبر.
   </Text>
        </View>

        <View className="mt-8 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} > ما هي صفات تشارك؟    </Text>
        <Text className="text-sm text-left mt-2" style={styles.font} > 
        هذا النص هو مثال لنص يمكن أن يستبدل في 
نفس المساحة، لقد تم توليد هذا النص من 
مولد النص العربى، حيث يمكنك أن تولد مثل 
هذا النص أو العديد من النصوص  الأخرى
 إضافة إلى زيادة عدد الحروف التى يولدها 
التطبيق إذا كنت تحتاج إلى عدد أكبر.
   </Text>
        </View>

        <View className="mt-8 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} >   تشارك الاقتصادي </Text>
        <Text className="text-sm text-left mt-2" style={styles.font} > 
        هذا النص هو مثال لنص يمكن أن يستبدل في 
نفس المساحة، لقد تم توليد هذا النص من 
مولد النص العربى، حيث يمكنك أن تولد مثل 
هذا النص أو العديد من النصوص  الأخرى
 إضافة إلى زيادة عدد الحروف التى يولدها 
التطبيق إذا كنت تحتاج إلى عدد أكبر.
   </Text>
        </View> 

        <View className="mt-8 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} >   تشارك الاقتصادي </Text>
        <Text className="text-sm text-left mt-2" style={styles.font} > 
        هذا النص هو مثال لنص يمكن أن يستبدل في 
نفس المساحة، لقد تم توليد هذا النص من 
مولد النص العربى، حيث يمكنك أن تولد مثل 
هذا النص أو العديد من النصوص  الأخرى
 إضافة إلى زيادة عدد الحروف التى يولدها 
التطبيق إذا كنت تحتاج إلى عدد أكبر.
   </Text>
        </View>

        <View className="mt-8 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} >    طريقة العمل </Text>

        <Text className="text-base mt-5 text-left" style={styles.lightBlue} >    كيفية التأجير  </Text>

        <View className="flex flex-row mt-2" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > اعرض غرضك مع الوصف </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > حدد سعره و كميته </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > وافق على طلبات الاقتراض </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > أجره </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} >اكسب النقود </Text>
        </View>
       
        </View>
       
        </View>
       

        <View className="mt-5 items-start flex" >
        
        <Text className="text-base mt-5 text-left" style={styles.lightBlue} >    كيفية الاستئجار </Text>

        <View className="flex flex-row mt-2" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > ابحث عن الغرض الذي تحتاجه </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > اطلبه و انتظر الموافقة </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > استعمله </Text>
        </View>
       
        </View>

        <View className="flex flex-row mt-3" >
        <View className="mt-2 mx-2" >
        <Ionicons name="ellipse" size={18} color="#007FB7"  />
        </View>
        <View>
        <Text className="text-sm text-left mt-2" style={styles.font} > أرجعه بحالته الأصلية و استرجع مبلغ التأمين</Text>
        </View>
       
        </View>

        </View>
       

      </View>



      </View>

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
  topAreaHeadins: {
    paddingHorizontal: 30,
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
  activeBtn: {
    backgroundColor: COLORS.White,
  },
  activeBtnText: {
    color: COLORS.Blue,
  },
  font: {
    fontFamily: FONTFAMILY.font_regular,
  },
  headlineBlue: {
    fontFamily: FONTFAMILY.font_regular,
    color: COLORS.Blue,
  },
  lightBlue: {
    fontFamily: FONTFAMILY.font_regular,
    color: COLORS.LightBLue,
  },
  lineHeightFont: {
    lineHeight: 25,
  },
  transformY: {
    transform: [{ translateY: -5 }], 
  }
 

} );

export default WhoWeAreScreen