import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { Launch } from '../../api/types';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const { getItems, items, loading } = useApi();
  const [data, setData] = useState<Launch[] | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      getItems().catch((error) => {
        console.log(error);
      });
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (items) {
      setData(items);
      console.log(items);
    }
  }, [items]);
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>My Dashboard</h1>
        </div>
      </div>
    </div>
  );
};
