import toast from "react-hot-toast";
import { Button } from "../components";

export const types = {
  SUCCESS: "success",
  ERROR: "error",
  CONFIRM: "confirm",
};

const styles = {
  borderRadius: "2em",
  textTransform: "capitalize",
};

export function notify(message, type) {
  switch (type) {
    case types.SUCCESS:
      toast.success(message, {
        style: styles,
      });
      break;
    case types.ERROR:
      toast.error(message, {
        style: styles,
      });
      break;
    case types.CONFIRM:
      toast((t) => (
        <div className="grid">
          <h4>{message}</h4>

          <div className="flex m-auto">
            <Button danger onClick={() => toast.dismiss(t.id)}>
              delete
            </Button>
            <Button onClick={() => toast.dismiss(t.id)}>cancel</Button>
          </div>
        </div>
      ));
      break;
    default:
      break;
  }
}
