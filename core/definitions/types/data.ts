import {
  AttributeValue,
  LocalSecondaryIndex,
  LocalSecondaryIndexInfo,
} from '@aws-sdk/client-dynamodb';

export type AttributeMap = { [key: string]: AttributeValue };
export type ItemList = AttributeMap[];
export type StringAttributeValue = string;
export type String = string;
export type LocalSecondaryIndexList = LocalSecondaryIndex[];
export type LocalSecondaryIndexes = LocalSecondaryIndexInfo[];
export type Long = number;
export type LongObject = number;
export type MapAttributeValue = { [key: string]: AttributeValue };
export type NextTokenString = string;
export type NonKeyAttributeName = string;
export type NonKeyAttributeNameList = NonKeyAttributeName[];
export type NonNegativeLongObject = number;
export type NullAttributeValue = boolean;
export type NumberAttributeValue = string;
export type NumberSetAttributeValue = NumberAttributeValue[];
export type BinaryAttributeValue = Buffer | Uint8Array | Blob | string;
export type BinarySetAttributeValue = BinaryAttributeValue[];
export type BooleanAttributeValue = boolean;
export type BooleanObject = boolean;
export type StringSetAttributeValue = StringAttributeValue[];
export type TableArn = string;
export type LastUpdateDateTime = Date;
export type ListAttributeValue = AttributeValue[];
