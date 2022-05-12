import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Background } from '../Components/Background'
import { WhiteLogo } from '../Components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'

export const LoginScreen = () => {
  return (
    <>
      <Background/>

        <View style={loginStyles.formContainer}>
        <WhiteLogo/>

        <Text style={loginStyles.tittle}>Login</Text>
        <Text style={loginStyles.label}>Email</Text>
        <TextInput
          placeholder="Ingrese su email:"
          keyboardType="email-address"
          underlineColorAndroid="white"

          autoCapitalize= "none"
          autoCorrect={false}
        />
        <Text style={loginStyles.label}>Contraseña</Text>
        <TextInput
          placeholder="Ingrese su contraseña:"
          underlineColorAndroid="white"

          autoCapitalize= "none"
          autoCorrect={false}
        />

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Iniciar secion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

