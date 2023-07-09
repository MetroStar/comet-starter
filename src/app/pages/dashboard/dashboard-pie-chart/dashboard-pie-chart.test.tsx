import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPieChart } from './dashboard-pie-chart';
import { RecoilRoot } from 'recoil';
import { launchData } from '../../../data/launch';

describe('DashboardPieChart', () => {
  test('should render successfully', async () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardPieChart items={launchData} />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.VictoryContainer')).toBeDefined();
  });
});
