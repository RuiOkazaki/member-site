import { useState } from "react";
import { Event } from "src/modules/event/event.entity";
import { eventRepository } from "src/modules/event/event.repository";

export const useFetchEventList = () => {
  const [eventList, setEventList] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEventList = async () => {
    try {
      const res = await eventRepository.find();
      setEventList(res);
    } catch (error) {
      console.log(error);
      setEventList([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchEventList, eventList, isLoading };
};
