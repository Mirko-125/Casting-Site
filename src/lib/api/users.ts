import { address, registerBase, returnBase, uploadProfilePic, downloadProfilePic } from "@/misc/routes"

export interface BaseUser {
  firstName:   string;
  lastName:    string;
  username:    string;
  nationality: string;
  gender:      string;
  phoneNumber: string;
  email:       string;
  passHash:    string;
  position:    string;
}

export interface BaseUserResponse {
  id:          string;
  firstName:   string;
  lastName:    string;
  username:    string;
  nationality: string;
  gender:      string;
  phoneNumber: string;
  eMail:       string;
  position:    string;
}

export const registerBaseUser = async (
  dto: BaseUser
): Promise<Response> => {
  const res = await fetch(address + registerBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto),
    credentials: "include"
  });
  return res;
}

export const getUserByRegistrationToken = async (
  token: string
): Promise<BaseUserResponse | null> => {
  const res = await fetch(
    address + returnBase,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token })
    }
  );

  if (res.ok) {
    const data = (await res.json()) as BaseUserResponse | null;
    return data;
  } else if (res.status === 404) {
    return null;
  } else {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message || res.statusText);
  }
}

export const uploadProfilePhoto = async (userId: string, file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(address + uploadProfilePic +`?userId=${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    if (res.ok) {
        const data = await res.json();
        return data.filename || data.path || null;
    } else {
        const err = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message || res.statusText);
    }
}

export const getProfilePhoto = async (userId: string): Promise<string | null> => {
    const res = await fetch(address + downloadProfilePic +`?userId=${userId}`, {
        method: "GET",
    });

    if (res.ok) {
        const blob = await res.blob();
        return URL.createObjectURL(blob);
    } else if (res.status === 404) {
        return null;
    } else {
        const err = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message || res.statusText);
    }
  }