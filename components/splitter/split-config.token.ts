import { InjectionToken } from '@angular/core'
import { IDefaultOptions } from './interface'

export const SPLIT_DEFAULT_OPTIONS = new InjectionToken<Partial<IDefaultOptions>>('split-global-config')
