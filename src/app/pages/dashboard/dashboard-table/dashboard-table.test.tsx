import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardTable } from './dashboard-table';
import { RecoilRoot } from 'recoil';
import { launchData } from '../../../api/__mocks__/launch';

describe('DashboardTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardTable items={[]} />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render with mock data', async () => {
    await act(async () => {
      const { baseElement } = render(
        <RecoilRoot>
          <BrowserRouter>
            <DashboardTable items={launchData} />
          </BrowserRouter>
        </RecoilRoot>,
      );
      expect(baseElement).toBeTruthy();
    });
  });
});
