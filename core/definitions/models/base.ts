import { Periods } from '../types/date';
import { Dialect, EventLog, LogTypes } from '../types';
import { UserModel } from './user';

export interface BaseSignedInput {
  user?: UserModel;
  id?: string;
  reportId?: string;
}

export interface IJsonResponse extends IResponse {
  result?: any
}

export interface ISecuredRequest extends IQueryRequest {
  encrypted?: boolean;
  payload?: string|any;
}

export interface IQueryRequest {
  connection?: IConnectionOptions;
  query?: string
}

export interface IQueryResponse extends IResponse {
  results?: any;
}

export interface IResponse {
  success?: boolean,
  error?: any
}

export interface IConnectionOptions {
  name?: string;
  host?: string;
  database?: string;
  port?: number;
  user?: string;
  password?: string;
  query?: string;
  type?: Dialect
  id?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  active?: boolean;
}

export interface IApiResponse extends IResponse {
  expiration?: string | Date;
  response?: string;
}


export interface IKeyValuePair {
  key: string,
  value: any
}

export interface IScheduleOptions {
  /**
   * Uniquely identifies this schedule
   * */
  id: string;

  /**
   * Date when this schedule will be executed next
   * */
  next_run?: Date;

  /**
   * Name of the schedule
   * */
  name?: string

  /**
   * Date that this schedule was initiated
   * */
  start?: Date;

  /**
   * How often is this schedule executed after the initial execution
   * */
  interval?: Periods;

  /**
   *** if `true`, this schedule will execute at `next_run`
   *** if `false`, this schedule will not execute unless triggered one-time, or `status`
   * is set back to `true`
   * */
  status?: boolean;

  /**
   * Defines the type of schedule this is, see tableau.flcities scheduler for reference
   * */
  type?: any;

  /**
   * Array of job id's that will be carried out in their index order when this schedule is executed
   * Array<IJobOptions> is only referenced so `IScheduleLog` wouldnt have conflicts
   * */
  jobs?: Array<string> | Array<IJobOptions>;

  /**
   * Number of attempts that are to be run in the event of any failures
   * */
  retries?: number;
}

export interface IUserOptions {
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface IIntegrationOptions extends IConnectionOptions {
  source?: string;
  api?: string;
}

export interface ITaskOptions {
  /**
   * id used to uniquely identify this task
   * */
  id?: string;

  /**
   * As used here, this is the name of the individual task that is a part of the over-arching job
   * */
  name?: string

  /**
   * As used here, this is the description of the individual task that is a part of the over-arching job
   * */
  description?: string

  /**
   * id of the Connection used to complete this task
   * */
  connection_id?: string;

  /**
   * Tasks that are required to be successfully finished before this task can begin
   * */
  upstream_dependencies?: Array<string>

  /**
   * When did this task begin to run?
   * Only used when logging a schedule or job
   * */
  execution_start?: Date;

  /**
   * When this task finish?
   *
   *** Only if `success` === true
   * */
  execution_end?: Date;

  /**
   * Amount of time it between `execution_start` and `execution_end`
   * */
  duration?: number;

  /**
   *** if `true`,this task was completed without errors
   *** if `false`, there was an error and the job stopped
   * */
  success?: boolean;
}

export interface ILogOptions {
  /**
   * Uniquely identifies this log
   * */
  id?: string;

  /**
   * Describes the type of event being logged: a Schedule, a job, a task
   * */
  type?: LogTypes

  /**
   * Depending on the `type` described, this log could be an `IJobLog`,
   * `ITaskLog`, or , `IScheduleLog`
   * If there are more attempts, the most recent attempt will be stored here
   *
   *** if (`ILogOptions.type` === 'schedule') typeof `ILogOptions.log` = IScheduleLog
   *** if (`ILogOptions.type` === 'job') typeof `ILogOptions.log` = IJobLog
   *** if (`ILogOptions.type` === 'task') typeof `ILogOptions.log` = ITaskLog
   * */
  log?: EventLog

  /**
   * if `ILogOptions.type` === 'schedule', and the schedule is specified to be retried after failure, previous
   * attempts will be stored here
   * */
  attempts?: Array<EventLog>

  /**
   * if true, this log is a result of the item being executed on a schedule
   * if false, this log is a result of a one off execution of this schedule, job, or task
   * */
  scheduled?: boolean

  /**
   * When did this schedule begin to run if multiple attempts
   * */
  execution_start?: Date;

  /**
   * When did the final task of this schedule finish if multiple attempts
   * */
  execution_end?: Date;
}

export interface IJobOptions {
  /**
   * id used to uniquely identify this job
   * */
  id?: string;

  /**
   * As used here, this is the name of the overall job
   * */
  name?: string;

  /**
   * As used here, this is the description of the overall job
   * */
  description?: string;

  /**
   * Array of tasks that are to be executed by this job
   * */
  tasks?: Array<ITaskOptions>

  /**
   * Has this job been scheduled?
   * */
  scheduled?: boolean;
}

export interface IScheduleLog extends IScheduleOptions {
  /**
   * All of the job logs associated with this schedule log are stored here
   * */
  jobs?: Array<IJobLog>;

  /**
   * When did this schedule begin to run?
   * */
  execution_start?: Date;

  /**
   * When did the final task of this schedule finish
   *
   * */
  execution_end?: Date;

  /**
   * Amount of time between `execution_start` and `execution_end` for the entire schedule
   * */
  duration?: number;

  /**
   *** if `true`,all jobs/tasks were completed without errors
   *** if `false`, there was an error
   * */
  success?: boolean;

  /**
   * if `success` === false, error that caused failure will be stored here,
   * this data will be duplicated from the task that caused the error
   * */
  error?: any;

  /**
   * If false, this is the first time this schedule is being ran
   * If true, this schedule had a number in the `retries` attribute triggering automatic
   * retries if failure
   * */
  retry?: boolean;

  /**
   * Starts at one, and adds 1 for every retry attempt this event triggers
   * */
  attempt?: number;
}

export interface IJobLog extends IJobOptions {
  /**
   * All tasks logs associated with this job log are stored here,
   * */
  tasks: Array<ITaskLog>;

  /**
   * When did this job begin to run?
   * */
  execution_start?: Date;

  /**
   * When did the final task of this job finish
   *
   * */
  execution_end?: Date;

  /**
   * Amount of time between `execution_start` and `execution_end` for the entire job
   * */
  duration?: number;

  /**
   *** if `true`,all tasks in this job were completed without errors
   *** if `false`, there was an error in one of the tasks
   * */
  success?: boolean;

  /**
   * if `success` === false, error that caused failure will be stored here,
   * this data will be duplicated from the task that caused the error
   * */
  error?: any;
}

export interface ITaskLog extends ITaskOptions {
  /**
   * When did this task begin to run?
   * */
  execution_start?: Date;

  /**
   * When did this task finish
   *
   * */
  execution_end?: Date;

  /**
   * Amount of time between `execution_start` and `execution_end` for the entire job
   * */
  duration?: number;

  /**
   *** if `true`,all tasks in this job were completed without errors
   *** if `false`, there was an error in one of the tasks
   * */
  success?: boolean;

  /**
   * if `success` === false, error that caused failure will be stored here,
   * */
  error?: any;
}


export interface CredentialsOptions {
  /**
   * AWS access key ID.
   */
  accessKeyId: string
  /**
   * AWS secret access key.
   */
  secretAccessKey: string
  /**
   * AWS session token.
   */
  sessionToken?: string
}
