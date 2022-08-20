import { List, Text } from "@mantine/core";
import { FC, Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { AppLink } from "src/components/ui-libraries/AppLink";
import { BoxWithText } from "src/components/ui-libraries/BoxWithText";

const gitMaterialArray = [
  { title: "Git/Github | 基礎知識編", href: "https://techuni.notion.site/a917753f496443cbbfb07f3abf0e0c4e" },
  {
    title: "Git/Github | チーム開発編",
    href: "https://www.notion.so/techuni/Git-Github-cbbfaa52241f47b2884efd514ba6f78b",
  },
  { title: "チーム開発応用編", href: "https://www.notion.so/techuni/c5446e421de5414d82a9a72da0e11f9d" },
];

const encryptionMaterialArray = [
  { title: "第一回情報の科学勉強会", href: "https://www.notion.so/techuni/1-ba56a0b7ca314886be21df584b70a320" },
  { title: "第二回情報の科学勉強会", href: "https://www.notion.so/techuni/2-afe8310dfe5846d3bcbc3cfc521a75d0" },
  { title: "第三回情報の科学勉強会", href: "https://www.notion.so/techuni/3-24eb1618bb3042d5849fbdbaf3f0ade9" },
];

export const TeachingMaterial: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <Text component="span" align="center" size="xl" weight={700}>
          教材
        </Text>
        <BoxWithText
          title="アルゴリズム"
          content={
            <div className="mt-2">
              <AppLink href="https://github.com/TechUni2020/lesson01">lesson01</AppLink>
            </div>
          }
        />
        <BoxWithText
          title="Git"
          content={
            <List withPadding listStyleType="disc">
              {gitMaterialArray.map((material) => {
                return (
                  <List.Item key={material.title}>
                    <AppLink href={material.href}>{material.title}</AppLink>
                  </List.Item>
                );
              })}
            </List>
          }
        />
        <BoxWithText
          title="暗号"
          content={
            <List withPadding listStyleType="disc">
              {encryptionMaterialArray.map((material) => {
                return (
                  <List.Item key={material.title}>
                    <AppLink href={material.href}>{material.title}</AppLink>
                  </List.Item>
                );
              })}
            </List>
          }
        />
        <BoxWithText
          title="初学者"
          content={
            <div className="mt-2">
              <AppLink href="https://www.notion.so/techuni/5066ce8f2453419faaec8008002ce623">
                エンジニア一年目とか関係なく知っておきたいこと
              </AppLink>
            </div>
          }
        />
      </Suspense>
    </Layout>
  );
};
