import { mockData } from '@src/data/case';
import { Case } from '@src/types/case';
import axios from '@src/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getCases = async (): Promise<Case[]> => {
  // const response = await axios.get('/cases');
  // return response.data;

  return Promise.resolve(
    mockData.items.filter(
      (item) => item.status !== 'Approved' && item.status !== 'Denied',
    ),
  );
};

const searchCases = async (query: string): Promise<Case[]> => {
  // const response = await axios.get(`/cases?q=${query}`);
  // return response.data;

  return Promise.resolve(
    mockData.items.filter(
      (item) =>
        item.applicant.last_name.toLowerCase().includes(query) ||
        item.applicant.first_name.toLowerCase().includes(query) ||
        item.applicant.email?.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    ),
  );
};

const getCase = async (id: number): Promise<Case> => {
  // const response = await axios.get(`/cases/${id}`);
  // return response.data;

  return Promise.resolve(mockData.items.filter((item) => item.id === id)[0]);
};

const createCase = async (newUser: Case): Promise<Case> => {
  const response = await axios.post('/cases', newUser);
  return response.data;
};

const updateCase = async ({ id, ...updates }: Case): Promise<Case> => {
  // const response = await axios.put(`/cases/${id}`, updates);
  // return response.data;

  return Promise.resolve({ id, ...updates } as Case);
};

const deleteCase = async (id: number): Promise<number> => {
  const response = await axios.delete(`/cases/${id}`);
  return response.data;
};

const useCasesApi = () => {
  const queryClient = useQueryClient();

  const casesQuery = useQuery({
    queryKey: ['cases'],
    queryFn: getCases,
  });

  const searchCasesQuery = (query: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['cases', query],
      queryFn: () => searchCases(query),
    });

  const caseQuery = (id: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['cases', id],
      queryFn: () => getCase(id),
    });

  const createMutation = useMutation({
    mutationFn: createCase,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cases'] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateCase,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cases'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCase,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cases'] }),
  });

  return {
    getCases: casesQuery,
    searchCases: searchCasesQuery,
    getCase: caseQuery,
    createCase: createMutation,
    updateCase: updateMutation,
    deleteCase: deleteMutation,
  };
};

export default useCasesApi;
