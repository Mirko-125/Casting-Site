import dynamic from "next/dynamic";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { ComponentType } from "react";
import { BaseUserCache } from "@/lib/api/users";

export interface RoleSpecificFormSelectorProps {
  user: BaseUserCache; // Modify me!
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
  user: BaseUserCache;
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
  user,
  role,
}: RoleSpecificFormSelectorProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );

  const FormComponent = roleComponentMap[role];
  return (
    <DndContext sensors={sensors}>
      <FormComponent user={user} />
    </DndContext>
  );
};
