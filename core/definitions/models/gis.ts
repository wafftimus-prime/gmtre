import { LatLngBoundsLiteral, LatLngLiteral } from "../types/gis";

export interface Geometry {
  location: LatLng;
  viewport: LatLngBounds;
}

export interface LatLngBounds {
  /** Returns true if the given lat/lng is in this bounds. */
  contains(latLng: LatLng | LatLngLiteral): boolean;

  /** Returns true if this bounds approximately equals the given bounds. */
  equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;

  /** Extends this bounds to contain the given point. */
  extend(point: LatLng | LatLngLiteral): LatLngBounds;

  /** Computes the center of this LatLngBounds */
  getCenter(): LatLng;

  /** Returns the north-east corner of this bounds. */
  getNorthEast(): LatLng;

  /** Returns the south-west corner of this bounds. */
  getSouthWest(): LatLng;

  /** Returns true if this bounds shares any points with the other bounds. */
  intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;

  /** Returns if the bounds are empty. */
  isEmpty(): boolean;

  /** Converts to JSON representation. This function is intended to be used via JSON.stringify. */
  toJSON(): LatLngBoundsLiteral;

  /** Converts the given map bounds to a lat/lng span. */
  toSpan(): LatLng;

  /** Converts to string. */
  toString(): string;

  /**
   * Returns a string of the form "lat_lo,lng_lo,lat_hi,lng_hi" for this bounds, where "lo" corresponds to the
   * southwest corner of the bounding box, while "hi" corresponds to the northeast corner of that box.
   */
  toUrlValue(precision?: number): string;

  /** Extends this bounds to contain the union of this and the given bounds. */
  union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
}

export interface LatLng {
  /** Comparison function. */
  equals(other: LatLng): boolean;
  /** Returns the latitude in degrees. */
  lat(): number;
  /** Returns the longitude in degrees. */
  lng(): number;
  /** Converts to string representation. */
  toString(): string;
  /** Returns a string of the form "lat,lng". We round the lat/lng values to 6 decimal places by default. */
  toUrlValue(precision?: number): string;
  /** Converts to JSON representation. This function is intended to be used via JSON.stringify. */
  toJSON(): LatLngLiteral;
}
