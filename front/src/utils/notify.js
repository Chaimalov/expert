import toast from "react-hot-toast";

export const types = {
    SUCCESS: "success",
    ERROR: "error"
}

export function notify(message, type) {

    switch (type) {
        case types.SUCCESS:
            toast.success(message, {
                style: {
                    boxShadow: "none",
                    borderRadius: "2em"
                },
            });
            break
        case types.ERROR:
            toast.error(message, {
                style: {
                    boxShadow: "none",
                    borderRadius: "2em"
                },
            });
            break
    }

}
