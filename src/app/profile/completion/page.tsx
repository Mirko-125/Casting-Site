"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  BaseUserResponse,
  getUserByRegistrationToken,
  uploadProfilePhoto,
  getProfilePhoto,
  getProfilePhotoMetadata,
} from "@/lib/api/users";
import { useSessionStorage } from "@/hooks/sessionstorage";
import "flag-icons/css/flag-icons.min.css";
import { HoverTooltip } from "@/components/ui/overlays/hover-tooltip"; // client component
import Image from "next/image";
import contact from "@/assets/svgs/contact.svg";
import {
  RoleSpecificFormSelector,
  UserRole,
} from "@/components/ui/forms/role-specific-form-selector";
import { useDataContext } from "@/context/DataContext";

const Page = () => {
  const [token] = useSessionStorage("registration_token", "");
  const [user, setUser] = useState<BaseUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { latestPayload } = useDataContext();
  const [pfpMetadata, setPfpMetadata] = useState<string>("");

  useEffect(() => {
    if (!latestPayload) return;
    console.log(user);
    console.log(pfpMetadata);
    console.log(latestPayload);
  }, [latestPayload]);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const uploadedFilename = await uploadProfilePhoto(userId, file);
      if (uploadedFilename) {
        const newPreviewUrl = await getProfilePhoto(userId);
        const imageMetadata = await getProfilePhotoMetadata(userId);
        setPreviewUrl(newPreviewUrl);
        if (imageMetadata) setPfpMetadata(imageMetadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchInitialPreview = async () => {
        try {
          const initialUrl = await getProfilePhoto(user.id);
          if (initialUrl) {
            // Only set previewUrl if it's not null
            setPreviewUrl(initialUrl);
          }
        } catch (error) {
          console.error("Error fetching initial preview:", error);
        }
      };

      fetchInitialPreview();
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    getUserByRegistrationToken(token)
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
                  <span className="hidden">{`E-Mail: ${user.eMail}\nPhone: ${user.phoneNumber}`}</span>
                </div>
              </HoverTooltip>
            </div>
            <div className="flex flex-col items-center justify-around h-full gap-6">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] border-[5px] border-[#83a088] bg-[#FFFFFF] transition-[background-color,border-color,box-shadow] m-[16px] sm:m-[20px] md:m-[23px]">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(event) => onFileChange(event, user.id)}
                />
                {previewUrl && (
                  <Image
                    key={previewUrl}
                    src={previewUrl}
                    alt="Alt image"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
              </div>
              <button type="button" className="submit" onClick={onButtonClick}>
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
              <div className="flex flex-col justify-end w-full max-w-md">
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
        <div className="flex flex-col items-center justify-center flex-grow mt-16 ">
          <RoleSpecificFormSelector
            role={user.position as UserRole}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
