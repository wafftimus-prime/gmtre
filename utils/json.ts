import { Column, IJsonResponse, ObjectDeepComparison, eDataTypeOptions } from "@gmtre-core";

export function parseMultiLineJSON(object: string) {
  const result = [];
  object.split(/\n/g).forEach((itm) => {
    try {
      result.push(JSON.parse(itm));
    } catch (e) {
      let err = e;
    }
  });
  return result;
}

export function camelCase2Word(word: string): string {
	let newWord = '';
	word.split(/(?=[A-Z])/).forEach(wd => (newWord += ` ${wd}`));
	return newWord;
  }

export function jsonToArray(jsonObject: Object) {
  const arrResponse = [];
  if (jsonObject)
    Object.keys(jsonObject).forEach((conf) => {
      arrResponse.push({
        key: conf,
        title: camelCase2Word(conf),
        config: jsonObject[conf],
        type: eDataTypeOptions[
          Array.isArray(jsonObject[conf]) ? 'array' : typeof jsonObject[conf]
        ],
      });
    });
  return arrResponse;
}

export function emptyObject(object: object): boolean {
  return Object.entries(object).length === 0;
}

export function objectToNameValuePairs(
  data: Object
): Array<{ Name: string; Value: string }> {
  const result: Array<{ Name: string; Value: string }> = [];
  Object.keys(data).forEach((_k) => result.push({ Name: _k, Value: data[_k] }));
  return result;
}

export function enumToKeyValuePairs(
  data: Object
): Array<{ key: string; value: string }> {
  const result: Array<{ key: string; value: string }> = [];
  Object.keys(data).forEach((_k) => result.push({ key: _k, value: data[_k] }));
  return result;
}

export function getObjectByKeys(data: Object, keys: string[]) {
  let response = {};
  Object.entries(data).forEach((k) => {
    if (keys.includes(k[0])) response[k[0]] = k[1];
  });
  return response;
}

export function getObjectInstance(object: any): string {
  try {
    if (object)
      return object
        .valueOf()
        ['__proto__']['constructor']['name'].toString()
        .toLowerCase();
    return typeof object;
  } catch (e) {
    console.log('ERROR LOCATED IN json.utils.ts, getObjectInstance method', e);
    return object;
  }
}

/**
 * Combines JSON Objects
 * @param parentObject
 * @param childObject
 */
export function combineObjects(
  parentObject: Object,
  childObject
): Object | any {
  Object.keys(childObject).forEach((k) => (parentObject[k] = childObject[k]));
  return parentObject;
}

export function getDateTypeFields(fieldList: Column[]): Column[] {
  const dateFields = [];
  fieldList.forEach((_col) => {
    if (['timestamp', 'datetime', 'date'].includes(_col.Type))
      dateFields.push(_col);
  });
  return dateFields;
}

export function stringIdentity(string: string): number {
  let identity = 0;
  string.split('').forEach((s) => (identity += s.charCodeAt(0)));
  return identity;
}

export function removeKey(object: Object | any, targetKey: string) {
  // delete object[targetKey];
  return object;
}

export function jsonDeepComparison(
  baseObject: any,
  targetObject: any
): ObjectDeepComparison {
  const comparison: ObjectDeepComparison = { hasError: false };
  try {
    comparison.baseObject = {
      sourceValue: baseObject,
      identity: stringIdentity(JSON.stringify(baseObject)),
    };
    comparison.targetObject = {
      sourceValue: targetObject,
      identity: stringIdentity(JSON.stringify(targetObject)),
    };
    comparison.match =
      comparison.baseObject.identity === comparison.targetObject.identity;
  } catch (e) {
    comparison.error = e;
    comparison.hasError = true;
  }
  return comparison;
}

export function cleanObject(object: Object | any, removeNull?: boolean) :any{
  const response:any = {};
  Object.entries(object).forEach((a) => {
    switch (typeof a[1]) {
      case 'object': {
        if (Array.isArray(a[1])) {
          response[a[0]] = a[1];
        } else if (a[1]) {
          response[a[0]] = cleanObject(a[1]);
        } else {
          response[a[0]] = a[1];
        }
        break;
      }
      case 'string': {
        if (removeNull) {
          if (a[1].length === 0) {
            delete response[a[0]];
          } else {
            response[a[0]] = a[1].length > 0 ? a[1] : null;
          }
        }
        if (!removeNull) response[a[0]] = a[1].length > 0 ? a[1] : null;
        break;
      }
      default: {
        response[a[0]] = a[1];
        break;
      }
    }
  });
  return response;
}

export function objectToString(object: Object): IJsonResponse {
  if (object !== typeof object) {
    return { success: false, error: 'Input must an Object' };
  }
  return { success: true, result: JSON.stringify(object) };
}

export function serializeJson(json) {
  return `${JSON.stringify(json, null, 2)}\n`;
}

export function hashArray(ary) {
  return JSON.stringify(ary);
}

export function getJsonValue(path, json) {
  let curr = json;
  for (const k of path) {
    curr = curr[k];
    if (curr === undefined) {
      break;
    }
  }
  return curr;
}

export function deepEquals(a, b) {
  if (a === b) {
    return true;
  }
  // Values do not need to be checked for deep equality and the above is false
  if (
    // Values are different types
    typeof a !== typeof b ||
    // Values are the same type but not an object or array
    (typeof a !== 'object' && !Array.isArray(a)) ||
    // Objects are the same type, objects or arrays, but do not have the same number of keys
    Object.keys(a).length !== Object.keys(b).length
  ) {
    return false;
  }
  // Values need to be checked for deep equality
  return Object.entries(a).reduce((equal, [key, aValue]) => {
    // Skip other keys if it is already not equal.
    if (!equal) {
      return equal;
    }
    // Traverse the object
    return deepEquals(aValue, b[key]);
  }, true);
}
