import { useState } from "react";

import { RadioButtonsHorisontal } from "@/components/ui/buttons/radio-buttons/radio-buttons-horisontal";
import { RadioButtonsVertical } from "@/components/ui/buttons/radio-buttons/radio-buttons-vertical";
import { SignUpValidation } from "@/components/util/data-validation/sign-up-validation"; // client component
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { countries } from "@/misc/countries-list";

interface SignUpProps {
  redirectionSwitch: () => void;
}

interface UserData {
  fullname: string;
  username: string;
  nationality: string;
  gender: string;
  email: string;
  phonenumber: string;
  passphrase: string;
  passphrasetwice: string;
  position: string;
}

const SignUp = (props: SignUpProps) => {
  const [nationality, setNationality] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    username: "",
    nationality: "",
    gender: "",
    email: "",
    phonenumber: "",
    passphrase: "",
    passphrasetwice: "",
    position: "",
  });

  const [hasSubmited, setSubmition] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((fd) => ({ ...fd, [name]: value }));
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value: string = event.target.value;
    setNationality(value);
  };

  const handleSubmit = () => {
    userData.nationality = nationality;
    userData.gender = gender;
    userData.position = position;
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
        <label className="text-white text-3xl">Sign up</label>
        <div className="text-white mt-16 flex flex-col items-center gap-[1rem]">
          <div className="form">
            <label>Full name</label>
            <input
              className="finput"
              type="text"
              name="fullname"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <div className="form">
            <label>Username</label>
            <input
              className="finput"
              type="text"
              name="username"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <DropdownMenu
            record={countries}
            title="Select a country"
            change={selectChange}
          />
          <RadioButtonsHorisontal
            title="Gender"
            selected={gender}
            name="gender"
            change={(e) => setGender(e.target.value)}
            options={[
              { value: "f", label: "♀" },
              { value: "m", label: "♂" },
            ]}
          />
          <div className="form">
            <label>E-mail</label>
            <input
              className="finput"
              type="text"
              name="email"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <div className="form">
            <label>Phone number</label>
            <input
              className="finput"
              type="text"
              name="phonenumber"
              onChange={handleChange}
              placeholder="+[code][your number]"
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
          <div className="form">
            <label>Confirm passphrase</label>
            <input
              className="finput"
              type="password"
              name="passphrasetwice"
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <RadioButtonsVertical
            title="Position"
            selected={position}
            name="position"
            change={(e) => setPosition(e.target.value)}
            options={[
              { value: "actor", label: "Actor" },
              { value: "producer", label: "Producer" },
              { value: "castingdirector", label: "Casting director" },
              { value: "director", label: "Director" },
            ]}
          />
          <button className="submit" onClick={handleSubmit}>
            <span className="text-white">Continue</span>
            <span className="text-black">Almost</span>
          </button>
          {hasSubmited && (
            <SignUpValidation user={userData} onDone={handleCallback} />
          )}
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-400">Already have an account?</p>
            <a
              onClick={props.redirectionSwitch}
              className="text-white hover:text-[#83a088] cursor-pointer hover:underline"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
