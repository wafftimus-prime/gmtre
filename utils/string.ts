import {
  STRING_CAMELIZE_REGEXP,
  STRING_DASHERIZE_REGEXP,
  STRING_DECAMELIZE_REGEXP,
  STRING_UNDERSCORE_REGEXP_1,
  STRING_UNDERSCORE_REGEXP_2,
} from '@gmtre-core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined, isUndefined } from './object';
import { getDateTimeDiff } from './date';

export function convertUrlToArray(url: string) {
  let cleanList: any[] = [];
  url
    .split('/')
    .forEach((_item) =>
      _item.length > 0 ? (cleanList = [...cleanList, _item]) : null
    );
  return cleanList;
}

export type ListMenuItems = ListMenuItem[];
export interface ListMenuItem {
  id?: string;
  disabled: boolean;
  displayText?: string;
  icon?: ListMenuIcon;
  route?: string;
  routeDirection?: 'back' | 'forward' | 'root';
  onClick?: (args: any) => {};
  items?: ListMenuItems;
}

export interface ListMenuIcon {
  type: 'css' | 'img';
  definition: string; // If Css, specify class, if Img, specify path
}

export function matchRouter(
  route: ActivatedRoute|any,
  router: Router,
  navItem: ListMenuItem
): ListMenuItem {
  const urlArray = convertUrlToArray(router.url);
  let urlPath: string = '';
  urlArray.forEach((rt, x) => {
    if (urlArray.length !== x + 1) urlPath += `/${rt}`;
  });
  if (route.routeConfig.children.length > 0)
    route.routeConfig.children.forEach((child:any) => {
      if (child.path === navItem.id) {
        urlPath += `/${child.path}`;
        navItem.disabled = false;
      }
    });
  navItem.route = urlPath;
  return navItem;
}

/**
 * Converts a camelized string into all lower case separated by underscores.
 *
 ```javascript
 decamelize('innerHTML');         // 'inner_html'
 decamelize('action_name');       // 'action_name'
 decamelize('css-class-name');    // 'css-class-name'
 decamelize('my favorite items'); // 'my favorite items'
 ```

 @method decamelize
 @param {String} str The string to decamelize.
 @return {String} the decamelized string.
 */
