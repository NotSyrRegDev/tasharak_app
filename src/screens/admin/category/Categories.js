import React, {useContext, useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {  query , collection , getDocs , db , where   } from "../../../../firebase";
import { AdminContext } from '../../../context/AdminContext';
import { AppContext } from '../../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';



const Categories = ({navigation , route}) => {

  const [isLoading , setIsLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const {  deleteRecord , error , setError , success } = useContext(AdminContext);
  
  const [categoryArray , setCategoriesArray] = useState([]);

  const handleModal = (  id ) => {
   setModalVisible(!modalVisible);
   setEditId(id);
   }

   useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
  
      const getCategoriesData = async () => {
        try {
          const q = query(collection(db, "categories"));
          const querySnapshot = await getDocs(q);
          const categoriesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setCategoriesArray(categoriesData);
          setError(null);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      getCategoriesData();
    }, [])
  );


  if (
    isLoading
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

    { /* EVENT MANAGE */ }
    <View className="mt-12" >

    <Text style={styles.font} className="block text-black font-bold mb-2 text-2xl"  >
    الفئات الحالية
        </Text>

        <View className="flex flex-col mt-5" >

      {categoryArray && categoryArray.length !== 0 ? categoryArray.map((item , index) => (

        <TouchableOpacity onPress={() => handleModal(item.id) } key={index} className="w-full p-4 flex-row items-center justify-between text-sm rounded-lg  bg-gray-100 border  mb-5" >
        <View>
        <Feather
                  name="check-square"
                  color={COLORS.DarkRed}
                  size={FONTSIZE.size_24}
                />
        </View>
        <View>
        <Text className="text-black text-lg" style={styles.font} > 
          {item.category_name}
          </Text>
        </View>
       
        

        </TouchableOpacity>

      )) : (
        <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-black font-bold mb-10 text-lg"  >
        لا يوجد فئات بعد  
        </Text>
      ) }
        { /* SINGLE ITEM */ }

       
        <TouchableOpacity
        className="mt-3 text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('AddCategoryDashboard')}>
          <Text style={styles.buttonText}> إضافة فئة </Text>
        </TouchableOpacity>

        <TouchableOpacity
    className="text-black mt-2 text-sm px-6 py-4 pb-12"
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>
      

        </View>



    </View>




    { /* END EVENT MANAGE */ }

    <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} >

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
      
          <View className="flex felx-row items-center justify-center" >
          <Text className="text-black text-center text-lg mb-5" style={styles.font} > الاجرائات على الفئة  </Text>
          
      <TouchableOpacity
        className="mt-2 text-center text-black py-3 bg-green-400  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() =>  {
            setModalVisible(!modalVisible);
            navigation.navigate('EditCategory' , {
    editId : editId,
   } );


          } }>
          <Text style={styles.buttonText}>   تعديل الفئة   </Text>
        </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 text-center text-black py-3 bg-red-400  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => {
            deleteRecord("categories" , editId);
          } }>
          <Text style={styles.buttonText}>   حذف الفئة   </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-black py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text  style={styles.buttonTextBorder}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>

  </View>

 

</View>
  

</Modal>

    
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
  buttonTextBorder: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'center',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
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
    color: COLORS.White,

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
    color: COLORS.White,
  },
  font: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTFAMILY.tajawal,
  },
  iconBox: {
    width:50 ,
    height:50,
  },
  boxManage: {
    borderRadius: 20,
    marginTop: 55,
    marginHorizontal: 10,
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
    minWidth: '79%',
    padding: 20,
    backgroundColor: COLORS.White,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  buttonBG: {
    minWidth: '85%',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
 
});

export default Categories;
