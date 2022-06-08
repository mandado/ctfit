import { BaseButtonProps } from "./BaseButton";
import Button from "./SubmitButton";

export default function SubmitButton(props: BaseButtonProps) {
  return (
    <div className="mt-4 flex justify-end">
      <Button {...props} />
    </div>
  );
}
