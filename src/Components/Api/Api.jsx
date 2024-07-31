import { useState, useEffect } from 'react';
import axios from 'axios';

const useContactData = () => {
  const [contactData, setContactData] = useState({
    title: '',
    address: '',
    email: '',
    number: '',
    fb: '',
    ig: '',
    twitter: '',
    in: '',
    copyright: '',
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/contacts');
        if (response.data && response.data.data && response.data.data.length > 0) {
          setContactData(response.data.data[0]);
        } else {
          console.error('No contact data received');
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  return contactData;
};

export default useContactData;