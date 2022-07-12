import { Payment, PaymentForm } from "~/domain/payments/schema";
import type { Student, StudentForm } from "~/domain/students/schema";
import type { OrganizationIdParams } from "./organization.server";
import { supabase } from "./user.server";

const TABLE = "students_payments";

export async function getStudentPayments({
  organization_id,
  student_id,
}: OrganizationIdParams & { student_id: string }) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(
      `
      id,
      paid_at,
      price,
      plan:plans(
        id,
        name,
        price
      )
      `
    )
    .eq("organization_id", organization_id)
    .eq("student_id", student_id);

  if (error) {
    console.log(error);
  }

  return data;
}

export async function createPayment(payment: PaymentForm) {
  const { data, error } = await supabase.from(TABLE).insert(payment).single();

  if (!error) {
    return data;
  }

  throw error;
}
export async function updateStudent(id: string, student: StudentForm) {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  return { error };
}

export async function deleteStudentPayment({
  id,
  organization_id,
}: Pick<Student, "id"> & OrganizationIdParams) {
  const { error } = await supabase
    .from("students")
    .delete({ returning: "minimal" })
    .eq("id", id)
    .eq("organization_id", organization_id);

  if (!error) {
    return {};
  }

  return null;
}

export async function getStudent({
  id,
  organization_id,
}: Pick<Student, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from("students")
    .select(
      `*, 
      modality:modalities (
        id, name
      )
    `
    )
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Student;
  }

  return null;
}

export async function getStudentById({ id }: Pick<Student, "id">) {
  const { data, error } = await supabase
    .from("students")
    .select(
      `*, 
      modality:modalities (
        id, name
      )
    `
    )
    .eq("id", id)
    .single();

  if (!error) {
    return data as Student;
  }

  return null;
}
