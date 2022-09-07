import { FC, ReactNode } from "react";
import { GoogleIcon } from "src/components/ui-libraries/icon";
import { useAuth } from "src/hooks/useAuth";

type ButtonProps = {
  Icon: ReactNode;
  text: string;
  onClick: () => void;
};

const LoginButton: FC<ButtonProps> = ({ Icon, text, onClick }) => {
  return (
    <div
      className="mb-8 flex w-72 cursor-pointer items-center justify-center gap-3 rounded-2xl border  border-gray-300 bg-gray-50 py-2 px-4 hover:bg-gray-100 hover:shadow-md"
      onClick={onClick}
    >
      {Icon}
      <p className="text-base font-bold">{`Login with ${text}`}</p>
    </div>
  );
};

export const Login: FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="pb-10 text-center text-2xl font-bold">ログインしてください</h1>
        <LoginButton Icon={<GoogleIcon />} text="Google" onClick={signInWithGoogle} />
        {/* <LoginButton Icon={<GitHubIcon />} text="GitHub" onClick={signInWithGitHub} /> */}
      </div>
    </div>
  );
};
