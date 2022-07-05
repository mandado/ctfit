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

export async function getOrganizationById(id: string): Promise<Organization | null| undefined> {
  const { data, error } = await supabase
    .from("organizations")
    .select("name, id, slug, configurations")
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null | undefined> {
  const { data, error } = await supabase
    .from("organizations")
    .select("name, id, slug, configurations")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }
  if (data) return data;
}

export async function createOrganization({
  name,
  slug,
  user_id,
}: OrganizationForm) {
  const { data, error } = await supabase
    .from("organizations")
    .insert({ name, slug })
    .single();

  if (!error) {
    await supabase
      .from("members")
      .insert({ organization_id: data.id, user_id, owner: true })
      .single();

    return data;
  }

  return null;
}

export async function removeOrganization({
  id,
  user_id,
}: Pick<Organization, "id"> & { user_id: User["id"] }) {
  const { data: organizationMember, error: organizationError } = await supabase
    .from("members")
    .select("owner")
    .eq("user_id", user_id)
    .eq("organization_id", id)
    .single();

  if (organizationError) {
    console.log(organizationError);

    return null;
  }

  if (!organizationMember) {
    return null;
  }

  if (organizationMember.owner === false) {
    throw new Error("only owners can remove the organization");
  }

  const { error } = await supabase
    .from("organizations")
    .delete({ returning: "minimal" })
    .match({ id });

  if (!error) {
    return {};
  }

  console.log(error);
  return null;
}

export async function updateOrganization(id: string, organization: Partial<OrganizationForm>) {
  const { data, error } = await supabase
    .from("organizations")
    .update(organization)
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  console.log(error);
  return null;
}
