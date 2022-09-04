import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { useFetchUser } from "src/hooks/user/useFetchUser";
import { MemberSNSLinks } from "src/components/feature/Member";

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
        <img src={user.photoURL} alt={`${user.displayName}の画像`} className="mr-8 mt-4 w-28 rounded-full" />
        <div className="flex">
          <div className="mt-4 flex grow flex-col items-start">
            <p className="pt-1 text-center text-2xl">{user.displayName}</p>
            {/* TODO: これをモーダル表示にしたい */}
            {/* <InteresstGroup field={user.field} fieldDetails={user.fieldDetails} /> */}
            <div className="rounded-lg py-1">
              <div className="mt-2">
                <p className="w-full line-clamp-2">{user.bio}</p>
              </div>
              {/* TODO: モーダル表示 */}
              {user.bio.length >= 100 && <div className="text-right">もっと見る</div>}
            </div>
            <MemberSNSLinks github={user.github} twitter={user.twitter} instagram={user.instagram} />
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
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
      </div>
    </div>
  );
};
