export interface BaseCollectionModel extends CreatedOrModifiedModel {
  typename?: string;
  errors?: any;
  list?: Array<any>;
}

export interface CreatedOrModifiedModel {
  id?: string;
  modified_at?: string;
  created_at?: string;
  owner?: string;
  created_by?: UserBaseSignature | string;
  modified_by?: UserBaseSignature | string;
}

export interface UserBaseSignature {
  id: string;
  name?: string;
  email?: string;
}

export interface TypeDefinitionModel {
  displayText?: string;
  definition?: string | string[];
}
