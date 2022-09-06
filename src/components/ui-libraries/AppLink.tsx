import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export const AppLink: FC<Props> = ({ href, children, className }) => {
  return (
    <Link href={`${href}`}>
      <a className={`text-blue-800 hover:text-blue-700 ${className}`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Link>
  );
};
