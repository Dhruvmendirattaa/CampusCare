import React, { useEffect, useRef, useState } from "react";
import "./groupchat.css";

const STORAGE_KEY = "groupChatMessages";
const USER_KEY = "user";

const makeId = () =>
  Math.random().toString(36).substring(2, 9) + "-" + Date.now().toString(36);

const loadMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Could not parse messages", e);
    return [];
  }
};

const saveMessages = (messages) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  window.dispatchEvent(new Event("storage"));
};

// ✅ Helper to get initials
const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

// Optional: color generator based on username
const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

const GroupChat = () => {
  const [messages, setMessages] = useState(() => loadMessages());
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  });
  const messagesEndRef = useRef(null);

  // Dummy user if none exists
  useEffect(() => {
    const existing = localStorage.getItem(USER_KEY);
    if (!existing) {
      const dummy = { username: "demoStudent", role: "student" };
      localStorage.setItem(USER_KEY, JSON.stringify(dummy));
      setUser(dummy);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    const onStorage = () => setMessages(loadMessages());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!user || !user.username) {
      alert("Please login/signup first to send messages.");
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) return;

    const msg = {
      id: makeId(),
      username: user.username,
      text: trimmed,
      time: Date.now(),
      replyToId: replyTo ? replyTo.id : null,
      replyToUsername: replyTo ? replyTo.username : null,
    };

    const newMessages = [...messages, msg];
    setMessages(newMessages);
    saveMessages(newMessages);

    setText("");
    setReplyTo(null);
  };

  const handleReply = (msg) => {
    setReplyTo({ id: msg.id, username: msg.username, text: msg.text });
    document.getElementById("chat-input")?.focus();
  };

  const handleDelete = (id) => {
    if (!user || user.username !== messages.find((m) => m.id === id)?.username) {
      if (!user) { alert("Login to delete your messages."); return; }
      alert("You can only delete your own messages.");
      return;
    }
    if (!window.confirm("Delete this message?")) return;
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    saveMessages(filtered);
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <h2>Group Chat</h2>
        <p className="chat-sub">
          {user?.username
            ? `Signed in as ${user.username}`
            : "You are not signed in. Signup/login to chat."}
        </p>
      </div>

      <div className="chat-main">
        <div className="messages">
          {messages.length === 0 && (
            <div className="empty">No messages yet — be the first to say hi 👋</div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`message ${user?.username === m.username ? "mine" : ""}`}>
              <div className="msg-top">
                <div className="avatar" style={{ background: getColor(m.username) }}>
                  {getInitials(m.username)}
                </div>
                <span className="msg-user">{m.username}</span>
                <span className="msg-time">{formatTime(m.time)}</span>
              </div>

              {m.replyToId && (
                <div className="msg-quote">
                  <strong>@{m.replyToUsername}</strong>:{" "}
                  {(() => {
                    const original = messages.find((x) => x.id === m.replyToId);
                    return original
                      ? original.text.slice(0, 120) + (original.text.length > 120 ? "…" : "")
                      : "";
                  })()}
                </div>
              )}

              <div className="msg-text">{m.text}</div>

              <div className="msg-actions">
                <button className="action" onClick={() => handleReply(m)}>Reply</button>
                <button className="action" onClick={() => {
                  setText(prev => prev ? prev + ` @${m.username} ` : `@${m.username} `);
                  document.getElementById("chat-input")?.focus();
                }}>Mention</button>
                <button className="action delete" onClick={() => handleDelete(m.id)}>Delete</button>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          {replyTo && (
            <div className="reply-preview">
              Replying to <strong>@{replyTo.username}</strong>: "
              {replyTo.text.length > 80 ? replyTo.text.slice(0, 80) + "…" : replyTo.text}"
              <button type="button" className="cancel-reply" onClick={() => setReplyTo(null)}>✕</button>
            </div>
          )}

          <textarea
            id="chat-input"
            placeholder={user?.username ? "Type a message... (Enter to send)" : "Login to send messages"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!user?.username}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <div className="send-row">
            <button type="button" className="send-btn" onClick={handleSend} disabled={!user?.username}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
