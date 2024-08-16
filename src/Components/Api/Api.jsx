import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from "prop-types"
import sphere from "media/sphere.gif";


const DataContext = createContext();
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const localImages = [sphere];

export const DataProvider = ({ children }) => {
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
  const [boxesData, setBoxesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactResponse, boxesResponse] = await Promise.all([
          axios.get(`${apiEndpoint}/contacts`),
          axios.get(`${apiEndpoint}/show-links`)
        ]);

        if (contactResponse.data && contactResponse.data.data && contactResponse.data.data.length > 0) {
          setContactData(contactResponse.data.data[0]);
        } else {
          console.error('No contact data received');
        }

        if (boxesResponse.data) {
          const processedData = boxesResponse.data.data.map((box) => ({
            ...box,
            image: localImages[0],
            isimage: box.bodyEn === null || box.bodyGe === null 
          }));
          setBoxesData(processedData);
        } else {
          console.error('No boxes data received or invalid format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ contactData, boxesData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

DataProvider.propTypes = {
  children: PropTypes.node,
};
