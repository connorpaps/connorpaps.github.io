export class Template {
    "_id": String;
    "template_type": String;
    // Book fields
    "author": String;
    "date_published": String;
    "publisher": String;
    "format": String;
    "edition": String;
    "language": String;
    "pages": String;
    // Comic fields
    "year": String;
    "characters": [String];

    constructor() {
        this.template_type = "";
    }
}
