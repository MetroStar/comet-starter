import { mockData } from '@src/data/case';
import { act, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom';
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
