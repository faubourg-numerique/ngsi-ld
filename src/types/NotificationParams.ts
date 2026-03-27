import type { Endpoint } from "./Endpoint.js";

export type NotificationParams = {
    attributes?: string[];
    sysAttrs?: boolean;
    format?: "normalized" | "concise" | "keyValues";
    showChanges?: boolean;
    endpoint?: Endpoint;
    status?: "ok" | "failed";
}
