import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from "react";



const Bottomnavbar = ({navigation}:any) => { 

  return (
    <Button title='add new photo' onPress={() => { navigation.navigate('Camera'); }}/>    
  )
}

export default Bottomnavbar