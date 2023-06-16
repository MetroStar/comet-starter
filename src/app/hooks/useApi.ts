import { useState } from 'react';
import { Launch } from '../api/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Launch[]>();
  const [item, setItem] = useState<Launch>();

  const getItems = async (): Promise<void> => {
    setLoading(true);
    await fetch(`/api/?format=json`)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        setLoading(false);
        setItems(json.results);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getItem = async (id: string): Promise<void> => {
    setLoading(true);
    await fetch(`/api/${id}/?format=json`)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        setLoading(false);
        setItem(json);
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
