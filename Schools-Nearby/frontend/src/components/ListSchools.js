import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import API from '../api';

function ListSchools() {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [schools, setSchools] = useState([]);
  const toast = useToast();

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const fetchSchools = async () => {
    // Validate latitude and longitude
    if (!location.latitude || !location.longitude) {
      toast({
        title: 'Error',
        description: 'Please enter both latitude and longitude',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Ensure latitude and longitude are numbers
    const lat = parseFloat(location.latitude);
    const lon = parseFloat(location.longitude);

    if (isNaN(lat) || isNaN(lon)) {
      toast({
        title: 'Error',
        description: 'Please enter valid numbers for latitude and longitude',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Fetch nearby schools
      const res = await API.get('/listSchools', {
        params: {
          latitude: lat,
          longitude: lon,
        },
      });

      // Check if response contains valid data
      if (res.data && Array.isArray(res.data)) {
        setSchools(res.data);
      } else {
        toast({
          title: 'No schools found',
          description: 'No schools found near the provided location',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
      toast({
        title: 'Error',
        description: 'Could not fetch schools',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.50" p={6} borderRadius="md" shadow="md" w="100%">
      <VStack spacing={4}>
        <Input
          placeholder="Latitude"
          name="latitude"
          value={location.latitude}
          onChange={handleChange}
          type="number"
          isRequired
        />
        <Input
          placeholder="Longitude"
          name="longitude"
          value={location.longitude}
          onChange={handleChange}
          type="number"
          isRequired
        />
        <Button colorScheme="blue" onClick={fetchSchools} width="100%">
          Get Nearby Schools
        </Button>

        <List spacing={4} w="100%">
          {schools.map((school, idx) => (
            <ListItem
              key={idx}
              p={4}
              bg="white"
              shadow="sm"
              borderRadius="md"
              borderLeft="4px solid blue"
            >
              <Text fontSize="lg" fontWeight="bold">{school.name}</Text>
              <Text>{school.address}</Text>
              <Text color="gray.500">Distance: {school.distance.toFixed(2)} km</Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default ListSchools;
