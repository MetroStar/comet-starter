import { PieChart } from '@metrostar/comet-data-viz';
import { Case } from '@src/types/case';
import React, { useEffect, useState } from 'react';
import { ChartData } from '../types';
import './dashboard-pie-chart.scss';

interface DashboardPieChartProps {
  items: Case[] | undefined;
}

export const DashboardPieChart = ({
  items,
}: DashboardPieChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>();
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      const set = new Set<string>();
      items.forEach((item: Case) => {
        set.add(item.status);
      });

      set.forEach((name: string) => {
        const total = items.filter((item: Case) => item.status === name).length;
        newData.push({ x: name.replace('Status ', ''), y: total });
      });
      setData(newData);
    }
  }, [items]);

  return data ? (
    <div className="pie-chart-container">
      <PieChart
        title="Cases by Status Pie Chart"
        innerRadius={90}
        data={data}
        colors={['#0d7ea2', '#cd425b']}
      />
    </div>
  ) : (
    <></>
  );
};
