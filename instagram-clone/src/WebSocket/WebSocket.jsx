import React, { createContext, useContext, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useSelector, useDispatch } from "react-redux";

const StompContext = createContext(null);
export const useStomp = () => useContext(StompContext);

export const StompProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.user.reqUser);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!authUser?.id) return;

    const token = localStorage.getItem("token");

    const client = new Client({
      brokerURL: "ws://localhost:5454/ws",
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      debug: (str) => {
        console.log("[STOMP]", str);
      }
    });

    client.onConnect = () => {
      console.log("✅ STOMP connected");

      client.subscribe("/user/queue/message", message => {
        const data = JSON.parse(message.body);
        console.log("📩 Realtime message:", data);

        dispatch({
          type: "ADD_MESSAGE",
          payload: data
        });
      });
    };

    client.onStompError = frame => {
      console.error("❌ STOMP error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [authUser?.id, dispatch]);

  const publish = ({ destination, body }) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(body)
      });
    }
  };

  return (
    <StompContext.Provider value={{ publish }}>
      {children}
    </StompContext.Provider>
  );
};
