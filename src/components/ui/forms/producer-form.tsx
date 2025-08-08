import { useState } from "react";
import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { useDataContext } from "@/context/data-context";
import FileButton from "@/components/ui/buttons/single-buttons/file-button";
import { FloatingWindow } from "@/components/ui/overlays/floating-window"; // client component
import { ProductionForm } from "@/components/ui/forms/production-form";
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { productions } from "@/dump/productions";

export interface ProducerExtras {
  testcase: string;
}

const ProducerForm = ({ user }: FormProps) => {
  const [windowOpen, setWindowOpen] = useState<boolean>();
  const [isSelected, setIsSelected] = useState<boolean>();
  const [productionIsMade, setProductionIsMade] = useState<boolean>(); // | when prod is succesful
  const [productionId, setProductionId] = useState<string>();
  const [producerExtras, setProducerExtras] = useState<ProducerExtras>({
    testcase: "cameleon",
  });
  const { upliftData } = useDataContext();

  // | handlechenge here

  const handleSubmit = () => {
    upliftData(producerExtras);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setIsSelected(selectedValue !== "Unselected");
    console.log(selectedValue);
  };

  const handleCallback = (pid: string) => {
    setProductionId(pid);
    console.log(pid);
  };

  return (
    <div>
      {windowOpen && (
        <FloatingWindow onClose={() => setWindowOpen(false)}>
          <div className="space-y-4">
            <ProductionForm user={user} onDone={handleCallback} />
          </div>
        </FloatingWindow>
      )}
      {windowOpen && (
        <div className="fixed inset-0 bg-black/50 z-5 pointer-events-auto" />
      )}
      <div className="flex flex-col w-full max-w-lg">
        <label className="text-center text-2xl text-[#999999]">
          Additional data entry / Role requirements
        </label>
        <div className="mt-6 flex flex-col items-center justify-between w-full max-w-md mx-auto flex-wrap gap-5">
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
          <DropdownMenu
            record={productions}
            title="Belong to a production?"
            change={handleSelect}
          />
          <FileButton
            title="Create production"
            onClick={() => setWindowOpen(true)}
            disabled={isSelected as boolean}
          />
          <button type="button" className="submit" onClick={handleSubmit}>
            <span className="text-white">Register your account</span>
            <span className="text-black">Enjoy your stay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducerForm;
