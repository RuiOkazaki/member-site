import { useRouter } from "next/router";
import { useEffect } from "react";
import { Group, Spoiler, Text } from "@mantine/core";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { useFetchUser } from "src/hooks/user/useFetchUser";
import { FieldInterest, MemberSNSLinks } from "src/components/feature/Member";

export const MemberDetail = () => {
  const { fetchUser, user, isLoading } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetchUser(router.query.id as string);
    }
  }, [router.query.id]);

  if (isLoading || user == null) return <AppLoading />;

  // TODO: コンポーネントの再利用がレイアウト的にキツくてできなかったので、リファクタする
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col pt-5">
      <div className="flex items-start">
        <img
          src={user.photoURL}
          alt={`${user.displayName}の画像`}
          className="mr-8 mt-4 w-28 h-28 rounded-full object-cover"
        />

        <div className="flex">
          <div className="mt-4 flex grow flex-col items-start">
            <Text className="py-1 text-2xl" weight={500}>
              {user.displayName}
            </Text>
            {/* TODO: これをモーダル表示にしたい */}
            <FieldInterest field={user.field} />

            <div className="my-2">
              <Spoiler maxHeight={50} showLabel="もっと見る" hideLabel="隠す">
                <Text>{user.bio}</Text>
              </Spoiler>
            </div>
            {/* TODO: モーダル表示 */}
            <MemberSNSLinks github={user.github} twitter={user.twitter} instagram={user.instagram} />
          </div>
        </div>
      </div>

      <Group mt={40}>
        <div className="flex">
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.github}&count_private=true&langs_count=10&title_color=3382ed&text_color=ffffff&icon_color=3382ed&bg_color=0f172a&hide_border=true&locale=en&custom_title=Top%20%Languages`}
            alt="Top Languages"
          />
          <div className="mb-2 flex flex-col">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${user.github}&show_icons=true&hide=stars,contribs&count_private=true&title_color=3382ed&text_color=ffffff&icon_color=3382ed&bg_color=0f172a&hide_border=true&show_icons=true`}
              alt="github-readme-stats"
            />
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${user.github}&count_private=true&stroke=ffffff&background=0f172a&ring=3382ed&fire=3382ed&currStreakNum=ffffff&currStreakLabel=3382ed&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&hide_border=true`}
              alt="github-readme-streak-stats"
            />
          </div>
        </div>
        <img
          src={`https://activity-graph.herokuapp.com/graph?username=${user.github}&count_private=true&bg_color=0f172a&color=ffffff&line=3382ed&point=ffffff&area_color=0f172a&area=true&hide_border=true&custom_title=GitHub%20Commits%20Graph`}
          alt="GitHub Commits Graph"
        />
      </Group>
    </div>
  );
};
