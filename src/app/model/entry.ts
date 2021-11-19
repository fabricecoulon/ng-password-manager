export class Entry {
    id: number;
    date: Date;
    url: string;
    password: string;

    constructor() {
        this.id = -1;
        this.date = new Date();
        this.url = '';
        this.password = '';
    }
}