// Holds item objects

export class Item {
    "_id": String;
    "containing_collection_id": String;
    "item_user_id": String;
    "item_title": String;
    "item_description": String;
    "template_object_id": String;
    "template_name": String;
    "condition": String;
    "condition_note": String;
    "storage_object_id": String;
    "storage_type": String;
    "storage_location": String;
    "storage_note": String;
    "date_created": Date;
    "date_last_updated": Date;
    "custom_fields": [{
        "key": Number,
        "value": String,
        "_id": String
    }];
    "item_images": [{
        "item_image_path": String,
        "item_image_text": String,
    }];

    constructor() {
        this._id = "";
        this.containing_collection_id = "";
        this.item_user_id = "";
        this.item_title = "";
        this.item_description = "";
        this.template_object_id = "";
        this.template_name = "";
        this.condition = "";
        this.condition_note = "";
        this.storage_object_id = "";
        this.storage_type = "";
        this.storage_location = "";
        this.date_created = new Date;
        this.date_last_updated = new Date;
        this.custom_fields = [{value: "0", key: 0, _id: ""}];
        this.item_images = [{item_image_path: "", item_image_text: ""}];
    }
}