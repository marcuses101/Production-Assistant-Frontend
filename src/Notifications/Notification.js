import React, { useEffect } from "react";
import { NOTE_ACTIONS } from "./NotificationsProvider";

export default function Notification({
  id,
  message,
  type,
  dispatch,
  defaultStyle,
  style,
}) {
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: NOTE_ACTIONS.REMOVE_NOTE, payload: id });
    }, 4000);
  }, [id, dispatch]);

  return (
    <div
      style={{ ...defaultStyle, ...style }}
      className={`notification-item ${type}`}
    >
      <p>{message}</p>
    </div>
  );
}
