import type { GeoProperty } from "./GeoProperty.js";
import type { Relationship } from "./Relationship.js";

export type Property = {
    type: "Property";
    value: any;
    [name: string]: any | Property | Relationship | GeoProperty;
}
