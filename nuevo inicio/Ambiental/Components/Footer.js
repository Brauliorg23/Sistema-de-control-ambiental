import React from "react";
import { HStack, IconButton, Icon, Box, StatusBar,Image } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

export default function Footer(){
  return (
    <>
        <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

        <Box safeAreaTop backgroundColor="#6200ee" />

        <HStack bg='muted.400' px="1" py="3" justifyContent='space-between' alignItems='center'>
          <HStack space="4" alignItems='center'>
           
            <Image
              source={require('../blanco.png')}
              alt="Alternate Text"
              width={170}
              height={50}
              resizeMode={"contain"}
              alignSelf="center"
            />
          </HStack>
          <HStack space="2">            
            <IconButton icon={<Icon as={<MaterialIcons name='notifications-active' />} size='sm' color="white" />} />
          </HStack>
        </HStack>

    </>
  )
}