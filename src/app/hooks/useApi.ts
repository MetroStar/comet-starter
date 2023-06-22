import { useState } from 'react';
import { Launch } from '../api/types';
import axios from '../api/axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Launch[]>();
  const [item, setItem] = useState<Launch>();
  const [error, setError] = useState<string | null>(null);

  const getItems = (): void => {
    setLoading(true);
    axios
      .get(`/?format=json`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setItems(data.results);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getItem = (id: string): void => {
    setLoading(true);
    axios
      .get(`/${id}/?format=json`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    items,
    item,
    error,
    getItems,
    getItem,
  };
};

export default useApi;
