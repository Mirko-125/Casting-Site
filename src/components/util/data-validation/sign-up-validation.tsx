"useClient";

import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

import { BaseUser, registerBaseUser } from "@/lib/api/users";
import { useSessionStorage } from "@/hooks/sessionstorage";
import { regex } from "@/misc/regular-expressions";

interface UserData {
  // DTO | Data Transfer Object
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

interface SignUpValidationProps {
  user: UserData;
  onDone: () => void;
}

export const SignUpValidation = (props: SignUpValidationProps) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const didSubmit = useRef<boolean>(false);
  const [, setToken] = useSessionStorage("registration_token", "");

  const submit = async (props: SignUpValidationProps) => {
    if (didSubmit.current) {
      props.onDone();
      return; // | Better safe than sorry |
    }
    didSubmit.current = true;
    const [firstName, ...rest] = props.user.fullname.trim().split(" ");
    const lastName = rest.join(" ");
    const payload: BaseUser = {
      firstName,
      lastName,
      username: props.user.username,
      nationality: props.user.nationality,
      gender: props.user.gender,
      phoneNumber: props.user.phonenumber,
      email: props.user.email,
      passHash: props.user.passphrase,
      position: props.user.position,
    };
    try {
      const response = await registerBaseUser(payload);
      if (!response.ok) {
        const ct = response.headers.get("content-type") || "";
        let errMsg = `Request failed with status ${response.status}`;
        if (ct.includes("application/json")) {
          try {
            const body = (await response.json()) as { message?: string };
            errMsg = body.message ?? errMsg;
          } catch {
            // JSON parse failed, keep fallback message | fix when polishing
          }
        } else {
          errMsg = response.statusText || errMsg;
        }
        console.error("Signup error:", errMsg);
        setErrorMessage(errMsg);
        return;
      }
      const data = (await response.json()) as { token: string };
      setToken(data.token);
      router.push("/profile/completion");
    } catch (networkErr: unknown) {
      console.error("Network error or unexpected error:", networkErr);
      setErrorMessage("Network error, please try again.");
    } finally {
      props.onDone();
    }
  };

  useEffect(() => {
    try {
      if (
        Object.values(props.user).some((val) => regex.sqlinjection.test(val))
      ) {
        setErrorMessage("Nice try, script kiddy!");
        return;
      }
      if (
        Object.values(props.user).some(
          (val) => typeof val === "string" && !val.trim()
        )
      ) {
        setErrorMessage("Please fill in all the spaces");
      } else {
        if (!regex.fullname.test(props.user.fullname)) {
          setErrorMessage("Please write your full name correctly.");
          return;
        }
        if (!regex.username.test(props.user.username)) {
          setErrorMessage(
            "Usernames: 3–23 chars, start with a letter, only letters & underscores allowed."
          );
          return;
        }
        if (!regex.email.test(props.user.email)) {
          setErrorMessage(
            "Wrong e-mail format, please write a correct e-mail address."
          );
          return;
        }
        if (!regex.phone.test(props.user.phonenumber)) {
          setErrorMessage(
            'Invalid phone number, please follow the format "+[country code][your number]"'
          );
          return;
        }
        if (!regex.password.test(props.user.passphrase)) {
          setErrorMessage(
            "Passphrase: min 12 chars, include uppercase, lowercase, digit, special char, allow spaces, no whitespace only."
          );
          return;
        }
        if (!(props.user.passphrase === props.user.passphrasetwice)) {
          setErrorMessage("Passphrases don't match");
          return;
        }
        submit(props);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(String(error));
      }
    } finally {
      props.onDone();
    }
  }, [props.user, props.onDone, router]);
  return (
    <>
      {errorMessage && (
        <div className="text-rose-600 text-center">{errorMessage}</div>
      )}
    </>
  );
};
