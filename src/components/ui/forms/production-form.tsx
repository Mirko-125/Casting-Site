import { useState } from "react";
import { BaseUserCache } from "@/lib/api/users";
import { createProduction } from "@/lib/api/productions";

interface ProductionData {
  productionName: string;
  productionCode: string;
  budget: string;
  address: string;
  about: string;
}

export interface ProducerFormProps {
  user: BaseUserCache;
  onDone: (pid: string) => void;
}

export const ProductionForm = (props: ProducerFormProps) => {
  const [productionData, setProductionData] = useState<ProductionData>({
    productionName: "",
    productionCode: "",
    budget: "",
    address: "",
    about: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProductionData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async () => {
    // validations, logging
    console.table(productionData);
    try {
      const pid = await createProduction(productionData);
      props.onDone(pid);
    } catch (error) {
      console.error("Failed to create production:", error);
      // handle error UX here
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="m-4 text-center text-2xl">
          Set your production in action
        </div>
        <div className="text-white mt-16 flex flex-col items-center gap-[1rem]">
          <div className="w-full flex flex-col md:flex-row md:gap-8 justify-center">
            {/* Left column */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 items-center">
              <div className="form">
                <label>Production name</label>
                <input
                  className="finput"
                  type="text"
                  name="productionName"
                  onChange={handleChange}
                />
                <span className="iborder"></span>
              </div>

              <div className="form">
                <label>Production code</label>
                <input
                  className="finput"
                  type="password"
                  name="productionCode"
                  placeholder="5-character string"
                  onChange={handleChange}
                />
                <span className="iborder"></span>
              </div>

              <div className="form">
                <label>Starting budget</label>
                <input
                  className="finput"
                  type="text"
                  name="budget"
                  placeholder="[currency][value]"
                  onChange={handleChange}
                />
                <span className="iborder"></span>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 items-center">
              <div className="form">
                <label>Address</label>
                <input
                  className="finput"
                  type="text"
                  name="address"
                  onChange={handleChange}
                />
                <span className="iborder"></span>
              </div>

              <div className="form">
                <label>About the production</label>
                <textarea
                  className="finput"
                  name="about"
                  rows={5}
                  placeholder="More about it..."
                  maxLength={2000}
                  onChange={handleChange}
                />
                <span className="iborder"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="m-12 flex flex-row items-start justify-center w-full max-w-md mx-auto flex-wrap">
          <button
            type="button"
            className="submit submit--cobalt"
            onClick={handleSubmit}
          >
            <span className="text-white">Create production</span>
            <span className="text-black">Action!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
