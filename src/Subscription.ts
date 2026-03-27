export class Subscription {
    data: any = {
        id: ""
    };

    constructor(data?: any) {
        if (data) {
            Object.assign(this.data, data);
        }
    }

    getId(): string {
        return this.data.id;
    }

    setId(id: string) {
        this.data.id = id;
    }

    toObject() {
        return this.data;
    }
}
