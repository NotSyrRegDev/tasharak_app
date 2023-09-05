import React, { createContext, useState, useEffect } from "react";
import {  query , collection , getDocs , db ,  storage , ref, uploadBytes, getDownloadURL  , setDoc , doc , where  , or , updateDoc , deleteDoc , getDoc } from "../../firebase";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  // USER MINES 
  const [bookingProduct , setBookingProduct] = useState({});
  const [ myTenantProducts , setMyTenantProducts ] = useState([]);
  const [ myFoundedProducts , setMyFoundedProducts ] = useState([]);
  const [ myRentedProducts , setMyRentedProducts ] = useState([]);
  const [ myFoundedAddresses , setMyFoundedAddresses ] = useState([]);

 
  const [objectLocation , setObjectLocation] = useState({
    latitude: 24.68204,
    latitudeDelta: 27.499085419977938,
    longitude: 46.68725,
    longitudeDelta: 15.952148000000022,
  });
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 46.68725,
    latitude: 24.68204
  });
  const [allProducts , setAllProducts] = useState([]);
  const [foundedProducts , setFoundedProducts] = useState([]);

  const [categoryArray , setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountType , setAccountType] = useState('personal');
  const [success, setSucces] = useState(null);
  const [productAddArray , setProductAddArray] = useState([]);
  const [productInfo , setProductInfo] = useState([]);
  const [productAdditional , setProductAdditional] = useState([]);
  const [productImages , setProductImages] = useState([]);
  const [productLocation , setProductLocation] = useState({});
  const [productLocationDetails , setProductLocationDetails] = useState({});

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


  useEffect(() => {
    setIsLoading(true);
  
    const getCategoriesData = async () => {
      try {
        const q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCategoriesArray(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getCategoriesData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
  
    const getAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map((doc) => {
          const productData = doc.data();
          productData.id = doc.id;
          return productData;
        });
        setAllProducts(allProducts);
      } catch (error) {
      
      }
    };
    getAllProducts();
  }, []);

  const addProduct = async () => {
  
    setIsLoading(true);
    const productName = productInfo[0];
     const productDesc = productInfo[1];
    const categoryName = productInfo[2];
    const tagsProductArray = productInfo[3];
    const userId = productInfo[4];

    let idMaked = makeid(20);

    try {
      const products = await setDoc(doc(db, 'products', idMaked), {
        product_name: productName,
        product_desc: productDesc,
        product_category: categoryName,
        product_tags: tagsProductArray,
        productAdditional: productAdditional,
        product_images: productImages,
        product_location: productLocation,
        location_details: productLocationDetails,
        user_id: userId
      });
      setIsLoading(false);
      setSucces("تمت اضافة المنتج بنجاح");
      
      setTimeout(() => {
        setSucces('');
      }, 2500);
    } catch (error) {
      setError("حدث خطأ في العملية");
      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 2500);
    }
  };

  const editProduct = async ( productName , productDesc , categoryName , tagsProductArray , productCase , productCount , dailyRentPrice , weekRentPrice , monthlyRentPrice , minRentalPrice , maxRentalPrice , deliveryWay , insurancePrice , insuranceStatus , deliveryPlan , selectedImages , draggableMarkerCoord , product_id ) => {

    try {

      let productAdditional = [ 
        {
        productCase ,
        dailyRentPrice,
        weekRentPrice,
        monthlyRentPrice,
        minRentalPrice,
        maxRentalPrice,
        deliveryWay,
        insurancePrice,
        insuranceStatus,
        deliveryPlan,
      }
     ] ;
      const docRef = doc(db, "products", product_id );

      const data = {
        product_name: productName,
        product_desc: productDesc,
        product_category: categoryName,
        product_tags: tagsProductArray,
        productAdditional: productAdditional,
        product_images: selectedImages,
        product_location: draggableMarkerCoord,

      };
  
      updateDoc(docRef, data);
        setSucces("تم تعديل المنتج بنجاح");
        setTimeout( () => {
          setSucces('');
        } , 2500 );
    }
    catch (error) {
      setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }


  }

  const uploadImage = async (uri) => {
   
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const path = `images/${filename}`;
  
    const storageRef = ref(storage, path);
  
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      setSucces("تم بنجاح رفع الصورة");
      setTimeout( () => {
        setSucces('');
      } , 2500 );
      return downloadURL;
      // Do something with the download URL
    } catch (error) {
     setError("حدث خطأ اثناء رفع الصورة");
     setTimeout( () => {
      setError('');
    } , 2500 );
      // Handle the error
    }
  };

  const sendContactRequest = async (fullName , email , phoneNumber , helpState , message) => {

    setIsLoading(true);

    if (fullName == '' ) {
      setError("يرجى ادخال اسمك الكامل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (email == '' ) {
      setError("يرجى ادخال الايميل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (helpState == '' ) {
      setError("يرجى اختيار سبب التواصل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (message == '' ) {
      setError("يرجى اختيار الرسالة");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);
    try {
      const contacts = await setDoc(doc(db, 'contacts', idMaked), {
        contacer_name: fullName,
        contacer_email: email,
        contacer_phone: phoneNumber,
        contact_reason: helpState,
        contact_message: message,
      });
      setSucces("شكرا لك وصلنا طلبك");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }
  }

  const searchProduct = async (searchVar) => {
    try {
      const q = query(
        collection(db, 'products'),
        or(
          where('product_name', '==', searchVar),
          where('product_category', '==', searchVar),
          where('product_tags', 'array-contains', searchVar)
        )
      );
      const querySnapshot = await getDocs(q);
    
      // Process the querySnapshot and retrieve the matching products with IDs
      const matchingProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
      setFoundedProducts(matchingProducts);
    } catch (error) {
     
    }
  };

  const findMyProducts = async (userId) => {
    try {
      const q = query(
        collection(db, 'products'),
          where('user_id', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const matchingProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyFoundedProducts(matchingProducts);
    } catch (error) {
    
    }
  }

  const findMyBookings = async (userId) => {
    try {
      const q = query(
        collection(db, 'bookings'),
          where('user_id', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const matchingBookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
     
      setMyTenantProducts(matchingBookings);
    } catch (error) {
    
    }

  }

  const findMyRented = async (userId) => {
    try {
      const q = query(
        collection(db, 'bookings'),
          where('booking.seller_id', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const matchingBookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      setMyRentedProducts(matchingBookings);
    } catch (error) {
     
    }

  }

  const findMyAddresses = async (userId) => {
    try {
      const q = query(
        collection(db, 'addresses'),
          where('user_id', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      const matchingAddresses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
      setMyFoundedAddresses(matchingAddresses);
    } catch (error) {
     
    }
  }

  const addAddress = async ( addressName, addressStreet , addressCity , address_coordinates , userId) => {
    setIsLoading(true);

    let idMaked = makeid(20);
    try {
      const addresses = await setDoc(doc(db, 'addresses', idMaked), 
      {
        address_name: addressName,
        address_city: addressCity,
        address_street: addressStreet,
        address_codinates: address_coordinates,
        user_id: userId
      });
      setSucces("تمت إضافة العنوان بنجاح");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }
  
  }

  const editAddress = async ( addressName, addressCity , addressStreet  , addressCordinates ,  address_id) => {
    setIsLoading(true);
    if (addressCity == '' ) {
      setError("يرجى ادخال المدينة");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (addressName == '' ) {
      setError("يرجى ادخال اسم العنوان");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (addressStreet == '' ) {
      setError("يرجى ادخال شارع العنوان");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {

      const docRef = doc(db, "addresses", address_id);

      const data = {
        address_street: addressStreet,
        address_name: addressName,
        address_city: addressCity,
        address_codinates: addressCordinates,

      };
  
      updateDoc(docRef, data);
        setSucces("تم تعديل العنوان بنجاح");
        setTimeout( () => {
          setSucces('');
        } , 2500 );
    }
    catch (error) {
      setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }
  
  }

  const deleteRecord = async (table, id) => {
    try {
      await deleteDoc(doc(db, table, id));
      setSucces("تم الحذف بنجاح");
      setTimeout(() => {
        setSucces('');
      }, 3500);
      // Additional actions or state updates upon successful deletion
    } catch (error) {
      setError("حدث خطأ في العملية");
      setTimeout(() => {
        setError('');
      }, 3500);
     
    }
  };

  const addToFavourite = async (user_id, favourite_id) => {
    const userRef = doc(db, "favourites", user_id);
    const userDoc = await getDoc(userRef);
  
    if (!userDoc.exists()) {
      // User document doesn't exist, create a new one with the product
      const favourites = await setDoc(userRef, {
        user_id: user_id, // Add the user_id to the document
        product_ids: [favourite_id],
      });
    } else {
      const existingProductIds = userDoc.data().product_ids || [];
  
      if (existingProductIds.includes(favourite_id)) {
        // Product already exists in the favorites list, remove it
        const updatedProductIds = existingProductIds.filter(
          (productId) => productId !== favourite_id
        );
  
        await updateDoc(userRef, {
          product_ids: updatedProductIds,
        });
      } else {
        // Product doesn't exist in the favorites list, add it
        const updatedProductIds = [...existingProductIds, favourite_id];
  
        await updateDoc(userRef, {
          product_ids: updatedProductIds,
        });
      }
    }
  };
  const deleteFromFavourite = async ( user_id , favourite_id  ) => {

  }


  const addSellerRating = async ( userId , fullName , email , ratingeDesc ,checkRemeber ,  sellerId ) => {

    setIsLoading(true);

    let idMaked = makeid(20);
    try {
      const ratings_sellers = await setDoc(doc(db, 'ratings_sellers', idMaked), 
      {
        user_id: userId,
        user_full_name: fullName,
        user_email: email,
        message: ratingeDesc,
        without_name : checkRemeber,
        seller_id: sellerId
      });
      setSucces("تمت إضافة التقييم بنجاح");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addProductRating = async ( userId , fullName , email   , ratingeHeadline , ratingeDesc ,checkRemeber ,  productId ) => {

    setIsLoading(true);

    let idMaked = makeid(20);
    try {
      const ratings_products = await setDoc(doc(db, 'ratings_products', idMaked), 
      {
        user_id: userId,
        user_full_name: fullName,
        user_email: email,
        user_rating: ratingeHeadline,
        message: ratingeDesc,
        without_name : checkRemeber,
        product_id: productId
      });
      setSucces("تمت إضافة التقييم بنجاح");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addDeliveryRating = async ( userId , fullName , email , ratingLike , ratingDisLike , checkRemeber ,  sellerId ) => {

    setIsLoading(true);

    let idMaked = makeid(20);
    try {
      const ratings_delivery = await setDoc(doc(db, 'ratings_delivery', idMaked), 
      {
        user_id: userId,
        user_full_name: fullName,
        user_email: email,
        rating_like: ratingLike,
        rating_dislike: ratingDisLike,
        without_name : checkRemeber,
        seller_id: sellerId
      });
      setSucces("تمت إضافة التقييم بنجاح");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addNewBooking =  async ( userFullName , userEmail , userId , bookingObject ) => {

    setIsLoading(true);

    let idMaked = makeid(20);
    try {
      const bookings = await setDoc(doc(db, 'bookings', idMaked), 
      {
        user_name: userFullName,
        user_email: userEmail,
        user_id: userId,
        booking: bookingObject

      });
      setSucces("تمت عملية الحجز بنجاح");
      setIsLoading(false);
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      
     setError("حدث خطأ في العملية");
     setIsLoading(false);
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }
 

  return (
    <AppContext.Provider
      value={{ 
        categoryArray,
        isLoading,
        error,
        setError,
        success,
        setSucces,
        accountType,
        setAccountType,
        uploadImage,
        setIsLoading,
        productAddArray,
        setProductAddArray,
        sendContactRequest,
        addProduct,
        setProductInfo,
        setProductAdditional,
        setProductImages,
        setProductLocation,
        searchProduct,
        allProducts,
        foundedProducts,
        setObjectLocation,
        objectLocation,
        setDraggableMarkerCoord,
        setProductLocationDetails,
        draggableMarkerCoord,
        findMyProducts,
        myFoundedProducts,
        myRentedProducts,
        findMyAddresses,
        findMyRented,
        myFoundedAddresses,
        editAddress,
        deleteRecord,
        addToFavourite,
        myTenantProducts,
        addAddress,
        editProduct,
        bookingProduct,
        setBookingProduct,
        addNewBooking,
        findMyBookings,
        addSellerRating,
        addProductRating,
        addDeliveryRating,
        deleteFromFavourite


       }}
    >
      {children}
    </AppContext.Provider>
  );
};
