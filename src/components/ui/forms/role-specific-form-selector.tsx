import dynamic from "next/dynamic";
import { ComponentType } from "react";

export interface RoleSpecificFormSelectorProps {
  identifier: string;
  role: UserRole;
}

export interface UserRoleMap {
  actor: "actor";
  director: "director";
  producer: "producer";
  casting_director: "castingdirector";
}
export type UserRole = UserRoleMap[keyof UserRoleMap];

export interface FormProps {
  identifier: string;
}

const ActorForm = dynamic<FormProps>(
  () => import("@/components/ui/forms/actor-form")
) as ComponentType<FormProps>;

const ProducerForm = dynamic<FormProps>(
  () => import("@/components/ui/forms/producer-form")
) as ComponentType<FormProps>;

const CastingDirectorForm = dynamic<FormProps>(
  () => import("@/components/ui/forms/casting-director-form")
) as ComponentType<FormProps>;

const DirectorForm = dynamic<FormProps>(
  () => import("@/components/ui/forms/director-form")
) as ComponentType<FormProps>;

const roleComponentMap: Record<UserRole, ComponentType<FormProps>> = {
  actor: ActorForm,
  producer: ProducerForm,
  castingdirector: CastingDirectorForm,
  director: DirectorForm,
};

export const RoleSpecificFormSelector = ({
  identifier,
  role,
}: RoleSpecificFormSelectorProps) => {
  const FormComponent = roleComponentMap[role];
  return <FormComponent identifier={identifier} />;
};
