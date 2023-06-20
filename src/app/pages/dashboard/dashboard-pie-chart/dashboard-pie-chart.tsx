import React, { useEffect, useState } from 'react';
import { PieChart } from '@metrostar/comet-data-viz';
import { Launch } from '../../../api/types';

interface ChartData {
  x: string;
  y: number;
}

interface DashboardPieChartProps {
  items: Launch[] | undefined;
}

export const DashboardPieChart = ({ items }: DashboardPieChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      let status3 = 0;
      let status4 = 0;
      items.forEach((item: Launch) => {
        if (item.status.id === 3) {
          status3++;
        } else if (item.status.id === 4) {
          status4++;
        }
      });
      newData.push({ x: 'Success', y: status3 });
      newData.push({ x: 'Failure', y: status4 });
      setData(newData);
    }
  }, [items]);

  return (
    <div
      style={{
        height: '300px',
        width: '400px',
      }}
    >
      <PieChart
        title="Launch Success/Failure Pie Chart"
        innerRadius={60}
        width={375}
        height={300}
        data={data}
        colors={['#0d7ea2', '#cd425b']}
      />
    </div>
  );
};
