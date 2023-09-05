import { View, Text } from 'react-native'
import React from 'react'

const NotificationComponent = () => {
  return (
    <View className="bg-white shadow-lg rounded-lg p-4 min-w-full  mt-5" >
    <View className="block relative mt-5 py-2" >
    <View className="flex-col items-start px-2" >
        <Text className="text-xl font-bold" > تم قبول طلبك </Text>
        <Text className="text-sm mt-3 text-gray-500" >  وصلتك الموافقة على قبول الطلب الخاص بك </Text>

    </View>
    <View className="absolute top-0 right-0" >
        <Text className="text-sm text-gray-500 " > 5 دقائق </Text>
    </View>
    </View>
    </View>
  )
}

export default NotificationComponent