import { collection, getDocs } from "firebase/firestore";
import { db } from "src/components/utils/libs/firebase";
import { Event } from ".";

export const eventRepository = {
  async find(): Promise<Event[]> {
    const studyMeetingRef = collection(db, "study-meeting");
    const res = await getDocs(studyMeetingRef);
    const events = res.docs.map((doc) => doc.data() as Event);
    return events;
  },
};
