import { caseData } from '@src/data/cases';
import { Case, CaseSearchFilters } from '@src/types';
import axios from '@src/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getCases = async (): Promise<Case[]> => {
  // const response = await axios.get('/cases');
  // return response.data.items;

  return Promise.resolve(
    caseData.items.filter(
      (item) => item.status !== 'Approved' && item.status !== 'Denied',
    ),
  );
};

const searchCases = async (filters: CaseSearchFilters): Promise<Case[]> => {
  return Promise.resolve(
    caseData.items.filter((item) => {
      // Simple search logic
      if (filters.q) {
        const q = filters.q.toLowerCase();
        if (
          !(
            item.id.toString().includes(q) ||
            item.applicant.last_name.toLowerCase().includes(q) ||
            item.applicant.first_name.toLowerCase().includes(q) ||
            item.applicant.email?.toLowerCase().includes(q)
          )
        ) {
          return false;
        }
      }
      // Advanced filters
      if (filters.id && !item.id.toString().includes(filters.id)) return false;
      if (
        filters.gender &&
        filters.gender.length > 0 &&
        !filters.gender.includes(item.applicant.gender)
      )
        return false;
      if (
        filters.status &&
        filters.status.length > 0 &&
        !filters.status.includes(item.status)
      )
        return false;
      if (
        filters.created_before &&
        new Date(item.created_at) >= new Date(filters.created_before)
      )
        return false;
      if (
        filters.created_after &&
        new Date(item.created_at) <= new Date(filters.created_after)
      )
        return false;
      return true;
    }),
  );
};

const getCase = async (id: number): Promise<Case> => {
  // const response = await axios.get(`/cases/${id}`);
  // return response.data;

  return Promise.resolve(caseData.items.filter((item) => item.id === id)[0]);
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

  const searchCasesQuery = (filters: CaseSearchFilters) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['cases', filters],
      queryFn: () => searchCases(filters),
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
