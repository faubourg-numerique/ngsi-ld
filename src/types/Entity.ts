import type { GeoProperty } from "./GeoProperty.js";
import type { Property } from "./Property.js";
import type { Relationship } from "./Relationship.js";

export type Entity = {
    id: string;
    type: string;
    [name: string]: any | Property | Relationship | GeoProperty;
};
