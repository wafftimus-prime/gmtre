import { IJobLog, IScheduleLog, ITaskLog } from '../models';

export type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
export type LogTypes = 'schedule' | 'job' | 'task';
export type EventLog = IJobLog | IScheduleLog | ITaskLog;
