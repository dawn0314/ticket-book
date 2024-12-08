export interface TrackType {
  id: string;
  title: string;
}

export interface TrackDataType {
  artists: object;
  available_markets: object;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: object;
  ref: string;
  id: string;
  restrictions: object;
  name: string;
  preview_url: object;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}
