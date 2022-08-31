import { useState } from "react";
import { User, userRepository } from "src/modules/user";

export const useFetchUser = () => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async (uid: string) => {
    try {
      const res = await userRepository.findOne(uid);
      setUser(res);
    } catch (error) {
      console.log(error);
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUser, user, isLoading };
};
