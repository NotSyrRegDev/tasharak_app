import React, { createContext, useState , useRef } from "react";
import { doc, setDoc , db  , auth  , signInWithEmailAndPassword , createUserWithEmailAndPassword , onAuthStateChanged , signOut , query , collection , where , getDocs , updateDoc , updatePassword , sendEmailVerification } from "../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [ success , setSuccess ] = useState(null);

  const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
 

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const resetStates = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
      setIsLoading(false);
    } , 1850)
  }


  const onLogin = (email, password) => {
    setIsLoading(true);
    if (email == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    
    signInWithEmailAndPassword(auth, email, password)
      .then( async (u) => {

        const q = query(collection(db, "users"), where("email", "==", email ) );
   
        const querySnapshot = await getDocs(q);
      
        const usersDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';

        if ( usersDataArray.length !== 0  ) {
        const userObject = {
          id: usersDataArray[0].id ,
          first_name: usersDataArray[0].first_name ,
          last_name: usersDataArray[0].last_name,
          email: usersDataArray[0].email,
          phone: usersDataArray[0].phone,
          account_type : usersDataArray[0].account_type,
        }
        await AsyncStorage.setItem('tashark_user', JSON.stringify(userObject));

        const user = userCredential.user;
        setUser(user);
        resetStates();
      }
      else {
        setError("لم نعثر على المستخدم");
        resetStates();
      }
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        resetStates();
      });
  };

  const onRegisterPersonal = async (accountType , fName , lName , email, userPhone ,  password, repeatedPassword , checkAgreement) => {
    setIsLoading(true);

    if (fName == '' ) {
      setError("يرجى ادخال اسمك الاول");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (lName == '' ) {
      setError("يرجى ادخال اسمك الاخير");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (email == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userPhone == '' ) {
      setError("يرجى ادخال رقم هاتفك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (repeatedPassword == '' ) {
      setError("يرجى ادخال تأكيد كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (checkAgreement == false ) {
      setError("يرجى الموافقة على الشروط والأحكام");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password !== repeatedPassword) {
      setError("لا يوجد تطابق في كلمات المرور");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }
      let idMaked = makeid(20);
  const users = await setDoc(doc(db, "users", idMaked ), {
    first_name: fName,
    last_name: lName,
    email: email,
    phone: userPhone,
    account_type : accountType,
    thum: '',
    my_revenue: 0,
    my_rents: 0,
    my_rentd: 0,
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        try {
          const userObject = {
            id: idMaked,
            first_name: fName,
            last_name: lName,
            email: email,
            phone: userPhone,
            account_type : accountType,
          }
          await AsyncStorage.setItem('tashark_user', userObject);

          const user = userCredential.user;
          setUser(user);
          setIsLoading(false);

        } catch (error) {
          console.log('Error storing data:', error);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
       
        if (e.code === "auth/email-already-in-use") {
          setError("الايميل موجود بالفعل , يرجى تسجيل الدخول");
        } else if (e.code === "auth/invalid-email") {
          setError("الايميل غير صحيح , يرجى كتابة الايميل بشكل صحيح");
        } 
         else if (e.code === "auth/weak-password") {
          setError("كلمة المرور ضعيفة يرجى ادخال كلمة مرور أقوى");
        } else if (e.code === "auth/network-request-failed") {
          setError("حدث خطأ في الشبكة");
        } else if (e.code === "auth/too-many-requests") {
          setError("تم تجاوز عدد المحاولات المسموح به , يرجى المحاولة في وقت أخر");
        } else if (e.code === "auth/user-disabled") {
          setError("تم تعطيل حسابك , يرجى التواصل مع الدعم");
        } else {
          setError(e.toString());
        }
        resetStates();

      });
  };

  const onRegisterCompany = async (accountType , companyName , companyNumber , fName , lName , email, userPhone , password, repeatedPassword , checkAgreement ) => {
    setIsLoading(true);

    if (fName == '' ) {
      setError("يرجى ادخال اسمك الاول");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (lName == '' ) {
      setError("يرجى ادخال اسمك الاخير");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (email == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userPhone == '' ) {
      setError("يرجى ادخال رقم هاتفك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (companyName == '' ) {
      setError("يرجى ادخال اسم الشركة");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (companyNumber == '' ) {
      setError("يرجى ادخال ترخيص الشركة");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (repeatedPassword == '' ) {
      setError("يرجى ادخال تأكيد كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (checkAgreement == false ) {
      setError("يرجى الموافقة على الشروط والأحكام");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password !== repeatedPassword) {
      setError("لا يوجد تطابق في كلمات المرور");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }


   

      let idMaked = makeid(20);
  const users = await setDoc(doc(db, "users", idMaked ), {
    first_name: fName,
    last_name: lName,
    email: email,
    phone: userPhone,
    account_type : accountType,
    company_name : companyName,
    company_number: companyNumber
    });

    createUserWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
      try {
        const userObject = {
          id: idMaked,
          first_name: fName,
          last_name: lName,
          email: email,
          phone: userPhone,
          account_type : accountType,
        }
        await AsyncStorage.setItem('tashark_user', userObject);

        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);

      } catch (error) {
        console.log('Error storing data:', error);
        setIsLoading(false);
      }
    })
    .catch((e) => {
      setIsLoading(false);
     
      if (e.code === "auth/email-already-in-use") {
        setError("الايميل موجود بالفعل , يرجى تسجيل الدخول");
      } else if (e.code === "auth/invalid-email") {
        setError("الايميل غير صحيح , يرجى كتابة الايميل بشكل صحيح");
      } 
       else if (e.code === "auth/weak-password") {
        setError("كلمة المرور ضعيفة يرجى ادخال كلمة مرور أقوى");
      } else if (e.code === "auth/network-request-failed") {
        setError("حدث خطأ في الشبكة");
      } else if (e.code === "auth/too-many-requests") {
        setError("تم تجاوز عدد المحاولات المسموح به , يرجى المحاولة في وقت أخر");
      } else if (e.code === "auth/user-disabled") {
        setError("تم تعطيل حسابك , يرجى التواصل مع الدعم");
      } else {
        setError(e.toString());
      }

      resetStates();

    });

  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  const editUserProfile =  async ( id , fName , lName , email ,  userPhone , userThum , callBack ) => {

    setIsLoading(true);

    if (fName == '' ) {
      setError("يرجى ادخال اسمك الاول");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (lName == '' ) {
      setError("يرجى ادخال اسمك الاخير");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (email == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userPhone == '' ) {
      setError("يرجى ادخال رقم الهاتف الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    const existingValue = await AsyncStorage.getItem('tashark_user');
    const parsedValue = JSON.parse(existingValue);
    parsedValue.first_name = fName;
    parsedValue.last_name = lName;
    parsedValue.email = email;
    parsedValue.phone = userPhone;
    parsedValue.thum = userThum ? userThum?._j : '';
    await AsyncStorage.setItem('tashark_user', JSON.stringify(parsedValue));


    const docRef = doc(db, "users", id);
  
    const data = {
      first_name: fName,
      last_name: lName,
      email: email,
      phone: userPhone,
      thum: userThum ? userThum?._j : ''
    };

   await updateDoc(docRef, data);

    setSuccess("تم بنجاح تعديل معلوماتك");
    setIsLoading(false);
    setTimeout(() => {
      setSuccess(null);
      resetStates();
      if (callBack) {
        callBack();
      }
    } , 3000);

  }

  const updateUserPassword = ( pass , confirmPass ) => {

    if (pass == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (confirmPass == '' ) {
      setError("يرجى ادخال تأكيد كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (pass !== confirmPass) {
      setError("لا يوجد تطابق في كلمات المرور");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    const currentUser = auth.currentUser;
    updatePassword(currentUser, pass)
  .then(() => {
    setSuccess("تم بنجاح تعديل كلمة المرور");
    setIsLoading(false);
    setTimeout(() => {
      setSuccess(null);
    } , 1500)
   
  })
  .catch((error) => {
    setError("فشل تعديل كلمة المرور");
    setTimeout(() => {
      setIsLoading(false);
      setError(null);
    } , 1500)
  });


  }

 

  return (
    <AuthenticationContext.Provider
    value={{
        isAuthenticated: !!user,
        user,
        success,
        isLoading,
        error,
        setIsLoading,
        onLogin,
        onRegisterPersonal,
        onLogout,
        onRegisterCompany,
        editUserProfile,
        updateUserPassword
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
