export class Entry {
    id: number;
    date: Date;
    url: string;
    username: string;
    password: string;

    constructor() {
        this.id = -1;
        this.date = new Date();
        this.url = '';
        this.username = '';
        this.password = '';
    }
}