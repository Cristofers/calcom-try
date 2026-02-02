"use server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventType } from "@/app/actions/getEventType";
import { getAvailableSlots } from "@/app/actions/getAvailableSlots";
import { EventTypeView } from "./view";
import { getEventTypeLink } from "@/app/actions/getEventTypeLink";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventTypeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const eventType = await getEventType(id);
  if (!eventType) {
    return null;
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7); // Next 7 days

  const availableSlots = await getAvailableSlots(id, startDate, endDate);
  const eventTypeLink = await getEventTypeLink(id);
  return (
    <EventTypeView
      eventType={eventType}
      availableSlots={availableSlots}
      eventTypeID={id}
      eventTypeLink={eventTypeLink}
    />
  );
}
