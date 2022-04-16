// class that holds the item data the user enters when creating a new item
export class NewItem {
    "item_title": string;
    "item_description": string;
    "item_user_id": String;
    "containing_collection_id": String;
    "item_image": 
    {
      "item_image_path": string;
      "item_image_alt_text": string;
    };
    "item_template": string;
    "item_templateNote": string;
    "item_storageType": string;
    "item_storageCode": string;
    "item_storageLocation": string;
    "item_storageNote": string;    
  }