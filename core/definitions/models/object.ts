export interface ObjectDeepComparison {
  baseObject?: {
    sourceValue: any;
    identity: number;
  };
  targetObject?: {
    sourceValue: any;
    identity: number;
  }
  match?: boolean;
  hasError: boolean;
  error?: any;
}


export interface Column {
  /**
   * The name of the Column.
   */
  Name: string;
  /**
   * The data type of the Column.
   */
  Type?: string;
  /**
   * A free-form text comment.
   */
  Comment?: string;
  /**
   * These key-value pairs define properties associated with the column.
   */
  Parameters?: { [key: string]: string };
}

