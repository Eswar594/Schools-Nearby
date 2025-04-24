import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import API from '../api';

function AddSchoolForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/addSchool', formData);
      toast({
        title: 'Success',
        description: res.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({ name: '', address: '', latitude: '', longitude: '' });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add school',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.50" p={6} borderRadius="md" shadow="md" w="100%">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>School Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Textarea name="address" value={formData.address} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Latitude</FormLabel>
            <Input name="latitude" type="number" value={formData.latitude} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Longitude</FormLabel>
            <Input name="longitude" type="number" value={formData.longitude} onChange={handleChange} />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="100%">
            Add School
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AddSchoolForm;
