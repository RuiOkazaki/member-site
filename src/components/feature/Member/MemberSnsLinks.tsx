import { FC } from "react";
import { AppLink } from "src/components/ui-libraries/AppLink";
import { GitHubIcon, TwitterIcon, InstagramIcon } from "src/components/ui-libraries/icon";

type MemberSNSLinkProps = {
  github: string | undefined;
  twitter: string | undefined;
  instagram: string | undefined;
};

export const MemberSNSLinks: FC<MemberSNSLinkProps> = ({ github, twitter, instagram }) => {
  const snsTags = [
    { name: "github", url: github, icon: <GitHubIcon /> },
    { name: "twitter", url: twitter, icon: <TwitterIcon /> },
    { name: "instagram", url: instagram, icon: <InstagramIcon /> },
  ];

  const filterSnsTags = snsTags.filter((sns) => {
    if (sns.url !== "") return sns;
  });

  return (
    <div className="flex">
      {filterSnsTags.map((snsTag, index) => {
        return (
          <AppLink key={index} href={`https://${snsTag.name}.com/${snsTag.url}`} className={"mr-4"}>
            {snsTag.icon}
          </AppLink>
        );
      })}
    </div>
  );
};
