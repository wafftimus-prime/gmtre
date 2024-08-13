import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { CountdownConfig } from './interfaces';

export const GMTRE_COUNTDOWN_CONFIG = new InjectionToken<CountdownConfig>('GMTRE_COUNTDOWN_CONFIG');

export function provideCountdown(config?: CountdownConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: GMTRE_COUNTDOWN_CONFIG, useValue: config }]);
}
