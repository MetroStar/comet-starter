export interface Launch {
  id: string;
  name: string;
  status: LaunchStatus;
  last_updated: string;
  window_end: string;
  window_start: string;
  probability: number;
  weather_concerns: string | null;
  holdreason: string | null;
  failreason: string | null;
  launch_service_provider: LaunchProvider;
  rocket: Rocket;
  mission: Mission | null;
}

export interface LaunchStatus {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}

export interface LaunchProvider {
  id: number;
  name: string;
  type: string;
}

export interface Rocket {
  id: number;
  configuration: RocketConfiguration;
}

export interface RocketConfiguration {
  id: number;
  name: string;
  family: string;
  full_name: string;
  variant: string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  type: string;
}
