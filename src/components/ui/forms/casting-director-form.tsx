"use client";
import { useState, useEffect } from "react";
import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { getProductionPairs } from "@/lib/api/productions";
import { useDataContext } from "@/context/data-context";

export interface CastingDirectorExtras {
  pid: string;
  productionCode: string;
}

const CastingDirectorForm = ({ user }: FormProps) => {
  const [castingDirectorExtras, setCastingDirectorExtras] =
    useState<CastingDirectorExtras>({
      pid: "",
      productionCode: "",
    });
  const [productionPairs, setProductionPairs] = useState<
    Record<string, string>
  >({});
  const [productionId, setProductionId] = useState<string>(() => {
    return sessionStorage.getItem("productionId") || "";
  }); // | DO NOT TOUCH

  const { upliftData } = useDataContext();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setProductionId(selectedValue);
    sessionStorage.setItem("productionId", selectedValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCastingDirectorExtras((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = () => {
    const prodId: string | null = sessionStorage.getItem("productionId");
    if (prodId) {
      castingDirectorExtras.pid = prodId;
    }

    upliftData(castingDirectorExtras);
  };

  useEffect(() => {
    getProductionPairs()
      .then(setProductionPairs)
      .catch((error) =>
        console.error("Failed to load production pairs:", error)
      );
  }, []);

  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
      <div className="mt-6 flex flex-col items-center justify-between w-full max-w-md mx-auto flex-wrap gap-10">
        <DropdownMenu
          record={productionPairs}
          title="Select your production"
          change={handleSelect}
          disabled={false}
        />
        <div className="form">
          <label>Production code</label>
          <input
            className="finput"
            type="text"
            name="productionCode"
            onChange={handleChange}
          />
          <span className="iborder"></span>
        </div>
        <button className="submit" onClick={handleSubmit}>
          <span className="text-white">Sign in</span>
          <span className="text-black">Welcome</span>
        </button>
      </div>
    </div>
  );
};

export default CastingDirectorForm;
