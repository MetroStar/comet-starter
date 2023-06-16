import { useState } from 'react';
import { Launch } from '../api/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Launch[]>();
  const [item, setItem] = useState<Launch>();

  const getItems = async (): Promise<void> => {
    setLoading(true);
    const url = '/api/launch/?format=json';
    await fetch(url)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        setLoading(false);
        setItems(json.results);
      });
  };

  const getItem = async (id: string): Promise<void> => {
    setLoading(true);
    const url = `/api/launch/${id}?format=json`;
    await fetch(url)
      .then(async (response) => {
        return await response.json();
      })
      .then((json) => {
        setLoading(false);
        setItem(json);
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
