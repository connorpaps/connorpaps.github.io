// class that holds the collection data the user enters when creating a new collection
export class NewCollection {
  'collection_name': string;
  'collection_description': string;
  'collection_user_id': string;
  'collection_image': {
    collection_image_path: string;
    collection_image_alt_text: string;
  };
}
