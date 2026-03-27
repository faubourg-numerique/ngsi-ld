import type { KeyValuePair } from "./KeyValuePair.js";

export type Endpoint = {
    uri?: string;
    accept?: "application/json" | "application/ld+json" | "application/geo+json";
    timeout?: number;
    cooldown?: number;
    receiverInfo?: KeyValuePair[];
    notifierInfo?: KeyValuePair[];
}
