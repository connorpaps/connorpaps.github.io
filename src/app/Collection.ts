// Holds collection objects

export class Collection {
  "_id": string;
  "collection_name": string;
  "collection_description": string;
  "collection_user_id": String;
  "collection_image": {
    "collection_image_path": string;
    "collection_image_alt_text": string;
  };
  "date_created": Date;
}
