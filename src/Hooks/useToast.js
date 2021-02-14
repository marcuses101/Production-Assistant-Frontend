import { useContext } from "react";
import {
  NOTE_ACTIONS,
  NotificationContext,
} from "../Notifications/NotificationsProvider";

export function useToast() {
  const { notificationDispatch } = useContext(NotificationContext);

  function toast({ message, type }) {
    notificationDispatch({
      type: NOTE_ACTIONS.ADD_NOTE,
      payload: { message, type },
    });
  }
  toast.success = (message) =>
    notificationDispatch({
      type: NOTE_ACTIONS.ADD_NOTE,
      payload: { message, type: "success" },
    });
  toast.error = (message) =>
    notificationDispatch({
      type: NOTE_ACTIONS.ADD_NOTE,
      payload: { message, type: "error" },
    });
  return toast;
}
