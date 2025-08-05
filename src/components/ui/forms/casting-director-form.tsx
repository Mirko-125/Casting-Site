import { FormProps } from "@/components/ui/forms/role-specific-form-selector";

const CastingDirectorForm = ({ user }: FormProps) => {
  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
    </div>
  );
};

export default CastingDirectorForm;
