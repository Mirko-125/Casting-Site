"use client";
import { useState, useEffect } from "react";
import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { useDataContext } from "@/context/data-context";
import FileButton from "@/components/ui/buttons/single-buttons/file-button";
import { FloatingWindow } from "@/components/ui/overlays/floating-window"; // client component
import { ProductionForm } from "@/components/ui/forms/production-form";
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { getProductionPairs } from "@/lib/api/productions";

export interface ProducerExtras {
  bio: string;
  pid: string;
}

const ProducerForm = ({ user }: FormProps) => {
  const [windowOpen, setWindowOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("isSelected");
    return stored ? JSON.parse(stored) : false;
  });
  const [productionId, setProductionId] = useState<string>(() => {
    return sessionStorage.getItem("productionId") || "";
  }); // | DO NOT TOUCH
  const [producerExtras, setProducerExtras] = useState<ProducerExtras>({
    bio: "",
    pid: "",
  });

  const [hasToMakeProd, setHasToMakeProd] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("hasToMakeProd");
    return stored ? JSON.parse(stored) : true;
  });
  const [productionPairs, setProductionPairs] = useState<
    Record<string, string>
  >({});

  const { upliftData } = useDataContext();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProducerExtras((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = () => {
    const prodId: string | null = sessionStorage.getItem("productionId");
    if (prodId) {
      producerExtras.pid = prodId;
    }
    upliftData(producerExtras);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setProductionId(selectedValue);
    setIsSelected(selectedValue !== "Unselected");
    sessionStorage.setItem("productionId", selectedValue);
  };

  const handleCallback = (pid: string) => {
    setProductionId(pid);
    if (pid) {
      sessionStorage.setItem("productionId", pid);
      setWindowOpen(false);
      setHasToMakeProd(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("isSelected", JSON.stringify(isSelected));
  }, [isSelected]);

  useEffect(() => {
    sessionStorage.setItem("hasToMakeProd", JSON.stringify(hasToMakeProd));
  }, [hasToMakeProd]);

  useEffect(() => {
    getProductionPairs()
      .then(setProductionPairs)
      .catch((error) =>
        console.error("Failed to load production pairs:", error)
      );
  }, []);

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
              onChange={handleChange}
            />
            <span className="iborder"></span>
          </div>
          <DropdownMenu
            record={productionPairs}
            title="Belong to a production?"
            change={handleSelect}
            disabled={!hasToMakeProd}
          />
          <FileButton
            title="Create production"
            onClick={() => setWindowOpen(true)}
            disabled={!hasToMakeProd || isSelected}
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
