import {
  eCommonDateFormatOptions,
  eDataRangeDescriptionOptions,
  eDataTypeOptions,
  eDatabaseTypes,
  eDateIntervals,
  eSourceTypeOptions,
} from '../enums';

export type DateFormat = keyof typeof eCommonDateFormatOptions;
export type DateFormatType = eCommonDateFormatOptions;
export type DateRangeOptions = keyof typeof eDataRangeDescriptionOptions;
export type DateIntervalType = keyof typeof eDateIntervals;
export type Periods = DateIntervalType;
export type DataSourceType = keyof typeof eSourceTypeOptions;
export type DataType = keyof typeof eDataTypeOptions;
export type DatabaseType = keyof typeof eDatabaseTypes;
