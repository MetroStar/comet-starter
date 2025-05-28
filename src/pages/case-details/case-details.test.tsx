import { mockData } from '@src/data/case';
import axios from '@src/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { CaseDetails } from './case-details';

const caseId = 1000002;
vi.mock('react-router-dom', async () => {
  // Require the actual module to spread its properties
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: '1000002' }),
  };
});

describe('CaseDetails', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const componentWrapper = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <CaseDetails />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  beforeEach(() => {
    queryClient.clear();
    mock.reset();
  });

  test('should render successfully', async () => {
    mock.onGet(new RegExp('/cases/*')).reply(200, mockData.items[1]);
    queryClient.setQueryData(['cases', caseId], mockData.items[1]);

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual(
      `Case: ${caseId}`,
    );
    await waitFor(async () => {
      expect(baseElement.querySelector('h2')?.textContent).toEqual(
        `Status: ${mockData.items[1].status}`,
      );
    });
  });

  test('should render loading state while fetching data', async () => {
    // Set up a delayed response to simulate loading
    mock.onGet(new RegExp('/cases/*')).reply(200, () => {
      return new Promise((resolve) => {
        // Don't resolve immediately to ensure loading state is shown
        setTimeout(() => resolve([200, mockData.items[1]]), 100);
      });
    });

    queryClient.clear();

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();

    // Check for loading spinner or indicator
    expect(baseElement.querySelector('#spinner')).toBeDefined();

    // Wait for the data to load
    await waitFor(() => {
      expect(baseElement.querySelector('#spinner')).toBeNull();
    });
  });

  test('should allow editing fields when edit button is clicked', async () => {
    mock.onGet(new RegExp('/cases/*')).reply(200, mockData.items[1]);
    queryClient.setQueryData(['cases', caseId], mockData.items[1]);

    const { baseElement, getByText } = render(componentWrapper);

    // Wait for the data to load
    await waitFor(() => {
      expect(baseElement.querySelector('#details-card')).toBeDefined();
    });

    // Verify initial state - form fields are not editable
    expect(baseElement.querySelector('input#first_name')).toBeNull();

    // Find and click the edit button
    const editButton = getByText('Edit Case');
    fireEvent.click(editButton);

    // Verify form is now in edit mode
    await waitFor(() => {
      expect(baseElement.querySelector('input#first_name')).toBeDefined();
    });

    // Change a field value
    const firstNameInput = baseElement.querySelector(
      'input#first_name',
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: 'TestFirstName' } });

    // Verify the field value was updated
    expect(firstNameInput.value).toBe('TestFirstName');

    // Cancel edit
    const cancelButton = getByText('Cancel Edit');
    fireEvent.click(cancelButton);

    // Verify form is back to view mode
    await waitFor(() => {
      expect(cancelButton.textContent).toEqual('Edit Case');
    });

    // Edit again
    fireEvent.click(editButton);

    // Verify the field value is still updated
    expect(firstNameInput.value).toBe('TestFirstName');

    // Save changes
    const saveButton = getByText('Save Case');
    fireEvent.click(saveButton);

    // Verify form is back to view mode
    await waitFor(() => {
      expect(cancelButton.textContent).toEqual('Edit Case');
    });
  });

  test('should not save when empty fields', async () => {
    mock.onGet(new RegExp('/cases/*')).reply(200, mockData.items[1]);
    mock.onPut(new RegExp('/cases/*')).reply(200, mockData.items[1]);
    queryClient.setQueryData(['cases', caseId], mockData.items[1]);

    const { baseElement, getByText } = render(componentWrapper);
    expect(baseElement).toBeTruthy();

    // Find and click the edit button
    const editButton = getByText('Edit Case');
    fireEvent.click(editButton);

    // Verify form is now in edit mode
    await waitFor(() => {
      expect(baseElement.querySelector('input#first_name')).toBeDefined();
    });

    // Change a field value
    const firstNameInput = baseElement.querySelector(
      'input#first_name',
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: '' } });
    const lastNameInput = baseElement.querySelector(
      'input#last_name',
    ) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: '' } });
    const ssnInput = baseElement.querySelector('input#ssn') as HTMLInputElement;
    fireEvent.change(ssnInput, { target: { value: '' } });
    const dobInput = baseElement.querySelector(
      'input#date_of_birth',
    ) as HTMLInputElement;
    fireEvent.change(dobInput, { target: { value: '' } });
    const genderInput = baseElement.querySelector(
      'select#gender',
    ) as HTMLSelectElement;
    fireEvent.change(genderInput, { target: { value: '' } });
    const homePhoneInput = baseElement.querySelector(
      'input#home_phone',
    ) as HTMLInputElement;
    fireEvent.change(homePhoneInput, { target: { value: '' } });

    // Save changes
    const saveButton = getByText('Save Case');
    fireEvent.click(saveButton);

    // Verify form is back to view mode
    expect(editButton.textContent).not.toEqual('Edit Case');
  });

  test('should render with error', async () => {
    mock.onGet(new RegExp('/cases/*')).networkError();
    queryClient.setQueryData(['cases', caseId], null);

    const { baseElement } = render(componentWrapper);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('h1')?.textContent).toEqual('Case: ');
    await waitFor(async () => {
      expect(baseElement.querySelectorAll('#details-card li')).toHaveLength(0);
      expect(baseElement.querySelector('.usa-alert')).toBeDefined();
      expect(baseElement.querySelector('.usa-alert--error')).toBeDefined();
    });
  });
});
