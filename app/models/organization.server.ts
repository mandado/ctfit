import { Organization, OrganizationForm } from "~/domain/organizations/schema";
import { Base } from "~/types/common/base";
import type { User } from "./user.server";
import { supabase } from "./user.server";

export type OrganizationIdParams = {
  organization_id: string;
};
export type OrganizationId = {
  organization_id: string;
};

export type Member = {
  id: string;
  user_id: string;
  owner: boolean;
} & Base &
  OrganizationId;

export async function getNoteListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("notes")
    .select("id, title")
    .eq("profile_id", userId);

  return data;
}

export async function getOrganizationById(id: string) {
  const { data, error } = await supabase
    .from("organizations")
    .select("name, id")
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return { id: data.id, name: data.name };
}

export async function createOrganization({ name, user_id }: OrganizationForm) {
  const { data, error } = await supabase
    .from("organizations")
    .insert({ name })
    .single();

  console.log(error);
  if (!error) {
    const { error } = await supabase
      .from("members")
      .insert({ organization_id: data.id, user_id, owner: true })
      .single();

    return data;
  }

  return null;
}
