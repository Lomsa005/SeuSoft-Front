import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import firstBox from "media/firstBox.png";
import secondBox from "media/secondBox.png";
import thirdBox from "media/thirdBox.png";
import fourthBox from "media/fourthBox.png";
import PropTypes from "prop-types"
import sphereee from "media/sphereee.gif";


const DataContext = createContext();
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const localImages = [sphereee];

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
          const processedData = boxesResponse.data.data.map((box, index) => ({
            ...box,
            image: index < 4 ? localImages[0] : localImages[0],
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
