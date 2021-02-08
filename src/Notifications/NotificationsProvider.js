import React, { useReducer } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import Notification from "./Notification";
import "./NotificationsProvider.css";

export const NOTE_ACTIONS = {
  ADD_NOTE: "add_note",
  REMOVE_NOTE: "remove_note",
};

export const NotificationContext = React.createContext({
  notificationDispatch() {},
});

function NotificationReducer(notifications, action) {
  switch (action.type) {
    case NOTE_ACTIONS.ADD_NOTE: {
      const newNote = { ...action.payload, id: uuid() };
      return [...notifications, newNote];
    }
    case NOTE_ACTIONS.REMOVE_NOTE: {
      return notifications.filter((note) => note.id !== action.payload);
    }
    default:
      return notifications;
  }
}
const defaultStyle = {
  transition: "transform var(--time) ease, opacity var(--time) ease",
  opacity: 0,
  transform: "translateY(30px)",
};

const transitionStyles = {
  entering: { transform: "translateY(30px)", opacity: 0 },
  entered: { transform: "translateY(0px)", opacity: 1 },
  exiting: { transform: "translateY(-30px)", opacity: 0 },
  exited: { transform: "translateY(-30px)", opacity: 0 },
};

export function NotificationsProvider(props) {
  const [notifications, notificationDispatch] = useReducer(
    NotificationReducer,
    []
  );

  return (
    <NotificationContext.Provider value={{ notificationDispatch }}>
      <div className="notification-wrapper">
        <TransitionGroup>
          {notifications.map((note) => {
            return (
              <Transition key={note.id} timeout={200}>
                {(state) => (
                  <Notification
                    style={transitionStyles[state]}
                    defaultStyle={defaultStyle}
                    dispatch={notificationDispatch}
                    actions={NOTE_ACTIONS}
                    {...note}
                  />
                )}
              </Transition>
            );
          })}
        </TransitionGroup>
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
}
