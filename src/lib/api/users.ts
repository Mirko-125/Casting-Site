import { address, registerBase, returnBase } from "@/misc/routes"

export interface UserDraft {
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

export interface UserPartial {
  id:          number;
  firstName:   string;
  lastName:    string;
  username:    string;
  nationality: string;
  gender:      string;
  phoneNumber: string;
  eMail:       string;
  position:    string;
}

export const startDraftUser = async (
  dto: UserDraft
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

export const fetchUserByToken = async (
  token: string
): Promise<UserPartial | null> => {
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
    const data = (await res.json()) as UserPartial | null;
    return data;
  } else if (res.status === 404) {
    return null;
  } else {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message || res.statusText);
  }
}