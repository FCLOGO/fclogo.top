import React from "react"
import { Button, ChakraProvider } from "@chakra-ui/react";
import { theme } from '../@chakra-ui/theme'
 
export default function Home() {
  return (
    <div>
      <p>Hello, World!</p>
      <ChakraProvider theme={theme}>
      <Button colorScheme="brand.100">Click me</Button>
      </ChakraProvider>
    </div>
  )
}
