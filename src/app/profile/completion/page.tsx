"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserByToken, UserPartial } from "@/lib/api/users";
import { useSessionStorage } from "@/hooks/sessionstorage";
import "flag-icons/css/flag-icons.min.css";
import { HoverTooltip } from "@/components/ui/overlays/hover-tooltip"; // client component
import Image from "next/image";
import contact from "@/assets/svgs/contact.svg";
import {
  RoleSpecificFormSelector,
  UserRole,
} from "@/components/ui/forms/role-specific-form-selector";

const Page = () => {
  const [token] = useSessionStorage("registration_token", "");
  const [user, setUser] = useState<UserPartial | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    fetchUserByToken(token)
      .then((u) => {
        if (!u) {
          router.push("/");
        } else {
          setUser(u);
        }
      })
      .catch((err) => {
        console.error(err);
        router.push("/");
      })
      .finally(() => setLoading(false));
  }, [token, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold">Loading...</h1>
      </div>
    );
  if (!user) return null;
  return (
    <div>
      <div className="m-4 text-center text-7xl">Profile Completion</div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/*Splitter*/}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col justify-around h-full">
            {/*Imagery*/}
            <div className="m-10 flex items-center justify-around h-full">
              <div
                className={`text-[5rem] fi fi-${user.nationality.toLowerCase()}`}
              />
              <HoverTooltip>
                <div className="relative inline-block">
                  <Image
                    className="cursor-crosshair w-12 h-12"
                    src={contact}
                    alt="Contact"
                  />
                  <span className="hidden">{`Id: ${user.id}\nE-Mail: ${user.eMail}\nPhone: ${user.phoneNumber}`}</span>
                </div>
              </HoverTooltip>
            </div>
            <div className="flex flex-col items-center justify-around h-full gap-6">
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] border-[5px] border-[#83a088] bg-[#FFFFFF] transition-[background-color,border-color,box-shadow] m-[16px] sm:m-[20px] md:m-[23px]" />
              <button
                className="submit"
                onClick={() => console.log("you can do it")}
              >
                <span className="text-white">Upload your picture</span>
                <span className="text-black">Go for it!</span>
              </button>
            </div>
          </div>
          <div className="text-white mt-16 flex flex-col items-center gap-[1rem]">
            <div className="flex flex-col items-start w-full max-w-md">
              <label className="text-2xl text-[#999999]">
                Last name / First name
              </label>
              <label className="text-4xl">{user.lastName}</label>
              <label className="text-4xl">{user.firstName}</label>
            </div>

            <div className="flex flex-col w-full max-w-md">
              <label className="text-2xl text-[#999999]">Username</label>
              <label className="text-4xl">{user.username}</label>
            </div>

            <div className="flex flex-row w-full max-w-md">
              <div className="flex flex-col w-full max-w-md">
                <label className="text-2xl text-[#999999]">Sex</label>
                <label className="text-4xl">{user.gender.toUpperCase()}</label>
              </div>
              <div className="flex flex-col w-full max-w-md">
                <label className="text-2xl text-[#999999]">Nationality</label>
                <label className="text-4xl">{user.nationality}</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RoleSpecificFormSelector
            role={user.position as UserRole}
            identifier={user.username}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
