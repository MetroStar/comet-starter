import { mockData } from '@src/data/spacecraft';
import { Spacecraft } from '@src/types/spacecraft';
import axios from '@src/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getItems = async (): Promise<Spacecraft[]> => {
  // const response = await axios.get('/spacecraft');
  // return response.data;

  return Promise.resolve(mockData.items);
};

const searchItems = async (query: string): Promise<Spacecraft[]> => {
  // const response = await axios.get(`/spacecraft?q=${query}`);
  // return response.data;

  return Promise.resolve(
    mockData.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.affiliation?.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    ),
  );
};

const getItem = async (id: number): Promise<Spacecraft> => {
  // const response = await axios.get(`/spacecraft/${id}`);
  // return response.data;

  return Promise.resolve(mockData.items.filter((item) => item.id === id)[0]);
};

const createItem = async (newUser: Spacecraft): Promise<Spacecraft> => {
  const response = await axios.post('/spacecraft', newUser);
  return response.data;
};

const updateItem = async ({
  id,
  ...updates
}: Spacecraft): Promise<Spacecraft> => {
  const response = await axios.put(`/spacecraft/${id}`, updates);
  return response.data;
};

const deleteItem = async (id: number): Promise<number> => {
  const response = await axios.delete(`/spacecraft/${id}`);
  return response.data;
};

const useSpacecraftApi = () => {
  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: ['spacecraft'],
    queryFn: getItems,
  });

  const searchItemsQuery = (query: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['spacecraft', query],
      queryFn: () => searchItems(query),
    });

  const itemQuery = (id: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['spacecraft', id],
      queryFn: () => getItem(id),
    });

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['spacecraft'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['spacecraft'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['spacecraft'] }),
  });

  return {
    getItems: itemsQuery,
    searchItems: searchItemsQuery,
    getItem: itemQuery,
    createItem: createMutation,
    updateItem: updateMutation,
    deleteItem: deleteMutation,
  };
};

export default useSpacecraftApi;
