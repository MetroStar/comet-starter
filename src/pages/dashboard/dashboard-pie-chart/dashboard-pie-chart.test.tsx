import { mockData } from '@src/data/spacecraft';
import { act, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPieChart } from './dashboard-pie-chart';

describe('DashboardPieChart', () => {
  test('should render successfully', async () => {
    const { baseElement } = render(
      <Provider>
        <BrowserRouter>
          <DashboardPieChart items={mockData.items} />
        </BrowserRouter>
      </Provider>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.VictoryContainer')).toBeDefined();
  });
});
