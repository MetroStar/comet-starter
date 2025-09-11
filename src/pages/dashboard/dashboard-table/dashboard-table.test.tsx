import { caseData } from '@src/data/cases';
import { act, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom';
import { DashboardTable } from './dashboard-table';

describe('DashboardTable', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <Provider>
        <BrowserRouter>
          <DashboardTable items={[]} />
        </BrowserRouter>
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('should render with mock data', async () => {
    const { baseElement } = render(
      <Provider>
        <BrowserRouter>
          <DashboardTable items={caseData.items} />
        </BrowserRouter>
      </Provider>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.data-table')).toBeDefined();
    expect(
      baseElement.querySelectorAll('.data-table > tbody > tr'),
    ).toHaveLength(10);
  });
});
