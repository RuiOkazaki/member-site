import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};
export const AppLink: FC<Props> = ({ href, children }) => {
  return (
    <Link href={`${href}`}>
      <a className="text-blue-800 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );
};
