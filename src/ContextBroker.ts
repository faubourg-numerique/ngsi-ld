import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { Entity } from "./Entity.js";
import { Subscription } from "./Subscription.js";

export class ContextBroker {
    private axiosInstance: AxiosInstance;

    constructor(url: string, contextUrl?: string) {
        this.axiosInstance = axios.create({
            baseURL: `${url}/ngsi-ld/v1`,
            headers: {
                ...(contextUrl && { Link: `<${contextUrl}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"` })
            }
        });
    }

    async findEntities({ type, query, limit, offset }: { type?: string, query?: string, limit?: number, offset?: number }): Promise<Entity[]> {
        const config: AxiosRequestConfig = {
            params: {
                type: type ?? undefined,
                q: query ?? undefined,
                limit: limit ?? undefined,
                offset: offset ?? undefined
            }
        };
        const response = await this.axiosInstance.get("/entities", config);
        return response.data.map((entity: any) => new Entity(entity));
    }

    async findEntity(id: string) {
        const response = await this.axiosInstance.get(`/entities/${encodeURIComponent(id)}`);
        return new Entity(response.data);
    }

    async insertEntity(entity: Entity) {
        await this.axiosInstance.post("/entities", entity.toObject());
    }

    async updateEntity(entity: Entity) {
        await this.axiosInstance.put(`/entities/${encodeURIComponent(entity.getId())}`, entity.toObject());
    }

    async updateEntityLegacy(entity: Entity) {
        await this.axiosInstance.post(`/entities/${encodeURIComponent(entity.getId())}/attrs`, entity.toObject());
    }

    async updateEntityAttribute(entity: Entity, name: string) {
        await this.axiosInstance.put(`/entities/${encodeURIComponent(entity.getId())}/attrs/${encodeURIComponent(name)}`, entity.data[name]);
    }

    async findSubscriptions({ limit, offset }: { limit?: number, offset?: number }): Promise<Subscription[]> {
        const config: AxiosRequestConfig = {
            params: {
                limit: limit ?? undefined,
                offset: offset ?? undefined
            }
        };
        const response = await this.axiosInstance.get("/subscriptions", config);
        return response.data.map((subscription: any) => new Subscription(subscription));
    }

    async findSubscription(id: string) {
        const response = await this.axiosInstance.get(`/subscriptions/${encodeURIComponent(id)}`);
        return new Subscription(response.data);
    }

    async insertSubscription(subscription: Subscription) {
        await this.axiosInstance.post("/subscriptions", subscription.toObject());
    }

    async deleteSubscription(subscriptionId: string) {
        await this.axiosInstance.delete(`/subscriptions/${subscriptionId}`);
    }
}
