"use client";
import { useState, useEffect } from "react";

import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { useDataContext } from "@/context/data-context";
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { getProductionPairs } from "@/lib/api/productions";

export interface DirectorExtras {
  dateOfBirth: string;
  bio: string;
  pid: string;
}

const DirectorForm = ({ user }: FormProps) => {
  const [directorExtras, setDirectorExtras] = useState<DirectorExtras>({
    dateOfBirth: "",
    bio: "",
    pid: "",
  });
  const [productionPairs, setProductionPairs] = useState<
    Record<string, string>
  >({});
  const [productionId, setProductionId] = useState<string>(() => {
    return sessionStorage.getItem("productionId") || "";
  }); // | DO NOT TOUCH
  const { upliftData } = useDataContext();

  useEffect(() => {
    getProductionPairs()
      .then(setProductionPairs)
      .catch((error) =>
        console.error("Failed to load production pairs:", error)
      );
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setProductionId(selectedValue);
    sessionStorage.setItem("productionId", selectedValue);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setDirectorExtras((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = () => {
    const prodId: string | null = sessionStorage.getItem("productionId");
    if (prodId) {
      directorExtras.pid = prodId;
    }
    upliftData(directorExtras);
  };

  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
      <div className="mt-6 flex flex-col items-center justify-between w-full max-w-md mx-auto flex-wrap gap-5">
        <div className="form">
          <label className="text-[#999999]">Date of birth</label>
          <input
            className="finput"
            max="2008-1-1"
            type="date"
            id="name"
            name="dateOfBirth"
            onChange={handleChange}
          />
          <span className="iborder"></span>
        </div>
        <div className="form">
          <label className="text-[#999999]">Bio</label>
          <textarea
            className="finput"
            name="bio"
            rows={5}
            placeholder="Write your bio here..."
            maxLength={2000}
            onChange={handleChange}
          />
          <span className="iborder"></span>
        </div>
        <DropdownMenu
          record={productionPairs}
          title="Select your production"
          change={handleSelect}
          disabled={false}
        />
        <button type="button" className="submit" onClick={handleSubmit}>
          <span className="text-white">Register your account</span>
          <span className="text-black">Enjoy your stay</span>
        </button>
      </div>
    </div>
  );
};

export default DirectorForm;
