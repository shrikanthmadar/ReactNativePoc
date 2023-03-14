import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import Bottomnavbar from './bottom-navbar/BottomBar';
import Camerafn from './camera/camera';
import { decrement, increment } from './feature/counterSlice';
import {setInitialState,latestData }from './feature/gallerySlice';
//import Camera from './camera/camera';
import Gallery from './gallery/gallery';
import Topnavbar from './top-navbar/TopBar';

const Home = ({ navigation }: any) => {
    const data = useSelector((state:any)=>state?.counter?.value);
    const galleryData =useSelector((state:any)=>state?.gallery?.value);
    console.log(galleryData,"home.tsx")
    const dispatch= useDispatch();
//dispatch(setInitialState(latestData))
    const [isphoto, setIsPhoto] = useState<boolean>(false);

    // useEffect(()=>{
    //     dispatch(setInitialState());
    // },data)

    return (


        <View style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
        }}>

            <View style={{
                height: 'auto',
                display: 'flex'
            }}>

            </View>
            <ScrollView style={{ height: 'auto' }}>
                <Gallery navigation={navigation} />
            </ScrollView>
            <View style={{ height: 'auto' }}>
                <Bottomnavbar navigation={navigation} />

            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 2,
        height: '50%',
        width: '50%'
    }
});

export default Home;