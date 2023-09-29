import { mockData } from '@src/data/spacecraft';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DashboardTable } from './dashboard-table';

describe('DashboardTable', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardTable items={[]} />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('should render with mock data', async () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardTable items={mockData.items} />
        </BrowserRouter>
      </RecoilRoot>,
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
