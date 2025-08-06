import { useState } from "react";

import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { useDataContext } from "@/context/data-context";

export interface ActorExtras {
  height: number;
  weight: number;
  dateOfBirth: Date;
  bio: string;
}

const ActorForm = ({ user }: FormProps) => {
  const [actorExtras, setActorExtras] = useState<ActorExtras>({
    height: 0,
    weight: 0,
    dateOfBirth: new Date(1910, 0, 1),
    bio: "",
  });
  const { upliftData } = useDataContext();

  // Use context to lift the data rather than passing everything here

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setActorExtras((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = () => {
    upliftData(actorExtras);
  };

  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-center text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
      <div className="mt-6 flex flex-row items-center justify-between w-full max-w-md mx-auto flex-wrap">
        <div className="form">
          <label className="text-[#999999]">Height / Metric value / m </label>
          <input
            className="finput"
            type="number"
            step="0.01"
            name="height"
            min="0"
            onChange={handleChange}
          />
          <span className="iborder"></span>
        </div>
        <div className="form">
          <label className="text-[#999999]">Weight / Metric value / kg</label>
          <input
            className="finput"
            type="number"
            step="0.1"
            name="weight"
            min="0"
            onChange={handleChange}
          />
          <span className="iborder"></span>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between w-full max-w-md mx-auto flex-wrap gap-10">
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
      </div>
      <div className="mt-12 flex flex-row items-start justify-center w-full max-w-md mx-auto flex-wrap">
        <button type="button" className="submit" onClick={handleSubmit}>
          <span className="text-white">Register your account</span>
          <span className="text-black">Enjoy your stay</span>
        </button>
      </div>
    </div>
  );
};

export default ActorForm;
