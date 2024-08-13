import { IKeyValuePair, ItemList } from '@gmtre-core';
import { FormGroup } from '@angular/forms';
import { unmarshall } from '@aws-sdk/util-dynamodb';

/**
 * Converts an enum into an array of key-value pairs.
 * @param {Object|any} enumObject - The enum to convert.
 * @returns {Array<IKeyValuePair>} An array of objects, each with `key` and `value` properties corresponding to the enum entries.
 */
export function getKeyValuePairFromEnum(
  enumObject: Object | any
): Array<IKeyValuePair> {
  const response: IKeyValuePair[] = [];
  Object.keys(enumObject).forEach((k) =>
    response.push({ key: k, value: enumObject[k] })
  );
  return response;
}

/**
 * Converts an array of DynamoDB items to a standard JavaScript object array by unmarshalling each item.
 * @param {ItemList} arrayObj - The array of DynamoDB items to convert.
 * @returns {Array<{ [key: string]: any }>} An array of objects, each representing an unmarshalled DynamoDB item.
 */
export function dynamoItemsArrayConverter(
  arrayObj: ItemList
): Array<{ [key: string]: any }> {
  const response: Array<{ [key: string]: any }> = [];
  arrayObj.forEach((i) => response.push(unmarshall(i)));
  return response;
}

/**
 * To check whether the object is null or undefined.
 * @param {Object} value - To check the object is null or undefined
 * @return {boolean}
 * @private
 */
export function isNullOrUndefined(value: Object): boolean {
  return value === undefined || value === null;
}

/**
 * To check whether the object is undefined.
 * @param {Object} value - To check the object is undefined
 * @return {boolean}
 * @private
 */
export function isUndefined(value: Object): boolean {
  return 'undefined' === typeof value;
}

/**
 * To get nameSpace value from the desired object.
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} obj - Object to get the inner object value.
 * @return {any}
 * @private
 */
export function getValue(nameSpace: string, obj: any): any {
  let value: any = obj;
  let splits: string[] = nameSpace
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.');

  for (let i: number = 0; i < splits.length && !isUndefined(value); i++) {
    value = value[splits[i]];
  }
  return value;
}

/**
 * Populates an Angular form group with values from a model object.
 * @param {FormGroup|any} form - The form group to populate.
 * @param {Object|any} model - The model whose values should be used to populate the form.
 * @returns {FormGroup} The populated form group.
 */
export function populateForm(
  form: FormGroup | any,
  model: Object | any
): FormGroup {
  try {
    Object.keys(model).forEach((k) => {
      if (model[k] instanceof Object) {
        if (form.contains(k)) {
          populateForm(form.controls[k], model[k]);
        }
      } else if (form.contains(k)) {
        form.controls[k].setValue(model[k]);
      }
    });
    return form;
  } catch (e) {
    return form;
  }
}

/**
 * Checks if a value is an array.
 * @param {any} obj - The value to check.
 * @returns {boolean} `true` if the value is an array, otherwise `false`.
 */
export function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

/**
 * Retrieves an object from an array that matches the specified key-value pair.
 * @param {Array<any>} obj - The array to search.
 * @param {string} Key - The key to match in the objects within the array.
 * @param {string} Value - The value to match for the given key.
 * @returns {any} The found object, or `null` if no matching object is found.
 */
export function getObjectFromArray(
  obj: Array<any>,
  Key: string,
  Value: string
) {
  let result: any = null;
  obj.forEach((itm) => {
    if (itm instanceof Object) {
      Object.keys(itm).forEach((k) => {
        if (k === Key && itm[k] === Value) {
          result = itm;
        }
      });
    }
  });
  return result;
}

/**
 * Extracts specific attributes from an object or array-like object based on a set of keys.
 * @param {{ [s: string]: unknown; } | ArrayLike<unknown>} dataObject - The object or array-like object from which to extract the attributes.
 * @param {string | string[]} objectKeys - An array of strings representing the keys of the attributes to extract.
 * @returns {any} A new object containing only the specified attributes.
 */
export function getObjectAttributes(
  dataObject: { [s: string]: unknown } | ArrayLike<unknown>,
  objectKeys: string | string[]
) {
  const newObject: any = {};
  Object.entries(dataObject).forEach((entry) => {
    if (objectKeys.includes(entry[0])) {
      newObject[entry[0]] = entry[1];
    }
  });
  return newObject;
}

/**
 * Recursively removes attributes with `undefined` values from an object or an array of objects.
 * @param {any} obj - The object or array of objects to clean.
 * @returns {any} A new object or array of objects, identical to the input but without any attributes that were `undefined`.
 */
export function removeUndefinedAttributes(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedAttributes);
  }

  const cleanedObj: any = {};

  for (const key in obj) {
    const value = obj[key];
    const cleanedValue = removeUndefinedAttributes(value);

    if (typeof cleanedValue !== 'undefined') {
      cleanedObj[key] = cleanedValue;
    }
  }

  return cleanedObj;
}

/**
 * Flattens an object, turning nested objects into a single-level object with dot-separated keys.
 * @param {any} obj - The object to flatten.
 * @param {any} [parent] - The parent object key, used for recursive calls.
 * @param {any} [res={}] - The accumulator for the result, used for recursive calls.
 * @returns {any} The flattened object.
 */
export function flattenObj(obj?: any, parent?: any, res: any = {}) {
  for (let key in obj) {
    let propName: any = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] == 'object') {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

export function flattenArray(array: any[]) {
  return array.map((obj: any) => flattenObj(obj));
}

export function flattenArrayItems(array: Array<any>) {
  const flatArray: any[] = [];
  if (!Array.isArray(array)) {
    throw new Error('flattenArrayItems function expects an Array');
  }

  array.forEach((item) => flatArray.push(flattenObject(item)));
  return flatArray;
}

export function flattenObject(object: any) {
  const flatObject: any = {};
  if (Array.isArray(object)) {
    throw new Error(
      'flattenObject function expects an Object or Dictionary, cannot be an Array'
    );
  }

  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object') {
      if (Array.isArray(object[key])) {
        object[key].forEach((child: any) => {
          flatObject[child['Name']] = child['Value'];
        });
      } else {
        flatObject[key] = object[key];
      }
    } else {
      flatObject[key] = object[key];
    }
  });
  return flatObject;
}

export function isEmptyObject(obj: any): boolean {
  // First, check if obj is not null or undefined.
  if (obj == null) {
    return false;
  }

  // Then, check if obj is an object and not an array or null.
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    // Finally, check if the object has no own properties.
    return Object.keys(obj).length === 0;
  }

  // If obj is not an object, return false.
  return false;
}


export function flattenObjectToMakeClonable(obj) {
  // Check if the value is an object (and not null, an array, or a date object)
  const isObject = val => typeof val === 'object' && val !== null && !(val instanceof Array) && !(val instanceof Date);

  // Function to clone the object without functions
  function cloneWithoutFunctions(input) {
      if (!isObject(input)) return input;  // Return the input if it's not an object

      const output = {};
      for (const key in input) {
          const value = input[key];
          // If the value is an object, recurse, otherwise copy it if it's not a function
          if (isObject(value)) {
              output[key] = cloneWithoutFunctions(value); // Recurse for nested objects
          } else if (typeof value !== 'function') {
              output[key] = value;  // Copy value if it's not a function
          }
      }
      return output;
  }

  return cloneWithoutFunctions(obj);
}

