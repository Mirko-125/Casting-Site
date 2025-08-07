import { FormProps } from "@/components/ui/forms/role-specific-form-selector";
import { DropdownMenu } from "@/components/ui/menus/dropdown-menu";
import { productions } from "@/dump/productions";

const CastingDirectorForm = ({ user }: FormProps) => {
  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
        Additional data entry / Role requirements
      </label>
      <div className="mt-6 flex flex-col items-center justify-between w-full max-w-md mx-auto flex-wrap gap-10">
        <DropdownMenu
          record={productions}
          title="Select your production"
          change={() => console.log(productions)}
        />
        <div className="form">
          <label>Production code</label>
          <input
            className="finput"
            type="password"
            name="passphrase"
            onChange={() => console.log("xd")}
          />
          <span className="iborder"></span>
        </div>
        <button className="submit" onClick={() => console.log("xd")}>
          <span className="text-white">Sign in</span>
          <span className="text-black">Welcome</span>
        </button>
      </div>
    </div>
  );
};

export default CastingDirectorForm;
