import { FormProps } from "@/components/ui/forms/role-specific-form-selector";

const DirectorForm = ({ user }: FormProps) => {
  return (
    <div className="flex flex-col w-full max-w-lg">
      <label className="text-2xl text-[#999999]">
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
  );
};

export default DirectorForm;
