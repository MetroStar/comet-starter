import { mockData } from '@src/data/spacecraft';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DashboardPieChart } from './dashboard-pie-chart';

describe('DashboardPieChart', () => {
  test('should render successfully', async () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardPieChart items={mockData.items} />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.VictoryContainer')).toBeDefined();
  });
});
