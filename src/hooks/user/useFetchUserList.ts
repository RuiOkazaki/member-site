import { useState } from "react";
import { User } from "src/modules/user/user.entity";
import { userRepository } from "src/modules/user/user.repository";

export const useFetchMembers = () => {
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
