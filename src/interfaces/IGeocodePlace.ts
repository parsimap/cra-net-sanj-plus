export default interface IGeocodePlace {
  short_title: string;
  title: string;
  center: { lng: number; lat: number };
  area_id: string;
  // area_name: string;
  // certainty: number;
  // code: string;
  // en_area_name: string;
  // last_item_code: null;
  last_item_type?: number;
  postalCodeError?: {
    accuracyRadius: number
  };
  // search_text: string;
  // local_name: null;
  start_location: { lng: number; lat: number };
  end_location: { lng: number; lat: number };
}