import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/components/utils/libs/firebase";
import { User } from "./user.entity";

export const userRepository = {
  async find(): Promise<User[]> {
    const usersCol = collection(db, "users");
    const res = await getDocs(usersCol);
    const users = res.docs.map((doc) => doc.data() as User);
    return users;
  },

  async findOne(uid: string): Promise<User> {
    const userRef = doc(db, `users/${uid}`);
    const res = await getDoc(userRef);
    const user = res.data() as User;
    return user;
  },
};
