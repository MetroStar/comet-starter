import { mockData } from '@src/data/spacecraft';
import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import { DashboardBarChart } from './dashboard-bar-chart';

describe('DashboardBarChart', () => {
  test('should render successfully', async () => {
    const { baseElement } = render(
      <Provider>
        <BrowserRouter>
          <DashboardBarChart items={mockData.items} />
        </BrowserRouter>
      </Provider>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.VictoryContainer')).toBeDefined();
  });
});
