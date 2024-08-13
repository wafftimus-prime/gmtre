import {
  BrowserInfo,
  DeviceEnvironmentInfoItem,
  LocationInfo,
  NetworkInfoItem,
  PerformanceInfo,
  PermissionStateModel,
  ScreenInfo,
  SessionPermissionsInfoItem,
} from './support.model';

export function getDeviceEnvironmentInfo(): DeviceEnvironmentInfoItem {
  return {
    typename: 'device_environment_info',
    browser_info: getBrowserInfo(),
    screen_info: getScreenInfo(),
    location_info: getLocationInfo(),
    performance_info: getPerformanceInfo(),
  };
}

export function getBrowserInfo(): BrowserInfo {
  return {
    app_name: navigator.appName,
    app_version: navigator.appVersion,
    user_agent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    online: navigator.onLine,
  };
}

export function getScreenInfo(): ScreenInfo {
  return {
    width: screen.width,
    height: screen.height,
    color_depth: screen.colorDepth,
    pixel_depth: screen.pixelDepth,
  };
}

export function getLocationInfo(): LocationInfo {
  const locationInfo: LocationInfo = {};
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationInfo.latitude = position.coords.latitude;
      locationInfo.longitude = position.coords.longitude;
      locationInfo.accuracy = position.coords.accuracy;
      locationInfo.altitude = position.coords.altitude;
      locationInfo.altitude_accuracy = position.coords.altitudeAccuracy;
      locationInfo.heading = position.coords.heading;
      locationInfo.speed = position.coords.speed;
    },
    (error) => {
      console.error('Error getting location', error);
    }
  );
  return locationInfo;
}

export function getNetworkInfoItem(): Promise<NetworkInfoItem> {
  const connection: any =
    navigator?.['connection'] ||
    navigator?.['mozConnection'] ||
    navigator?.['webkitConnection'];

  return new Promise((resolve) => {
    const networkInfo: NetworkInfoItem = {
      typename: 'network_info',
      connection_type: connection?.type || 'unknown',
      effective_type: connection?.effectiveType || '',
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      save_data: connection?.saveData || false,
      location: {
        latitude: 0,
        longitude: 0,
      },
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          networkInfo.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(networkInfo);
        },
        (error) => {
          console.error('Error getting location', error);
          resolve(networkInfo); // Resolve with whatever data we have
        }
      );
    } else {
      resolve(networkInfo); // Resolve with network info if geolocation is not available
    }
  });
}

export function getPerformanceInfo(): PerformanceInfo {
  const timing = performance.timing;
  return {
    navigation_start: timing.navigationStart,
    unload_event_start: timing.unloadEventStart,
    unload_event_end: timing.unloadEventEnd,
    redirect_start: timing.redirectStart,
    redirect_end: timing.redirectEnd,
    fetch_start: timing.fetchStart,
    domain_lookup_start: timing.domainLookupStart,
    domain_lookup_end: timing.domainLookupEnd,
    connect_start: timing.connectStart,
    connect_end: timing.connectEnd,
    secure_connection_start: timing.secureConnectionStart,
    request_start: timing.requestStart,
    response_start: timing.responseStart,
    response_end: timing.responseEnd,
    dom_loading: timing.domLoading,
    dom_interactive: timing.domInteractive,
    dom_content_loaded_event_start: timing.domContentLoadedEventStart,
    dom_content_loaded_event_end: timing.domContentLoadedEventEnd,
    dom_complete: timing.domComplete,
    load_event_start: timing.loadEventStart,
    load_event_end: timing.loadEventEnd,
  };
}

