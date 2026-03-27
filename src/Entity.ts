export class Entity {
    data: any = {
        id: "",
        type: ""
    };

    constructor(data?: any) {
        if (data) {
            Object.assign(this.data, data);
        }
    }

    getId(): string {
        return this.data.id;
    }

    getType(): string {
        return this.data.type;
    }

    setId(id: string) {
        this.data.id = id;
    }

    setType(type: string) {
        this.data.type = type;
    }

    isAttribute(name: string): boolean {
        return this.data[name] && this.data[name].type;
    }

    isProperty(name: string) {
        return this.data[name]?.type === "Property";
    }

    isRelationship(name: string) {
        return this.data[name]?.type === "Relationship";
    }

    isGeoProperty(name: string) {
        return this.data[name]?.type === "GeoProperty";
    }

    getProperty(name: string) {
        return this.isProperty(name) ? this.data[name].value : null;
    }

    getRelationship(name: string) {
        return this.isRelationship(name) ? this.data[name].object : null;
    }

    getGeoProperty(name: string) {
        return this.isGeoProperty(name) ? { type: this.data[name].value.type, coordinates: this.data[name].value.coordinates } : null;
    }

    setProperty(name: string, value: any, observedAt?: string) {
        if (!this.isAttribute(this.data[name])) {
            this.data[name] = {};
        }
        delete this.data[name].object;
        this.data[name].type = "Property";
        this.data[name].value = value;
        if (observedAt) {
            this.data[name].observedAt = observedAt;
        }
    }

    setRelationship(name: string, object: string | string[], observedAt?: string) {
        if (!this.isAttribute(this.data[name])) {
            this.data[name] = {};
        }
        delete this.data[name].value;
        this.data[name].type = "Relationship";
        this.data[name].object = object;
        if (observedAt) {
            this.data[name].observedAt = observedAt;
        }
    }

    setGeoProperty(name: string, type: string, coordinates: any, observedAt?: string) {
        if (!this.isAttribute(this.data[name])) {
            this.data[name] = {};
        }
        delete this.data[name].object;
        this.data[name].type = "GeoProperty";
        this.data[name].value = { type, coordinates };
        if (observedAt) {
            this.data[name].observedAt = observedAt;
        }
    }

    toObject() {
        return this.data;
    }
}
