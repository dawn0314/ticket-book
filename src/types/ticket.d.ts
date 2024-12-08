import { TrackType } from "./music";

export interface TicketInfoType {
  mainPhoto: number;
  photo: string[];
  title: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  selectedTracks: TrackType[];
  review: string;
}

export interface ExtendedTicketInfoType {
  id: string;
  photo: string[];
  createdAt?: number;
  userId?: string;
  username?: string;
  ticketInfo: TicketInfoType;
}
