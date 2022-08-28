import { useState } from "react";
import { User, userRepository } from "src/modules/user";

export const useFetchUserList = () => {
  const [userList, setUserList] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await userRepository.find();
      setUserList(res);
    } catch (error) {
      console.log(error);
      setUserList([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUser, userList, isLoading };
};
