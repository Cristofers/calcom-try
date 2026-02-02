export interface CreateEventTypeInput {
  title: string;
  slug: string;
  lengthInMinutes: number;
}

export interface EventTypeData {
  id: number;
  title: string;
  slug: string;
  lengthInMinutes: number;
  description: string;
  locations?: Array<{
    type: string;
    link?: string;
  }>;
}

export interface ActionResult {
  success: boolean;
  data?: EventTypeData;
  error?: string;
}

export interface EventType {
  id: number;
  title: string;
  slug: string;
  lengthInMinutes: number;
  description: string;
  locations?: Array<{
    type: string;
    link?: string;
  }>;
}

export interface TimeSlot {
  time: string;
}

export interface AvailableSlot {
  date: string;
  slots: TimeSlot[];
}

export interface Attendee {
  name: string;
  email: string;
  timeZone: string;
}

export interface Booking {
  id: number;
  uid: string;
  title: string;
  status: string;
  startTime: string;
  endTime: string;
  location: string;
  eventType: {
    id: number;
    slug: string;
  };
  attendees: Attendee[];
}