export async function checkPermissions(): Promise<SessionPermissionsInfoItem> {
  const permissionsInfo: SessionPermissionsInfoItem = {
    typename: 'session_permissions',
  };

  // Check Notification Permission
  if ('Notification' in window) {
    permissionsInfo.notification = {
      state: Notification.permission as PermissionState,
      description: 'Allows notifications to be displayed.',
      supported: true,
    };
  } else {
    permissionsInfo.notification = {
      state: 'denied',
      description: 'Notifications are not supported by this browser.',
      supported: false,
      error_message: 'Notifications are not supported by this browser.',
    };
  }

  // Check Geolocation Permission
  permissionsInfo.geolocation = await checkPermission(
    'geolocation',
    'Allows access to geolocation data.'
  );

  // Check Persistent Storage Permission
  permissionsInfo.persistentStorage = await checkPermission(
    'persistent-storage',
    'Allows persistent storage of data.'
  );

  // Check Push Permission
  permissionsInfo.push = await checkPermission(
    'push',
    'Allows receiving push notifications.'
  );

  // Check Screen Wake Lock Permission
  permissionsInfo.screenWakeLock = await checkPermission(
    'screen-wake-lock',
    'Prevents the screen from turning off.'
  );

  // Check XR Spatial Tracking Permission
  permissionsInfo.xr = await checkPermission(
    'xr-spatial-tracking',
    'Allows access to XR (VR/AR) spatial tracking capabilities.'
  );

  // Check Camera Permission
  permissionsInfo.camera = await checkPermission(
    'camera',
    'Allows access to the camera.'
  );

  // Check Microphone Permission
  permissionsInfo.microphone = await checkPermission(
    'microphone',
    'Allows access to the microphone.'
  );

  // Check Clipboard Read Permission
  permissionsInfo.clipboardRead = await checkPermission(
    'clipboard-read',
    'Allows reading from the clipboard.'
  );

  // Check Clipboard Write Permission
  permissionsInfo.clipboardWrite = await checkPermission(
    'clipboard-write',
    'Allows writing to the clipboard.'
  );

  // Check Background Sync Permission
  permissionsInfo.backgroundSync = await checkPermission(
    'background-sync',
    'Allows synchronization in the background.'
  );

  // Check Pointer Lock Permission
  permissionsInfo.pointerLock = await checkPermission(
    'pointerlock',
    'Allows locking the mouse pointer.'
  );

  // Check Fullscreen Permission
  permissionsInfo.fullscreen = await checkPermission(
    'fullscreen',
    'Allows displaying content in fullscreen mode.'
  );

  // Check Device Orientation Permission
  permissionsInfo.deviceOrientation = await checkPermission(
    'deviceorientation',
    'Allows access to the device orientation.'
  );

  // Check Device Motion Permission
  permissionsInfo.deviceMotion = await checkPermission(
    'devicemotion',
    'Allows access to the device motion.'
  );

  // Check Battery Status Permission
  permissionsInfo.batteryStatus = await checkPermission(
    'battery',
    'Allows access to the battery status.'
  );

  // Check Ambient Light Permission
  permissionsInfo.ambientLight = await checkPermission(
    'ambient-light-sensor',
    'Allows access to ambient light data.'
  );

  // Check Proximity Permission
  permissionsInfo.proximity = await checkPermission(
    'proximity',
    'Allows access to proximity data.'
  );

  // Check Payment Request Permission
  permissionsInfo.paymentRequest = await checkPermission(
    'payment-request',
    'Allows initiating payment requests.'
  );

  // Check Idle Detection Permission
  permissionsInfo.idleDetection = await checkPermission(
    'idle-detection',
    'Allows detecting when the user is idle.'
  );

  // Check Serial Permission
  permissionsInfo.serial = await checkPermission(
    'serial',
    'Allows access to serial devices.'
  );

  // Check Bluetooth Permission
  permissionsInfo.bluetooth = await checkPermission(
    'bluetooth',
    'Allows access to Bluetooth devices.'
  );

  // Check USB Permission
  permissionsInfo.usb = await checkPermission(
    'usb',
    'Allows access to USB devices.'
  );

  // Check NFC Permission
  permissionsInfo.nfc = await checkPermission(
    'nfc',
    'Allows access to NFC devices.'
  );

  // Check Gamepad Permission
  permissionsInfo.gamepad = await checkPermission(
    'gamepad',
    'Allows access to gamepad devices.'
  );

  // Check Media Session Permission
  permissionsInfo.mediaSession = await checkPermission(
    'media-session',
    'Allows customization of media notifications.'
  );

  // Check Speech Recognition Permission
  permissionsInfo.speechRecognition = await checkPermission(
    'speech-recognition',
    'Allows access to speech recognition.'
  );

  // Check MIDI Permission
  permissionsInfo.midi = await checkMIDIPermission();

  // Check File System Access Permission
  permissionsInfo.fileSystemAccess = {
    state: 'granted',
    description: 'Allows access to the file system.',
    supported: true,
  }; // This permission is typically handled via user interaction

  // Check Wake Lock Permission
  permissionsInfo.wakeLock = await checkPermission(
    'wake-lock',
    'Allows preventing the screen from turning off.'
  );

  // Check Background Fetch Permission
  permissionsInfo.backgroundFetch = await checkPermission(
    'background-fetch',
    'Allows background fetch.'
  );

  // Check Accelerometer Permission
  permissionsInfo.accelerometer = await checkPermission(
    'accelerometer',
    'Allows access to accelerometer data.'
  );

  // Check Gyroscope Permission
  permissionsInfo.gyroscope = await checkPermission(
    'gyroscope',
    'Allows access to gyroscope data.'
  );

  // Check Magnetometer Permission
  permissionsInfo.magnetometer = await checkPermission(
    'magnetometer',
    'Allows access to magnetometer data.'
  );

  // Check Media Capabilities Permission
  permissionsInfo.mediaCapabilities = {
    state: 'granted',
    description:
      'Provides information about the decoding and encoding capabilities of the device.',
    supported: true,
  }; // This permission is typically queried

  // Check WebAuthn Permission
  permissionsInfo.webAuthn = await checkWebAuthnPermission();

  return permissionsInfo;
}

