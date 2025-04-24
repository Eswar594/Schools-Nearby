import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  VStack,
  Container,
  extendTheme,
} from '@chakra-ui/react';
import AddSchoolForm from './components/AddSchoolForm';
import ListSchools from './components/ListSchools';

const theme = extendTheme({
  fonts: {
    heading: `'Segoe UI', sans-serif`,
    body: `'Segoe UI', sans-serif`,
  },
});

function App() {
  const [showAddSchool, setShowAddSchool] = useState(true);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" py={10}>
        <Box textAlign="center" mb={8}>
          <Heading size="xl" color="blue.800">
            School Management System
          </Heading>
        </Box>

        <VStack spacing={6}>
          <Heading size="lg" color="blue.700">
            {showAddSchool ? 'Add a New School' : 'Nearby Schools'}
          </Heading>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => setShowAddSchool(!showAddSchool)}
            width="100%"
          >
            {showAddSchool ? 'View Nearby Schools' : 'Add New School'}
          </Button>
          {showAddSchool ? <AddSchoolForm /> : <ListSchools />}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
