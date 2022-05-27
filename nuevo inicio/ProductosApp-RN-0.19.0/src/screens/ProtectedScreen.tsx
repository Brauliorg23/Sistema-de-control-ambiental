import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { RNCamera } from 'react-native-camera';

export const ProtectedScreen = () => {

    

const { user, token, logOut } = useContext( AuthContext );
    
    return (
        <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        >
        </RNCamera>
       </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }
});