export async function checkPermission(
  name: PermissionName | any,
  description: string
): Promise<PermissionStateModel> {
  try {
    const result = await navigator.permissions.query({ name });
    return {
      state: result.state,
      description,
      supported: true,
    };
  } catch (error) {
    return {
      state: 'denied',
      description,
      supported: false,
      error_message: error.message,
    };
  }
}

export async function checkMIDIPermission(): Promise<PermissionStateModel> {
  try {
    if ('permissions' in navigator) {
      const name: any = 'midi';
      const result = await navigator.permissions.query({ name });
      return {
        state: result.state,
        description: 'Allows access to MIDI devices.',
        supported: true,
      };
    } else {
      throw new Error('MIDI permissions are not supported by this browser.');
    }
  } catch (error) {
    return {
      state: 'denied',
      description: 'Allows access to MIDI devices.',
      supported: false,
      error_message: error.message,
    };
  }
}

export async function checkXRPermission(): Promise<PermissionStateModel> {
  try {
    if ('xr' in navigator && ['navigator']['xr'].isSessionSupported) {
      const isSupported = await ['navigator']['xr'].isSessionSupported(
        'immersive-vr'
      );
      return {
        state: isSupported ? 'granted' : 'denied',
        description: 'Allows access to XR (VR/AR) capabilities.',
        supported: true,
      };
    } else {
      throw new Error('XR not supported');
    }
  } catch (error) {
    return {
      state: 'denied',
      description: 'Allows access to XR (VR/AR) capabilities.',
      supported: false,
      error_message: error.message,
    };
  }
}

export async function checkWebAuthnPermission(): Promise<PermissionStateModel> {
  try {
    if ('permissions' in navigator) {
      const name: any = 'publickey';
      const result = await navigator.permissions.query({ name });
      return {
        state: result.state,
        description:
          'Allows use of Web Authentication (WebAuthn) for secure authentication.',
        supported: true,
      };
    } else {
      throw new Error(
        'WebAuthn permissions are not supported by this browser.'
      );
    }
  } catch (error) {
    return {
      state: 'denied',
      description:
        'Allows use of Web Authentication (WebAuthn) for secure authentication.',
      supported: false,
      error_message: error.message,
    };
  }
}
