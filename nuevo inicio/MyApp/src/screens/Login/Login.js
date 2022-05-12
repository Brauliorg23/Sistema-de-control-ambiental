import React from "react";
import { Image, Center, NativeBaseProvider } from "native-base";

const img = require ( '../../../assets/Imagenes/Ambien.png' ) ; 

function Example() {
  return <Center>
      <Image 
        size={150} 
        resizeMode={"contain"} 
        borderRadius={100} 
        source={require('../../../assets/Imagenes/Ambien.png')} 
        alt="Alternate Text" 
    />
    </Center>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    