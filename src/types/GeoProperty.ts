import type { LineString } from "./LineString.js";
import type { MultiLineString } from "./MultiLineString.js";
import type { MultiPoint } from "./MultiPoint.js";
import type { MultiPolygon } from "./MultiPolygon.js";
import type { Point } from "./Point.js";
import type { Polygon } from "./Polygon.js";
import type { Property } from "./Property.js";
import type { Relationship } from "./Relationship.js";

export type GeoProperty = {
    type: "GeoProperty";
    value: Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
    [name: string]: any | Property | Relationship | GeoProperty;
}
