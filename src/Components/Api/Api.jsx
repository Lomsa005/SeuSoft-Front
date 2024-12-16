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

  // Define default boxes data
  const defaultBoxesData = [
    { id: 1, titleEn: 'product', titleGe: 'პროდუქტი', bodyEn: 'Content 1', bodyGe: 'Content 1', image: localImages[0], isimage: false },
    { id: 2, titleEn: 'Box 2', titleGe: 'Box 2', bodyEn: 'Content 2', bodyGe: 'Content 2', image: localImages[0], isimage: false },
    { id: 3, titleEn: 'Box 3', titleGe: 'Box 3', bodyEn: 'Content 3', bodyGe: 'Content 3', image: localImages[0], isimage: false },
    { id: 4, titleEn: 'Box 4', titleGe: 'Box 4', bodyEn: 'Content 4', bodyGe: 'Content 4', image: localImages[0], isimage: false },
  ];

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

        if (boxesResponse.data && boxesResponse.data.data) {
          const processedData = boxesResponse.data.data.map((box) => ({
            ...box,
            image: localImages[0],
            isimage: box.bodyEn === null || box.bodyGe === null 
          }));

          // Check if the processed data length is less than 4 and fill with default data
          if (processedData.length < 4) {
            const filledData = [...processedData, ...defaultBoxesData.slice(processedData.length)];
            setBoxesData(filledData);
          } else {
            setBoxesData(processedData);
          }
        } else {
          console.error('No boxes data received or invalid format');
          // Set default boxes data if no data is received
          setBoxesData(defaultBoxesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set default boxes data in case of error
        setBoxesData(defaultBoxesData);
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
