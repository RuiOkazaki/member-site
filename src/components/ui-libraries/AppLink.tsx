import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  title: string;
};
export const AppLink: FC<Props> = ({ href, title }) => {
  return (
    <Link href={`${href}`}>
      <a className="text-blue-800 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </Link>
  );
};
