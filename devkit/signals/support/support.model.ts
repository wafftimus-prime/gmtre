export type SupportInformationCollection =
  | UserInfoItem
  | DeviceEnvironmentInfoItem
  | SessionInfoItem
  | ErrorInfoItem
  | NetworkInfoItem
  | SessionPermissionsInfoItem
  | RegisteredSignalsItem;

export interface RegisteredSignalsItem {
  typename: 'registered_signals';
  signals: any[];
}

export interface PermissionStateModel{
  state: PermissionState;
  description: string;
  supported: boolean;
  error_message?: string;
}

// Session Permissions Information interface
export interface SessionPermissionsInfoItem {
  typename: 'session_permissions';
  notification?: PermissionStateModel;
  geolocation?: PermissionStateModel;
  camera?: PermissionStateModel;
  microphone?: PermissionStateModel;
  clipboardRead?: PermissionStateModel;
  clipboardWrite?: PermissionStateModel;
  push?: PermissionStateModel;
  backgroundSync?: PermissionStateModel;
  persistentStorage?: PermissionStateModel;
  pointerLock?: PermissionStateModel;
  fullscreen?: PermissionStateModel;
  deviceOrientation?: PermissionStateModel;
  deviceMotion?: PermissionStateModel;
  batteryStatus?: PermissionStateModel;
  ambientLight?: PermissionStateModel;
  proximity?: PermissionStateModel;
  screenWakeLock?: PermissionStateModel;
  paymentRequest?: PermissionStateModel;
  idleDetection?: PermissionStateModel;
  serial?: PermissionStateModel;
  bluetooth?: PermissionStateModel;
  usb?: PermissionStateModel;
  nfc?: PermissionStateModel;
  gamepad?: PermissionStateModel;
  mediaSession?: PermissionStateModel;
  speechRecognition?: PermissionStateModel;
  midi?: PermissionStateModel;
  fileSystemAccess?: PermissionStateModel;
  xr?: PermissionStateModel;
  mediaCapabilities?: PermissionStateModel;
  webAuthn?: PermissionStateModel;
  wakeLock?: PermissionStateModel;
  backgroundFetch?: PermissionStateModel;
  accelerometer?: PermissionStateModel;
  gyroscope?: PermissionStateModel;
  magnetometer?: PermissionStateModel;
}

// User Information interface
export interface UserInfoItem {
  typename: 'user_info';
  user_id?: string;
  user_name?: string;
  email?: string;
}

// Session Information interface
export interface SessionInfoItem {
  typename: 'session_info';
  session_id?: string;
  start_time?: Date;
  end_time?: Date;
  actions?: string[];
}

// Device and Environment Information interface
export interface DeviceEnvironmentInfoItem {
  typename: 'device_environment_info';
  browser_info?: BrowserInfo;
  screen_info?: ScreenInfo;
  location_info?: LocationInfo;
  performance_info?: PerformanceInfo;
}

// Network Information interface
export interface NetworkInfoItem {
  typename: 'network_info';
  ip?: string;
  isp?: string;
  connection_type?: 'wifi' | 'cellular' | 'ethernet';
  location?: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  effective_type?: string;
  downlink?: number;
  rtt?: number;
  save_data?: boolean;
}

// User Action interface
export interface UserAction {
  type: string; // e.g., 'click', 'formSubmit', 'navigation'
  description: string;
  timestamp: Date;
  element?: string; // e.g., 'button', 'link'
}

// Error Information interface
export interface ErrorInfoItem {
  typename: 'error_info';
  message?: string;
  timestamp?: Date;
  service?: string;
  context?: string;
  code?: string;
  stack_trace?: string;
  occurred_at?: Date;
}

// Page View Information interface
export interface PageView {
  url: string;
  title: string;
  timestamp: Date;
  duration?: number; // in seconds
}

// Performance Information interface
export interface PerformanceInfo {
  navigation_start?: number;
  unload_event_start?: number;
  unload_event_end?: number;
  redirect_start?: number;
  redirect_end?: number;
  fetch_start?: number;
  domain_lookup_start?: number;
  domain_lookup_end?: number;
  connect_start?: number;
  connect_end?: number;
  secure_connection_start?: number;
  request_start?: number;
  response_start?: number;
  response_end?: number;
  dom_loading?: number;
  dom_interactive?: number;
  dom_content_loaded_event_start?: number;
  dom_content_loaded_event_end?: number;
  dom_complete?: number;
  load_event_start?: number;
  load_event_end?: number;
}

// Location Information interface
export interface LocationInfo {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  altitude?: number | null;
  altitude_accuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

// Browser Information interface
export interface BrowserInfo {
  app_name?: string;
  app_version?: string;
  user_agent?: string;
  platform?: string;
  language?: string;
  online?: boolean;
}

// Screen Information interface
export interface ScreenInfo {
  width?: number;
  height?: number;
  color_depth?: number;
  pixel_depth?: number;
}