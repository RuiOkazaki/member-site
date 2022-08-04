import { FC, ReactNode } from "react";
import { GoogleIcon, GitHubIcon } from "src/components/ui-libraries/icon";
import { useAuth } from "src/hooks/useAuth";

type ButtonProps = {
  Icon: ReactNode;
  text: string;
  onClick: () => void;
};

const LoginButton: FC<ButtonProps> = ({ Icon, text, onClick }) => {
  return (
    <div
      className="flex gap-3 justify-center items-center py-2 px-4 mb-8 w-72 bg-gray-50  hover:bg-gray-100 rounded-2xl border border-gray-300 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {Icon}
      <p className="text-base font-bold">{`Login with ${text}`}</p>
    </div>
  );
};

export const Login: FC = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="pb-10 text-2xl font-bold text-center">ログインしてください</h1>
        <LoginButton Icon={<GoogleIcon />} text="Google" onClick={signInWithGoogle} />
        <LoginButton Icon={<GitHubIcon />} text="GitHub" onClick={signInWithGitHub} />
      </div>
    </div>
  );
};
