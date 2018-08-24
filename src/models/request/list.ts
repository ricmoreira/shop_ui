export class List {
    per_page: number;
    page: number;
    sort: string;
    order: string;
    filter: Filter;

    constructor(per_page: number, page: number, sort="_id", order = "reverse", filter?: Filter) {
        this.per_page = per_page;
        this.page = page;
        this.sort = sort;
        this.order = order;
        this.filter = filter;
    }
}

export class Filter {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

// url example: http://products?per_page=10&page=1&sort=_id&order=normal
