import { useState } from "react";
import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import FileButton from "@/components/ui/buttons/single-buttons/file-button";
import { FloatingWindow } from "@/components/ui/overlays/floating-window"; // client component

const ProducerForm = ({ user }: FormProps) => {
  const [windowOpen, setWindowOpen] = useState<boolean>();
  const [key, setKey] = useState<number>(0);

  const openWindow = () => {
    setKey((k) => k + 1);
    setWindowOpen(true);
  };

  return (
    <div>
      {windowOpen && (
        <FloatingWindow
          key={key}
          id={`win-${user.id}-${key}`}
          onClose={() => setWindowOpen(false)}
        >
          <div className="space-y-4"></div>
        </FloatingWindow>
      )}
      {windowOpen && (
        <div className="fixed inset-0 bg-black/50 z-5 pointer-events-auto" />
      )}
      <div className="flex flex-col w-full max-w-lg">
        <label className="text-center text-2xl text-[#999999]">
          Additional data entry / Role requirements
        </label>
        <div className="mt-6 flex flex-col items-center justify-between w-full max-w-md mx-auto flex-wrap gap-10">
          <div className="form">
            <label className="text-[#999999]">Date of birth</label>
            <input
              className="finput"
              max="2008-1-1"
              type="date"
              id="name"
              name="dateOfBirth"
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
            />
            <span className="iborder"></span>
          </div>
          <FileButton title="Create production" onClick={openWindow} />
          <button
            type="button"
            className="submit"
            onClick={() => console.log("Submit")}
          >
            <span className="text-white">Register your account</span>
            <span className="text-black">Enjoy your stay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducerForm;
