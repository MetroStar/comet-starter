import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardTable } from './dashboard-table';
import { RecoilRoot } from 'recoil';
import { launchData } from '../../../data/launch';

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
          <DashboardTable items={launchData} />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector('.usa-table')).toBeDefined();
    expect(baseElement.querySelectorAll('.usa-table > tbody > tr')).toHaveLength(5);
  });
});
