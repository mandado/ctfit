import { compose, join, reject, isBoolean, isNil, flatten } from "lodash/fp";

export const cx = (...args: unknown[]) =>
  compose(join(" "), reject(isBoolean), reject(isNil), flatten)(args);

export const toSelectOptions = (data: unknown[]) => {
  const transformCollection = data.map((item: any) => ({
    name: item.name,
    value: item.id,
  }));

  return [{ name: "Selecione uma opção", value: "" }, ...transformCollection];
};

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
