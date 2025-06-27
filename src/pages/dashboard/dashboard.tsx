import { BarGraph, PieChart } from '@metrostar/comet-data-viz';
import { TabPanel, Tabs } from '@metrostar/comet-extras';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  Table,
} from '@metrostar/comet-uswds';
import React from 'react';

export const Dashboard = (): React.ReactElement => {
  // Mock data for the System Uptime chart
  const systemUptimeData = [
    { x: 'Jan', y: 15 },
    { x: 'Feb', y: 100 },
    { x: 'Mar', y: 30 },
    { x: 'Apr', y: 5 },
    { x: 'May', y: 20 },
  ];

  // Mock data for the Security Alert Distribution chart
  const securityAlertData = [
    { x: 'Normal', y: 45 },
    { x: 'Informational', y: 30 },
    { x: 'Warnings', y: 15 },
    { x: 'Critical', y: 10 },
  ];

  // Mock data for the projects table
  const projectColumns = [
    { id: 'title', name: 'Title' },
    { id: 'type', name: 'Type' },
    { id: 'priority', name: 'Priority' },
    { id: 'updated', name: 'Updated' },
  ];

  const projectData = [
    {
      title: { value: 'Network Security Update' },
      type: { value: 'Infrastructure' },
      priority: { value: 'High' },
      updated: { value: '2025-06-26' },
    },
    {
      title: { value: 'Database Migration' },
      type: { value: 'Data Management' },
      priority: { value: 'Medium' },
      updated: { value: '2025-06-26' },
    },
    {
      title: { value: 'User Access Review' },
      type: { value: 'Security' },
      priority: { value: 'High' },
      updated: { value: '2025-06-26' },
    },
  ];

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col">
            <h1>IT Operations Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="grid-container margin-top-4">
        {/* Security Alert */}
        <div className="grid-row margin-bottom-4">
          <div className="grid-col">
            <Alert
              id="security-alert"
              type="warning"
              heading="You have pending security updates."
            >
              Critical patches are available for 3 systems. Please review and
              schedule maintenance windows.
            </Alert>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid-row margin-bottom-6">
          <div className="grid-col">
            <h2 className="margin-bottom-4">Quick Actions</h2>
            <div className="grid-row grid-gap-4">
              <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
                <Card id="server-management-card">
                  <CardMedia>
                    <img
                      src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                      alt="Server Management"
                    />
                  </CardMedia>
                  <CardHeader>Server Management</CardHeader>
                  <CardBody>
                    Manage server infrastructure across all environments.
                  </CardBody>
                  <CardFooter>
                    <Button id="view-servers-btn" variant="outline">
                      View Servers
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
                <Card id="security-center-card">
                  <CardMedia>
                    <img
                      src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                      alt="Security Center"
                    />
                  </CardMedia>
                  <CardHeader>Security Center</CardHeader>
                  <CardBody>
                    View security alerts, manage access controls, and review
                    audit logs.
                  </CardBody>
                  <CardFooter>
                    <Button id="view-security-btn" variant="outline">
                      View Security
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
                <Card id="database-admin-card">
                  <CardMedia>
                    <img
                      src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                      alt="Database Administration"
                    />
                  </CardMedia>
                  <CardHeader>Database Administration</CardHeader>
                  <CardBody>
                    Manage databases, backups, and performance optimization.
                  </CardBody>
                  <CardFooter>
                    <Button id="manage-databases-btn" variant="outline">
                      Manage Databases
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">
                <Card id="system-monitoring-card">
                  <CardMedia>
                    <img
                      src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                      alt="System Monitoring"
                    />
                  </CardMedia>
                  <CardHeader>System Monitoring</CardHeader>
                  <CardBody>
                    Real-time monitoring of system performance and health.
                  </CardBody>
                  <CardFooter>
                    <Button id="view-metrics-btn" variant="outline">
                      View Metrics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Data */}
        <div className="grid-row margin-bottom-6">
          <div className="grid-col">
            <h2 className="margin-bottom-4">Recent Data</h2>
            <div className="grid-row grid-gap-4">
              <div className="grid-col-12 tablet:grid-col-6">
                <div className="bg-base-lightest padding-4 radius-lg border border-base-lighter">
                  <h3 className="margin-top-0">System Uptime</h3>
                  <p className="text-base margin-bottom-4">
                    Monthly uptime percentage.
                  </p>
                  <BarGraph
                    chart={{
                      title: 'System Uptime',
                      width: 400,
                      height: 300,
                    }}
                    alignment="start"
                    color="#0d7ea2"
                    barRatio={1}
                    data={systemUptimeData}
                  />
                </div>
              </div>
              <div className="grid-col-12 tablet:grid-col-6">
                <div className="bg-base-lightest padding-4 radius-lg border border-base-lighter">
                  <h3 className="margin-top-0">Security Alert Distribution</h3>
                  <p className="text-base margin-bottom-4">
                    Current security events by severity level.
                  </p>
                  <PieChart
                    title="Security Alert Distribution"
                    height={300}
                    width={400}
                    colors="warm"
                    data={securityAlertData}
                    innerRadius={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="grid-row margin-bottom-6">
          <div className="grid-col">
            <div className="display-flex flex-justify">
              <h2 className="margin-bottom-4">Recent Projects</h2>
              <div className="display-flex flex-gap-4">
                <div>
                  <ButtonGroup>
                    <Button id="view-all-projects-btn" variant="unstyled">
                      View All Projects
                    </Button>
                    <Button id="create-new-project-btn" variant="default">
                      Create New Project
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <div className="bg-base-lightest padding-4 radius-lg border border-base-lighter">
              <Tabs id="project-tabs" defaultTabId="all-tab">
                <TabPanel id="all-tab" label="All">
                  <Table
                    caption="Recent Projects"
                    columns={projectColumns}
                    data={projectData}
                    id="projects-table"
                    className="width-full"
                    sortable
                  />
                </TabPanel>
                <TabPanel id="active-tab" label="Active">
                  <Table
                    caption="Active Projects"
                    columns={projectColumns}
                    data={projectData.slice(0, 2)}
                    id="active-projects-table"
                    className="width-full"
                    sortable
                  />
                </TabPanel>
                <TabPanel id="completed-tab" label="Completed">
                  <Table
                    caption="Completed Projects"
                    columns={projectColumns}
                    data={projectData.slice(2)}
                    id="completed-projects-table"
                    className="width-full"
                    sortable
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