export function decamelize(str: string) {
  return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

/**
 Replaces underscores, spaces, or camelCase with dashes.

 ```javascript
 dasherize('innerHTML');         // 'inner-html'
 dasherize('action_name');       // 'action-name'
 dasherize('css-class-name');    // 'css-class-name'
 dasherize('my favorite items'); // 'my-favorite-items'
 ```

 @method dasherize
 @param {String} str The string to dasherize.
 @return {String} the dasherized string.
 */
export function dasherize(str: any) {
  return decamelize(str || '').replace(STRING_DASHERIZE_REGEXP, '-');
}

/**
 Returns the lowerCamelCase form of a string.

 ```javascript
 camelize('innerHTML');          // 'innerHTML'
 camelize('action_name');        // 'actionName'
 camelize('css-class-name');     // 'cssClassName'
 camelize('my favorite items');  // 'myFavoriteItems'
 camelize('My Favorite Items');  // 'myFavoriteItems'
 ```

 @method camelize
 @param {String} str The string to camelize.
 @return {String} the camelized string.
 */
export function camelize(str: string) {
  return str
    .replace(STRING_CAMELIZE_REGEXP, (_match: any, _separator: any, chr: string) => {
      return chr ? chr.toUpperCase() : '';
    })
    .replace(/^([A-Z])/, (match: string) => match.toLowerCase());
}

/**
 Returns the UpperCamelCase form of a string.

 ```javascript
 'innerHTML'.classify();          // 'InnerHTML'
 'action_name'.classify();        // 'ActionName'
 'css-class-name'.classify();     // 'CssClassName'
 'my favorite items'.classify();  // 'MyFavoriteItems'
 ```

 @method classify
 @param {String} str the string to classify
 @return {String} the classified string
 */
export function classify(str: string) {
  return str
    .split('.')
    .map((part: any) => capitalize(camelize(part)))
    .join('.');
}

/**
 More general than decamelize. Returns the lower\_case\_and\_underscored
 form of a string.

 ```javascript
 'innerHTML'.underscore();          // 'inner_html'
 'action_name'.underscore();        // 'action_name'
 'css-class-name'.underscore();     // 'css_class_name'
 'my favorite items'.underscore();  // 'my_favorite_items'
 ```

 @method underscore
 @param {String} str The string to underscore.
 @return {String} the underscored string.
 */
export function underscore(str: string) {
  return str
    .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
    .replace(STRING_UNDERSCORE_REGEXP_2, '_')
    .toLowerCase();
}

/**
 Returns the Capitalized form of a string

 ```javascript
 'innerHTML'.capitalize()         // 'InnerHTML'
 'action_name'.capitalize()       // 'Action_name'
 'css-class-name'.capitalize()    // 'Css-class-name'
 'my favorite items'.capitalize() // 'My favorite items'
 ```

 @method capitalize
 @param {String} str The string to capitalize.
 @return {String} The capitalized string.
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function group(name: any, group: any) {
  return group ? `${group}/${name}` : name;
}

export function featurePath(group: any, flat: any, path: any, name: any) {
  if (group && !flat) {
    return `../../${path}/${name}/`;
  }
  return group ? `../${path}/` : './';
}

export function getUserInitials(name: string): string {
  let initials = '';
  name?.split(' ').forEach((n) => (initials += n[0]));
  return initials;
}

export function loremIpsum() {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}

export function isNull(value: any) {
  return value === null;
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export function isNumberFinite(value: any) {
  return isNumber(value) && isFinite(value);
}

export function isVowel(letter: string): boolean {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return vowels.indexOf(letter) !== -1;
}

export function ucFirst(text: string) {
  const [part, ...split] = text.split(/\s/g);

  const ucd = part
    .toLowerCase()
    .split(/(?=['|-])/g)
    .map(
      (word: any) =>
      word.indexOf('-') + word.indexOf("'") > -2
        ? word.slice(0, 2).toUpperCase() + word.slice(2)
        : word.slice(0, 1).toUpperCase() + word.slice(1)
    )
    .join('');

  return [ucd, ...split].join(' ');
}

export function applyPrecision(num: number, precision: number) {
  if (precision <= 0) {
    return Math.round(num);
  }

  const tho = 10 ** precision;

  return Math.round(num * tho) / tho;
}

export function extractDeepPropertyByMapKey(obj: any, map: string): any {
  const keys = map.split('.');
  const head = keys.shift();

  return keys.reduce((prop: any, key: string) => {
    return !isUndefined(prop) && !isNull(prop) && !isUndefined(prop[key]) ? prop[key] : undefined;
  }, obj[head || '']);
}

export function extractDeepPropertyByParentMapKey(obj: any, map: string): any {
  const keys = map.split('.');
  const tail = keys.pop();
  const props = extractDeepPropertyByMapKey(obj, keys.join('.'));

  return { props, tail };
}

export function getKeysTwoObjects(obj: any, other: any): any {
  return [...Object.keys(obj), ...Object.keys(other)].filter((key, index, array) => array.indexOf(key) === index);
}

export function isDeepEqual(obj: any, other: any): any {
  if (!isObject(obj) || !isObject(other)) {
    return obj === other;
  }

  return getKeysTwoObjects(obj, other).every(
    (key: any): boolean => {
      if (!isObject(obj[key]) && !isObject(other[key])) {
        return obj[key] === other[key];
      }
      if (!isObject(obj[key]) || !isObject(other[key])) {
        return false;
      }

      return isDeepEqual(obj[key], other[key]);
    }
  );
}

export function upperFirst(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}


export function leftPad(str: string, len: number = 0, ch: any = ' ') {
  str = String(str);
  ch = toString(ch);
  let i = -1;
  const length = len - str.length;

  while (++i < length && str.length + ch.length <= len) {
    str = ch + str;
  }

  return str;
}

export function rightPad(str: string, len: number = 0, ch: any = ' ') {
  str = String(str);
  ch = toString(ch);

  let i = -1;
  const length = len - str.length;

  while (++i < length && str.length + ch.length <= len) {
    str += ch;
  }

  return str;
}

export function toString(value: number | string) {
  return `${value}`;
}


export function pad(str: string, len: number = 0, ch: any = ' '): string {
  str = String(str);
  ch = toString(ch);
  let i = -1;
  const length = len - str.length;

  let left = true;
  while (++i < length) {
    const l = str.length + ch.length <= len ? str.length + ch.length : str.length + 1;

    if (left) {
      str = leftPad(str, l, ch);
    } else {
      str = rightPad(str, l, ch);
    }

    left = !left;
  }

  return str;
}


export function setValidValue(value: any){
  return isNullOrUndefined(value) ? null : value;
}


export function modifiedDate(value: any){
	const dt = new Date(value);
	const daySince = Math.floor(Math.abs(getDateTimeDiff('day', dt, false)));
	const hrSince = Math.floor(Math.abs(getDateTimeDiff('hr', dt, false)));
	const minSince = Math.floor(Math.abs(getDateTimeDiff('min', dt, false)));
	const secSince = Math.floor(Math.abs(getDateTimeDiff('sec', dt, false)));

	if (secSince < 60) {
		return `${secSince} sec ago`;
	} else if (minSince < 60) {
		return `${minSince} min ago`;
	} else if (hrSince < 24) {
		return `${hrSince} hr ago`;
	} else if (hrSince >= 24 && hrSince <= 48) {
		return `Yesterday`;
	} else if (daySince < 29) {
		return `${daySince} days ago`;
	} else {
		return dt.toLocaleDateString();
	}
}
