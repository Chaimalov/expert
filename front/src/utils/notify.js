import toast from "react-hot-toast";

export const types = {
  SUCCESS: "success",
  ERROR: "error",
};

const styles = {
  boxShadow: "none",
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
  }
}
