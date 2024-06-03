import toast from "react-hot-toast";
import { Button } from "../components";

export const Kind = {
  SUCCESS: "success",
  ERROR: "error",
  CONFIRM: "confirm",
} as const;

export type Status = (typeof Kind)[keyof typeof Kind];

const style = {
  borderRadius: "2em",
  textTransform: "capitalize",
} satisfies React.CSSProperties;

export function notify(message: string, type: Status) {
  switch (type) {
    case Kind.SUCCESS:
      toast.success(message, {
        style,
      });
      break;
    case Kind.ERROR:
      toast.error(message, {
        style,
      });
      break;
    case Kind.CONFIRM:
      toast(({ id }) => (
        <div className="grid">
          <h4>{message}</h4>

          <div className="flex m-auto">
            <Button danger onClick={() => toast.dismiss(id)}>
              delete
            </Button>
            <Button onClick={() => toast.dismiss(id)}>cancel</Button>
          </div>
        </div>
      ));
      break;
    default:
      break;
  }
}
