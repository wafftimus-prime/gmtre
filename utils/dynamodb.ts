import { ScanInput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
// import { AttributeMap } from '../definitions/types/data';
import { CreateDynamoQueryModel, AttributeMap } from '@gmtre-core';

export function CloneObject(
  object: object,
  excludedKeys?: Array<string>
): object | any {
  const clone: object = {};
  Object.keys(object).forEach((k) => {
    if (!excludedKeys?.includes(k)) clone[k] = object[k];
  });
  return clone;
}

export function CloneArray(array: Array<any>): Array<any> | any {
  const clone: Array<any> = [];
  array.forEach((item) => clone.push(item));
  return clone;
}

export function DynamoUpdateParams(data: object) {
  const AttributeNames = {};
  const AttributeValues = {};
  let UpdateExpression = 'SET ';
  const keys = Object.keys(data);
  keys.forEach((key, index) => {
    AttributeNames[`#${key.toUpperCase()}`] = key;
    AttributeValues[`:${key.toUpperCase()}`] = data[key];
    UpdateExpression += `#${key.toUpperCase()} = :${key.toUpperCase()}`;
    UpdateExpression += keys.length === index + 1 ? ` ` : ',';
  });
  return {
    ExpressionAttributeNames: AttributeNames,
    ExpressionAttributeValues: AttributeValues,
    UpdateExpression: UpdateExpression,
  };
}

export function MarshallItems(items: Array<object>): AttributeMap[] {
  const marshalledItems: AttributeMap[] = [];
  items.forEach((itm) => marshalledItems.push(MarshallItem(itm)));
  return marshalledItems;
}

export function UnMarshallItems(
  items: Array<AttributeMap>
): { [key: string]: any }[] {
  const unMarshalledItems: { [key: string]: any }[] = [];
  items.forEach((itm) => unMarshalledItems.push(UnMarshallItem(itm)));
  return unMarshalledItems;
}

export function MarshallItem(item: object): AttributeMap {
  return marshall(item);
}

export function UnMarshallItem(item: AttributeMap): { [key: string]: any } {
  return unmarshall(item);
}

export async function processDynamoScanRequest(
  dynamoClient,
  params: ScanInput
) {
  let LastEvaluatedKey = undefined;
  let requestResponse = undefined;
  const Items = [];

  requestResponse = await dynamoClient.scan(params).promise();
  LastEvaluatedKey = requestResponse?.LastEvaluatedKey;
  Items.push(...UnMarshallItems(requestResponse.Items));

  while (LastEvaluatedKey) {
    params.ExclusiveStartKey = LastEvaluatedKey;
    const requestResponse = await dynamoClient.scan(params).promise();
    Items.push(...UnMarshallItems(requestResponse.Items));
    LastEvaluatedKey = requestResponse?.LastEvaluatedKey;
  }
  return Items;
}

export async function databaseCheck(
  dynamoClient,
  region: string,
  TableName: string
) {
  if (region) {
    const tableResponse = await dynamoClient
      .describeTable({ TableName })
      .catch((r) => ({ ...r }));

    if (tableResponse?.name === 'ResourceNotFoundException') {
      const createRes = await dynamoClient.createTable({
        AttributeDefinitions: [
          { AttributeName: 'typename', AttributeType: 'S' },
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'typename',
            KeyType: 'RANGE',
          },
        ],
        TableName,
        BillingMode: 'PAY_PER_REQUEST',
      });
    }
  }
}


export function CreateDynamoQuery(queryOptions: CreateDynamoQueryModel) {
  const QueryParams: any = {
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    FilterExpression: '',
    KeyConditionExpression: '',
  };
  const keyConditions: string[] = [];
  const filterExpressions: string[] = [];

  if (queryOptions.PartitionKey) {
    keyConditions.push('#pkName = :PK');
    QueryParams['ExpressionAttributeNames']['#pkName'] =
      queryOptions.PartitionKey.Name;
    QueryParams['ExpressionAttributeValues'][':PK'] =
      queryOptions.PartitionKey.Value;
  }

  if (queryOptions.SortKey) {
    keyConditions.push('#skName = :SK');
    QueryParams['ExpressionAttributeNames']['#skName'] =
      queryOptions.SortKey.Name;
    QueryParams['ExpressionAttributeValues'][':SK'] =
      queryOptions.SortKey.Value;
  }

  if (queryOptions.Filters) {
    queryOptions.Filters.forEach((filter, index) => {
      const filterAttrName = `#fn${index}`;
      const filterAttrValue = `:fv${index}`;
      QueryParams['ExpressionAttributeNames'][filterAttrName] = filter.Name;
      QueryParams['ExpressionAttributeValues'][filterAttrValue] = filter.Value;

      switch (filter.Condition) {
        case 'contains':
          filterExpressions.push(
            `contains (${filterAttrName}, ${filterAttrValue})`
          );
          break;

        default:
          filterExpressions.push(
            `${filterAttrName} ${filter.Condition} ${filterAttrValue}`
          );
          break;
      }
    });

    filterExpressions.forEach((fExpr, findex) => {
      if (fExpr.length === 1) {
        QueryParams['FilterExpression'] += ` ${fExpr} `;
      } else if (findex === 0) {
        QueryParams['FilterExpression'] += ` ${fExpr} `;
      } else if (findex + 1 === fExpr.length) {
        QueryParams['FilterExpression'] += ` and ${fExpr} `;
      } else {
        QueryParams['FilterExpression'] += ` and ${fExpr} `;
      }
    });

    keyConditions.forEach((fExpr, findex) => {
      if (fExpr.length === 1) {
        QueryParams['KeyConditionExpression'] += ` ${fExpr} `;
      } else if (findex === 0) {
        QueryParams['KeyConditionExpression'] += ` ${fExpr} `;
      } else if (findex + 1 === fExpr.length) {
        QueryParams['KeyConditionExpression'] += ` and ${fExpr} `;
      } else {
        QueryParams['KeyConditionExpression'] += ` and ${fExpr} `;
      }
    });
  }

  QueryParams['ExpressionAttributeValues'] = MarshallItem(
    QueryParams['ExpressionAttributeValues']
  );
  return QueryParams;
}
