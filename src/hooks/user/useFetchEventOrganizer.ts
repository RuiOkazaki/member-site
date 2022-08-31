import { useState } from "react";
import { User, userRepository } from "src/modules/user";

export const useFetchEventOrganizer = () => {
  const [organizer, setOrganizer] = useState<User | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEventOrganizer = async (uid: string) => {
    try {
      const res = await userRepository.findEventOrganizer(uid);
      setOrganizer(res);
    } catch (error) {
      console.log(error);
      setOrganizer(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchEventOrganizer, organizer, isLoading };
};
