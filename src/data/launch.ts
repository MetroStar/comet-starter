import { Launch } from '../types/launch';

export const launchData: Launch[] = [
  {
    id: 'b8741d6a-bf47-44eb-b740-f091b5fd3c62',
    name: 'Falcon 1 | FalconSAT-2',
    status: {
      id: 4,
      name: 'Launch Failure',
      abbrev: 'Failure',
      description:
        'Either the launch vehicle did not reach orbit, or the payload(s) failed to separate.',
    },
    last_updated: '2023-06-14T09:15:19Z',
    window_end: '2006-03-24T22:30:00Z',
    window_start: '2006-03-24T22:30:00Z',
    probability: -1,
    weather_concerns: null,
    holdreason: null,
    failreason: 'Engine failure at T+33 seconds',
    launch_service_provider: {
      id: 121,
      name: 'SpaceX',
      type: 'Commercial',
    },
    rocket: {
      id: 519,
      configuration: {
        id: 133,
        name: 'Falcon 1',
        family: 'Falcon',
        full_name: 'Falcon 1',
        variant: '1',
      },
    },
    mission: null,
  },
  {
    id: '9a50023f-07fe-45ac-9ac6-7fb6b5ea970d',
    name: 'Falcon 1 | DemoSat',
    status: {
      id: 4,
      name: 'Launch Failure',
      abbrev: 'Failure',
      description:
        'Either the launch vehicle did not reach orbit, or the payload(s) failed to separate.',
    },
    last_updated: '2023-06-14T09:14:46Z',
    window_end: '2007-03-21T01:10:00Z',
    window_start: '2007-03-21T01:10:00Z',
    probability: 0,
    weather_concerns: null,
    holdreason: null,
    failreason: 'Premature engine shutdown at T+7:30',
    launch_service_provider: {
      id: 121,
      name: 'SpaceX',
      type: 'Commercial',
    },
    rocket: {
      id: 535,
      configuration: {
        id: 133,
        name: 'Falcon 1',
        family: 'Falcon',
        full_name: 'Falcon 1',
        variant: '1',
      },
    },
    mission: null,
  },
  {
    id: 'cdeb321f-0860-4064-ba76-4ad0f9022103',
    name: 'Falcon 1 | Flight 3',
    status: {
      id: 4,
      name: 'Launch Failure',
      abbrev: 'Failure',
      description:
        'Either the launch vehicle did not reach orbit, or the payload(s) failed to separate.',
    },
    last_updated: '2023-06-14T09:14:59Z',
    window_end: '2008-08-03T03:34:00Z',
    window_start: '2008-08-03T03:34:00Z',
    probability: -1,
    weather_concerns: null,
    holdreason: null,
    failreason:
      'Residual stage 1 thrust led to collision between stage 1 and stage 2 during separation.',
    launch_service_provider: {
      id: 121,
      name: 'SpaceX',
      type: 'Commercial',
    },
    rocket: {
      id: 1398,
      configuration: {
        id: 133,
        name: 'Falcon 1',
        family: 'Falcon',
        full_name: 'Falcon 1',
        variant: '1',
      },
    },
    mission: null,
  },
  {
    id: '0560cfb0-ed19-4e8b-9fe9-728feb0f817c',
    name: 'Falcon 1 | RatSat',
    status: {
      id: 3,
      name: 'Launch Successful',
      abbrev: 'Success',
      description:
        'The launch vehicle successfully inserted its payload(s) into the target orbit(s).',
    },
    last_updated: '2023-06-14T09:13:42Z',
    window_end: '2008-09-28T23:15:00Z',
    window_start: '2008-09-28T23:15:00Z',
    probability: -1,
    weather_concerns: null,
    holdreason: null,
    failreason: null,
    launch_service_provider: {
      id: 121,
      name: 'SpaceX',
      type: 'Commercial',
    },
    rocket: {
      id: 1400,
      configuration: {
        id: 133,
        name: 'Falcon 1',
        family: 'Falcon',
        full_name: 'Falcon 1',
        variant: '1',
      },
    },
    mission: null,
  },
  {
    id: '10be093a-ad74-46e6-a26c-37626e6d72b7',
    name: 'Falcon 1 | RazakSAT',
    status: {
      id: 3,
      name: 'Launch Successful',
      abbrev: 'Success',
      description:
        'The launch vehicle successfully inserted its payload(s) into the target orbit(s).',
    },
    last_updated: '2023-06-14T09:13:37Z',
    window_end: '2009-07-14T03:35:00Z',
    window_start: '2009-07-14T03:35:00Z',
    probability: -1,
    weather_concerns: null,
    holdreason: null,
    failreason: null,
    launch_service_provider: {
      id: 121,
      name: 'SpaceX',
      type: 'Commercial',
    },
    rocket: {
      id: 1421,
      configuration: {
        id: 133,
        name: 'Falcon 1',
        family: 'Falcon',
        full_name: 'Falcon 1',
        variant: '1',
      },
    },
    mission: null,
  },
];
