import type { EntitySelector } from "./EntitySelector.js";
import type { GeoQuery } from "./GeoQuery.js";
import type { NotificationParams } from "./NotificationParams.js";
import type { TemporalQuery } from "./TemporalQuery.js";

export type Subscription = {
    id?: string;
    type?: "Subscription";
    subscriptionName?: string;
    description?: string;
    entities?: EntitySelector[];
    watchedAttributes?: string[];
    notificationTrigger?: string[];
    timeInterval?: number;
    q?: string;
    geoQ?: GeoQuery;
    csf?: string;
    isActive?: boolean;
    notification?: NotificationParams;
    expiresAt?: string;
    throttling?: number;
    temporalQ?: TemporalQuery;
    scopeQ?: string;
    lang?: string;
}
