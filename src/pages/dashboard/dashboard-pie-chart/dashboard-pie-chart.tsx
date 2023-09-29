import { PieChart } from '@metrostar/comet-data-viz';
import { Spacecraft } from '@src/types/spacecraft';
import React, { useEffect, useState } from 'react';
import { ChartData } from '../types';

interface DashboardPieChartProps {
  items: Spacecraft[] | undefined;
}

export const DashboardPieChart = ({
  items,
}: DashboardPieChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>();
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      const set = new Set<string>();
      items.forEach((item: Spacecraft) => {
        set.add(item.affiliation);
      });

      set.forEach((name: string) => {
        const total = items.filter(
          (item: Spacecraft) => item.affiliation === name,
        ).length;
        newData.push({ x: name.replace('Affiliation ', ''), y: total });
      });
      setData(newData);
    }
  }, [items]);

  return data ? (
    <div
      style={{
        height: '300px',
        width: '400px',
      }}
    >
      <PieChart
        title="Spacecraft Affiliation Pie Chart"
        innerRadius={60}
        width={375}
        height={300}
        data={data}
        colors={['#0d7ea2', '#cd425b']}
      />
    </div>
  ) : (
    <></>
  );
};
