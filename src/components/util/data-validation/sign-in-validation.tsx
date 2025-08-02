"useClient";

import { useEffect, useState } from "react";

import { regex } from "@/misc/regular-expressions";

interface UserData {
  // DTO | Data Transfer Object
  identifier: string;
  passphrase: string;
}

interface SignInValidationProps {
  user: UserData;
  onDone: () => void;
}

export const SignInValidation = (props: SignInValidationProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    try {
      if (
        Object.values(props.user).some((val) => regex.sqlinjection.test(val))
      ) {
        setErrorMessage("Nice try, script kiddy!");
        props.onDone();
        return;
      }
      if (
        Object.values(props.user).some(
          (val) => typeof val === "string" && !val.trim()
        )
      ) {
        setErrorMessage("Please fill in all the spaces");
      } else {
        // api block
        console.log("good2go");
      }
      props.onDone();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        props.onDone();
      } else {
        setErrorMessage(String(error));
        props.onDone();
      }
    }
  }, [props.user, props.onDone]);
  return (
    <>{errorMessage && <div className="text-rose-600">{errorMessage}</div>}</>
  );
};
