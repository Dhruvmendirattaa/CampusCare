// client/src/components/GroupChat.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axiosInstance from "../axiosInstance.js"; // ⬅️ central axios
import "./groupchat.css";

const SOCKET_URL = "http://localhost:5000";

const GroupChat = () => {
  const [groupId, setGroupId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  // Fetch groupId
  useEffect(() => {
    axiosInstance
      .get("/groups/id")
      .then((res) => {
        if (res?.data?.groupId) setGroupId(res.data.groupId);
      })
      .catch((err) => console.error("❌ Error fetching groupId:", err));
  }, []);

  // Fetch messages + setup socket
  useEffect(() => {
    if (!user || !groupId) return;

    // 1. Load old messages
    axiosInstance
      .get(`/messages/${groupId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("❌ Error fetching messages:", err));

    // 2. Setup socket
    socketRef.current = io(SOCKET_URL, {
      auth: { token: localStorage.getItem("token") },
    });

    socketRef.current.emit("joinGroup", groupId);

    socketRef.current.on("newMessage", (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev; // 🚫 avoid duplicates
        return [...prev, msg];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user, groupId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axiosInstance.post(`/messages/${groupId}`, {
        message: text,
        replyTo: replyTo?._id || null,
      });
      setMessages((prev) => {
        if (prev.some((m) => m._id === res.data._id)) return prev;
        return [...prev, res.data];
      });
      setText("");
      setReplyTo(null);
    } catch (err) {
      console.error("❌ Error sending message:", err.response?.data || err.message);
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/messages/${groupId}/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleReply = (msg) => setReplyTo(msg);

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ✅ Helper: prefer nickname → username → name
  const displayName = (sender) =>
    sender?.nickname || sender?.username || sender?.name || "Unknown";

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <h2>Group Chat</h2>
        <p className="chat-sub">
          {user ? `Signed in as ${displayName(user)}` : "Login to chat"}
        </p>
      </div>

      <div className="chat-main">
        <div className="messages">
          {messages.map((m, idx) => (
            <div
              key={m._id || `${m.senderId?._id}-${m.createdAt}-${idx}`} // ✅ unique key
              className={`message ${m.senderId?._id === user?._id ? "mine" : ""}`}
            >
              <div className="msg-top">
                <span className="msg-user">{displayName(m.senderId)}</span>
                <span className="msg-time">{formatTime(m.createdAt)}</span>
              </div>

              {m.replyTo && (
                <div className="msg-quote">
                  Replying to @{displayName(m.replyTo.senderId)}:{" "}
                  {m.replyTo.message}
                </div>
              )}

              <div className="msg-text">{m.message}</div>

              <div className="msg-actions">
                <button onClick={() => handleReply(m)}>Reply</button>
                {(m.senderId?._id === user?._id || user?.role === "teacher") && (
                  <button
                    className="delete"
                    onClick={() => handleDelete(m._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          {replyTo && (
            <div className="reply-preview">
              Replying to <strong>@{displayName(replyTo.senderId)}</strong>: "
              {replyTo.message.length > 80
                ? replyTo.message.slice(0, 80) + "…"
                : replyTo.message}
              "
              <button type="button" onClick={() => setReplyTo(null)}>
                ✕
              </button>
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={user ? "Type a message..." : "Login to send messages"}
            disabled={!user}
          />
          <button type="submit" disabled={!user || !groupId}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
