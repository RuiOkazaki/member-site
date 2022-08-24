/* eslint-disable @next/next/no-img-element */
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Layout } from "src/components/layout";
import { db } from "src/components/utils/libs/firebase";
import { User } from "src/components/utils/libs/firebase/index";

export const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getUsers = async () => {
        const colRef = collection(db, "users");
        const users = await getDocs(colRef);
        setUsers(users.docs.map((doc) => doc.data() as User));
      };
      getUsers();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <Layout>
      <div className="mt-4 flex gap-4">
        {users.map((user) => {
          const status = () => {
            switch (user.status) {
              case 1:
                return "登録済み";
              case 2:
                return "退会";
              default:
                return "未登録";
            }
          };

          return (
            <>
              <Link key={user.uid} href={`admin/${user.uid}`}>
                <a className="flex flex-col items-center justify-center gap-5 rounded-md bg-white py-6 px-4 shadow-md hover:cursor-pointer hover:bg-slate-50">
                  <img src={user.photoURL} alt={`${user.displayName}の画像`} className="h-16 w-16 rounded-full" />
                  <p className="w-40 truncate pt-1 text-center text-sm font-bold">{user.displayName}</p>
                  <div>{status()}</div>
                </a>
              </Link>
            </>
          );
        })}
      </div>
    </Layout>
  );
};
