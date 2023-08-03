import axios from '@src/utils/axios';
import { useCallback, useState } from 'react';
import { Launch } from '../types/launch';

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Launch[]>();
  const [item, setItem] = useState<Launch>();
  const [error, setError] = useState<string | null>(null);

  const getItems = useCallback((): void => {
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
  }, []);

  const getItem = useCallback((id: string): void => {
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
  }, []);

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
