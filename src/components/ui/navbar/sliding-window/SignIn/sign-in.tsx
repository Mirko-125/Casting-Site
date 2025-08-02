import { useState } from "react";

import { SignInValidation } from "@/components/util/data-validation/sign-in-validation"; // client component

interface SignInProps {
  redirectionSwitch: () => void;
}

interface UserData {
  identifier: string;
  passphrase: string;
}

const SignIn = (props: SignInProps) => {
  const [userData, setUserData] = useState<UserData>({
    identifier: "",
    passphrase: "",
  });
  const [hasSubmited, setSubmition] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmition(true);
  };

  const handleCallback = () => {
    setTimeout(() => {
      setSubmition(false);
    }, 3000);
  };

  return (
    <div className="mt-[32px]">
      <div className="flex flex-col items-center justify-center">
        <label className="text-white text-3xl">Sign in</label>
        <div className="text-white mt-16 flex flex-col items-center gap-[1rem]">
          <div className="form">
            <label>E-mail or username</label>
            <input
              className="finput"
              type="text"
              name="identifier"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <div className="form">
            <label>Passphrase</label>
            <input
              className="finput"
              type="password"
              name="passphrase"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <button className="submit" onClick={handleSubmit}>
            <span className="text-white">Sign in</span>
            <span className="text-black">Welcome</span>
          </button>
          {hasSubmited && (
            <SignInValidation user={userData} onDone={handleCallback} />
          )}
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-400">Don’t have an account?</p>
            <a
              onClick={props.redirectionSwitch}
              className="text-white hover:text-[#83a088] cursor-pointer hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
