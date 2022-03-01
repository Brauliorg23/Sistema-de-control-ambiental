import * as React from 'react';
import {  MaterialIcons,FontAwesome5, } from '@expo/vector-icons';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Icon,
  Input,
  Button,
  Image,
  Flex,
  Divider,
  useColorModeValue,
  useColorMode,
  Switch,
} from "native-base"



export default function Login  ()  {
  const { toggleColorMode } = useColorMode()
  
  return (
    <Box safeArea p="2" py="4" w="95%" maxW="450" bg={useColorModeValue("warmGray.50", "coolGray.800")} borderRadius={10}>
      <Switch onPress={toggleColorMode} defaultIsChecked colorScheme="emerald" />
      <Flex direction="row" p="4" alignSelf="center">
        <Image
          source={require('../imagenes/Nissan-Logo.png')}
          alt="Alternate Text"
          size="xl"
          borderRadius={500}
          resizeMode={"contain"}
          alignSelf="center"
        />
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <Image
          source={require('../imagenes/humming.png')}
          alt="Alternate Text"
          size="xl"
          borderRadius={500}
          resizeMode={"contain"}
          alignSelf="center"
        />
      </Flex>
      <Heading
        size="lg"
        fontWeight="600"
        alignSelf="center"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        
      >
        CONTROL AMBIENTAL
      </Heading>
      <VStack space={3} mt="5">
        <Divider />
        <FormControl>
          <FormControl.Label>Usuario</FormControl.Label >
          <Input  InputLeftElement={
            <Icon
                mb="1"
                as={<FontAwesome5 name="id-badge" />}
                color="black"
                size="sm"
              />
          }/>
        </FormControl>
        <Divider />
        <FormControl>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input type="password" InputLeftElement={
            <Icon
                mb="1"
                as={<MaterialIcons name="lock" />}
                color="black"
                size="sm"
              />
          } />
        </FormControl>
        <Button mt="2" colorScheme="green">
          Sign in
        </Button>
        
      </VStack>

      
    </Box>

    
  );
}

