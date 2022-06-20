import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { format } from "date-fns";
import { FormEvent } from "react";
import invariant from "tiny-invariant";
import { Modality } from "~/domain/modalities/schema";
import { Payment } from "~/domain/payments/schema";
import { Student } from "~/domain/students/schema";
import { getStudent } from "~/models/student.server";
import {
  createPayment,
  getStudentPayments,
} from "~/models/students_payments.server";
import { requireOrganizationId } from "~/session.server";
import { formatAsDateComplete, formatAsMonthYear } from "~/shared/format";

const dates = [
  [0, "Janeiro"],
  [1, "Fevereiro"],
  [2, "Março"],
  [3, "Abril"],
  [4, "Maio"],
  [5, "Junho"],
  [6, "Julho"],
  [7, "Agosto"],
  [8, "Setembro"],
  [9, "Outubro"],
  [10, "Novembro"],
  [11, "Dezembro"],
];
const getKey = (month: number) => `${month + 1}${new Date().getFullYear()}`;

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.studentId, "studentId not found");

  const form = await request.formData();

  const paidDate = new Date();
  paidDate.setMonth(Number(form.get("payment_month")) - 1);

  await createPayment({
    student_id: params.studentId,
    organization_id: organizationId,
    paid_at: format(paidDate, "yyyy-MM-dd HH:mm:ss"),
    plan_id: String(form.get("plan_id")),
    price: Number(form.get("price")),
  });

  return null;
};

type LoaderData = {
  modalities: Modality[];
  student: Student;
  payments: Payment[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.studentId, "studentId not found");

  const student = await getStudent({
    organization_id: organizationId,
    id: params.studentId,
  });
  if (!student) {
    throw new Response("Not Found", { status: 404 });
  }

  const payments = await getStudentPayments({
    organization_id: organizationId,
    student_id: params.studentId,
  });

  return json({ payments, student });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  const submit = useSubmit();

  const months = new Map<string, { date: string; price: number }>(
    data.payments.map((payment) => {
      const date = payment.paid_at as string;
      const price = payment.price as number;
      const month = formatAsMonthYear(date);

      return [month, { date, price }];
    })
  );

  const handleChange = (event: FormEvent<HTMLFormElement>) =>
    submit(event.currentTarget, { replace: true });
  const isOnMonth = (month: number) => months.has(getKey(month));
  const formatDate = (month: number) => {
    const monthData = months.get(getKey(month));

    if (!monthData || !isOnMonth(month)) {
      return "-";
    }

    const { date, price } = monthData;

    return `Pago em: ${formatAsDateComplete(date)} - R$ ${price}`;
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">
        Pagamentos de {data.student.name}
      </h2>

      <fieldset className="space-y-5">
        <legend className="sr-only">Pagamentos de {data.student.name}</legend>
        <Form method="post" onChange={handleChange}>
          <>
            <input
              type="hidden"
              name="plan_id"
              defaultValue={data.student.plan_id}
            />
            <input
              type="hidden"
              name="price"
              defaultValue={data.student.plan?.price}
            />
            {dates.map(([month, name], index) => {
              return (
                <div className="relative flex items-start" key={index}>
                  <div className="flex h-5 items-center">
                    <input
                      id={`payment-month-${month}`}
                      name="payment_month"
                      type="checkbox"
                      disabled={isOnMonth(month as number)}
                      defaultChecked={isOnMonth(month as number)}
                      defaultValue={Number(month) + 1}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`payment-month-${month}`}
                      className="font-medium text-gray-700"
                    >
                      {name}
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      {formatDate(month as number)}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        </Form>
      </fieldset>
    </div>
  );
}
