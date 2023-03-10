//import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, Image, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';



const Camerafn = (props: any) => {
    const { setIsPhoto ,navigation} = props
    
    let cameraRef = useRef<Camera>(null);
    const [hasCameraPermisson, setHasCameraPermission] = useState<Boolean>();
    const [tag, onChangeTag] = React.useState('');
    //const [isphoto, setIsPhoto] = useState<boolean>(false);
    const devices = useCameraDevices('telephoto-camera');
    const [photo, setPhoto] = useState<any>();
    const [camView, setCamView] = useState<string>('back')
    const [available ,setAvailable]=useState(false);
    const device = devices.back;

    //const navigation=useNavigation<any>();
    useEffect(() => {
        //navigator.geolocation.getCurrentPosition
        const fetchData = async () => {
            const status = await Camera.getCameraPermissionStatus();
            if (status === "authorized") {
                setHasCameraPermission(true)
            } else { Camera.requestCameraPermission(); }

        }
        fetchData();
    }, [devices, hasCameraPermisson, device])   

    const pickPhoto = async () => {


        let newPhoto = await cameraRef.current?.takePhoto({
            qualityPrioritization: 'quality',
            flash: 'on',
            enableAutoRedEyeReduction: true,
        });
        setPhoto(newPhoto);
        const savedData = await AsyncStorage.getItem("appData");
        const isPicOfTheDayAvailable = JSON.parse(savedData ? savedData : '[]')?.filter((pic: any) =>
            pic.date === new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
        ).length > 0;        
        navigation.navigate('PreviewPhoto',{available:isPicOfTheDayAvailable ,photo:{path:newPhoto?.path,notes:""},isPreView:true});

    }

    const reTakePhoto = async () => {
        setIsPhoto(false);
    }

    if (hasCameraPermisson === undefined) {
        Camera.requestCameraPermission();
        return <Text>Requesting Permissons...!</Text>
    } else if (!hasCameraPermisson) {
        return <Text>please provide access for the camera</Text>
    } else if (device == null) {
        return <View style={styles.container}><ActivityIndicator style={{ flex: 1 }} size={50} color="red" /></View>
    }

    return (

        <>
            <Camera style={styles.container}
                {...props}
                device={device}
                photo={true}
                isActive={true}
                ref={cameraRef} />
            <Button title="Take pic" onPress={pickPhoto} />
        </>


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
    preViewContainer: {
        height: '100%',
        width: '100%'
    },
    preview: {
        //alignSelf: 'stretch',
        //flex: 1,
        height: '50%',
        width: '100%'
    }
});

export default Camerafn