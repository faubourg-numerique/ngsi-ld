# @dih-fbn/ngsi-ld

A lightweight TypeScript client designed to interact with NGSI-LD context brokers.

> [!WARNING]
> This package is currently under development for our organization's specific needs. It is not intended for production use yet and APIs may change.

## Installation

```
npm i @dih-fbn/ngsi-ld
```

## Usage

Import the library

```ts
import { ContextBroker, Entity } from "@dih-fbn/ngsi-ld";
```

Create a context broker instance

```ts
const contexBrokerUrl = "https://context-broker.example.com";
const contextUrl = "https://example.com/context.jsonld";
const contextBroker = new ContextBroker(contexBrokerUrl, contextUrl);
```

Get multiple entities

```ts
const cities = await contextBroker.findEntities({ type: "City" });
```

Get an entity

```ts
const paris = await contextBroker.findEntity("urn:ngsi-ld:City:paris");
```

Create an entity

```ts
const london = new Entity();
london.setId("urn:ngsi-ld:City:london");
london.setType("City");
london.setProperty("name", "London");
london.setGeoProperty("location", "Point", [-0.127758, 51.507351]);
london.setRelationship("hasCountry", "urn:ngsi-ld:Country:uk");
await contextBroker.insertEntity(london);
```

Update an entity

```ts
thermostat.setProperty("targetTemperature", 19, new Date().toISOString());
await contextBroker.updateEntity(london);
```

Update an entity attribute

```ts
sensor.setProperty("status", "ready", new Date().toISOString());
await contextBroker.updateEntityAttribute(sensor, "status");
```

Get subscriptions

```ts
const subscriptions = await contextBroker.findSubscriptions();
```

Get a subscription

```ts
const subscription = await contextBroker.findSubscription("urn:ngsi-ld:Subscription:00000000-0000-0000-0000-000000000000");
```

Create a subscription

```ts
const subscription = new Subscription(...);
await contextBroker.insertSubscription(subscription);
```

Delete a subscription

```ts
await contextBroker.deleteSubscription(subscription.getId());
```

## API specification

### ContextBroker

| Method                | Parameters                                                         | Return value            |
| --------------------- | ------------------------------------------------------------------ | ----------------------- |
| constructor           | url: string, contextUrl?: string                                   | ContextBroker           |
| findEntities          | { type?: string, query?: string, limit?: number, offset?: number } | Promise<Entity[]>       |
| findEntity            | id: string                                                         | Promise<Entity>         |
| insertEntity          | entity: Entity                                                     | Promise<void>           |
| updateEntity          | entity: Entity                                                     | Promise<void>           |
| updateEntityAttribute | entity: Entity, name: string                                       | Promise<void>           |
| findSubscriptions     | { limit?: number, offset?: number }                                | Promise<Subscription[]> |
| findSubscription      | id: string                                                         | Promise<Subscription>   |
| insertSubscription    | subscription: Subscription                                         | Promise<void>           |
| deleteSubscription    | subscriptionId: string                                             | Promise<void>           |

### Entity

| Method name     | Parameters                                                        | Return value                               |
| --------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| constructor     | data?: any                                                        | Entity                                     |
| getId           | —                                                                 | string                                     |
| getType         | —                                                                 | string                                     |
| setId           | id: string                                                        | void                                       |
| setType         | type: string                                                      | void                                       |
| isAttribute     | name: string                                                      | boolean                                    |
| isProperty      | name: string                                                      | boolean                                    |
| isRelationship  | name: string                                                      | boolean                                    |
| isGeoProperty   | name: string                                                      | boolean                                    |
| getProperty     | name: string                                                      | any \| null                                |
| getRelationship | name: string                                                      | string \| string[] \| null                 |
| getGeoProperty  | name: string                                                      | { type: string, coordinates: any } \| null |
| setProperty     | name: string, value: any, observedAt?: string                     | void                                       |
| setRelationship | name: string, object: string \| string[], observedAt?: string     | void                                       |
| setGeoProperty  | name: string, type: string, coordinates: any, observedAt?: string | void                                       |
| toObject        | —                                                                 | any                                        |
