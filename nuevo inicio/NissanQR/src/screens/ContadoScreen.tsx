import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const ContadoScreen = () => {
    const [contador, setContador] = useState(10);

    return (
        <View style={style.container} >
            <Text style={style.title}>
                Contador: {contador}
            </Text>
            <TouchableOpacity
                style={style.location}
                onPress={() => setContador(contador + 1)}
            >
                <View style={style.botton}>
                    <Text style={style.fabText}>+1</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.location2}
                onPress={() => setContador(contador - 1)}
            >
                <View style={style.botton}>
                    <Text style={style.fabText}>-1</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        top: -15
    },
    location:{
        position: 'absolute',
        bottom: 25,
        right: 25
    },
    location2:{
        position: 'absolute',
        bottom: 25,
        left: 25
    },
    botton: {
        backgroundColor: 'blue',
        borderRadius: 100,
        width: 60,
        height:60,
        justifyContent:'center'
    },
    fabText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
