import { address, registerBase, returnBase, uploadProfilePic, downloadProfilePic, registerActor, registerProducer, registerCastingDirector, registerDirector } from "@/misc/routes"
import { formatDateString } from "@/lib/helpers/datehelper";

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

export interface BaseUserCache {
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

export interface ActorDTO {
  height: number;
  weight: number;
  bio: string;
  dateOfBirth: string; 
}

export interface ProducerDTO {
  bio: string;
}

export interface CastingDirectorDTO {
  productionCode: string;
}

export interface DirectorDTO {
  bio: string;
  dateOfBirth: string; 
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

export const registerActorUser = async (
    actorData: ActorDTO
): Promise<Response> => {
    try {
        const formattedDate = formatDateString(actorData.dateOfBirth);
        const payload = {
            ...actorData,
            dateOfBirth: formattedDate
        };

        const res = await fetch(address + registerActor, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            credentials: "include" 
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Actor registration failed");
        }

        return res;
    } catch (error) {
        console.error("Actor registration error:", error);
        throw new Error((error as Error).message || "Network error");
    }
}

export const registerProducerUser = async (
  productionId: string,
  dto: ProducerDTO
): Promise<Response> => {
  const res = await fetch(address + registerProducer + "/" + productionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    let errMsg = "Failed to register producer";
    try {
      const errJson = await res.json();
      if (errJson?.message) errMsg = errJson.message;
    } catch {
    }
    throw new Error(errMsg);
  }
  return res;
};

export const registerCastingDirectorUser = async (
  productionId: string,
  dto: CastingDirectorDTO
): Promise<Response> => {

  const res = await fetch(address + registerCastingDirector + "/" + productionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    let errMsg = "Failed to register casting director";
    try {
      const errJson = await res.json();
      if (errJson?.message) errMsg = errJson.message;
    } catch {
    }
    throw new Error(errMsg);
  }
  return res;
};

export const registerDirectorUser = async (
  productionId: string,
  dto: DirectorDTO
): Promise<Response> => {

  const res = await fetch(address + registerDirector + "/" + productionId, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    let errMsg = "Failed to register casting director";
    try {
      const errJson = await res.json();
      if (errJson?.message) errMsg = errJson.message;
    } catch {
    }
    throw new Error(errMsg);
  }
  return res;
};