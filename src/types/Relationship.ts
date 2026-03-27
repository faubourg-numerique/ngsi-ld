import type { GeoProperty } from "./GeoProperty.js";
import type { Property } from "./Property.js";

export type Relationship = {
    type: "Relationship";
    object: string | string[];
    [name: string]: any | Property | Relationship | GeoProperty;
}
