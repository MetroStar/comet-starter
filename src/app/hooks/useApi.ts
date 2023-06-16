import { useState } from 'react';
import { Launch } from '../api/types';
import axios from '../api/axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Launch[]>();
  const [item, setItem] = useState<Launch>();

  const getItems = async (): Promise<void> => {
    setLoading(true);
    await axios
      .get(`/?format=json`)
      .then(async (response) => {
        return await response.data;
      })
      .then((data) => {
        setLoading(false);
        setItems(data.results);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getItem = async (id: string): Promise<void> => {
    setLoading(true);
    await axios
      .get(`/${id}/?format=json`)
      .then(async (response) => {
        return await response.data;
      })
      .then((data) => {
        setLoading(false);
        setItem(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return {
    loading,
    items,
    item,
    getItems,
    getItem,
  };
};

export default useApi;
