import { Spinner } from "@metrostar/comet-extras";
import { Card, CardBody } from "@metrostar/comet-uswds";
import ErrorNotification from "@src/components/error-notification/error-notification";
import { useAuth } from "@src/hooks/use-auth";
import { Launch } from "@src/types/launch";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { DashboardBarChart } from "./dashboard-bar-chart/dashboard-bar-chart";
import { DashboardPieChart } from "./dashboard-pie-chart/dashboard-pie-chart";
import { DashboardTable } from "./dashboard-table/dashboard-table";

export const Dashboard = (): ReactElement => {
  const { isSignedIn } = useAuth();
  const { isLoading, error, data } = useQuery<Launch[], { message: string }>({
    queryKey: ["items"],
    queryFn: () =>
      axios
        .get(`/?format=json`)
        .then((response) => {
          return response.data;
        })
        .then((data) => data.results),
    enabled: isSignedIn,
  });

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>My Dashboard</h1>
        </div>
      </div>
      {error && (
        <div className="grid-row padding-bottom-2">
          <div className="grid-col">
            <ErrorNotification error={error.message} />
          </div>
        </div>
      )}
      <div className="grid-row">
        <div className="tablet:grid-col-6">
          <Card id="pie-chart-card">
            <CardBody>
              <h2>Launch Success/Failure</h2>
              <DashboardPieChart items={data} />
            </CardBody>
          </Card>
        </div>
        <div className="tablet:grid-col-6">
          <Card id="pie-bar-card">
            <CardBody>
              <h2>Service Provider</h2>
              <DashboardBarChart items={data} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {isLoading ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." />
          ) : (
            <DashboardTable items={data} />
          )}
        </div>
      </div>
    </div>
  );
};
