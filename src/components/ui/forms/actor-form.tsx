import { FormProps } from "@/components/ui/forms/role-specific-form-selector";

const ActorForm = ({ identifier }: FormProps) => {
  return <div>Passed in: {identifier}</div>;
};

export default ActorForm;
