import { FormProps } from "@/components/ui/forms/role-specific-form-selector";

const DirectorForm = ({ user }: FormProps) => {
  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
    </div>
  );
};

export default DirectorForm;
