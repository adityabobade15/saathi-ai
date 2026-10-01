import { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import Breathe from "../components/Breathe";
import Ground from "../components/Ground";
import Dashboard from "../components/Dashboard";
import { sendChatMessage } from "../utils/api";
import CalmSound from "../components/CalmSound";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import MeditationCarousel from "../components/MeditationCarousel";
import { Mic, Send } from "lucide-react";
import PositiveSelfTalk from "../components/PositiveSelfTalk";

export default function Chat({ onSignOut }) {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi, I’m Saathi 🌱 I’m here with you." },
  ]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBreathe, setShowBreathe] = useState(false);
  const [showGround, setShowGround] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [showCrisis, setShowCrisis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCalm, setShowCalm] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showVoiceCard, setShowVoiceCard] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSelfTalk, setShowSelfTalk] = useState(false);
  const chatEndRef = useRef(null);
  
  /* ===== EMOTION DETECTOR (CHAT ONLY) ===== */
  const detectEmotionFromText = (text) => {
    const t = text.toLowerCase();

    if (t.includes("happy") || t.includes("good") || t.includes("great"))
      return { emoji: "😄", label: "Happy" };

    if (t.includes("calm") || t.includes("relaxed"))
      return { emoji: "😊", label: "Calm" };

    if (t.includes("sad") || t.includes("down"))
      return { emoji: "😔", label: "Sad" };

    if (t.includes("anxious") || t.includes("nervous"))
      return { emoji: "😟", label: "Anxious" };

    if (t.includes("angry") || t.includes("mad"))
      return { emoji: "😡", label: "Angry" };

    return null;
  };
  
const saveChatToFirestore = async (userText, aiReply) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "chats"),
      {
        message: userText,
        reply: aiReply,
        createdAt: serverTimestamp(),
      }
    );

    console.log("✅ Chat saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving chat:", error);
  }
};
  /* ===== NEW: SAVE MOOD ===== */
  const saveMoodToFirestore = async (emotion) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "users", user.uid, "moods"), {
        emoji: emotion.emoji,
        label: emotion.label,
        time: new Date().toLocaleString(),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("❌ Error saving mood:", error);
    }
  };

  /* ===== NEW: LOAD OLD CHATS + MOODS AFTER REFRESH ===== */
  useEffect(() => {
    const loadHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snap = await getDocs(
          query(
            collection(db, "users", user.uid, "chats"),
            orderBy("createdAt", "asc"),
            limit(50)
          )
        );
        if (!snap.empty) {
          const loaded = [];
          snap.forEach((d) => {
            const data = d.data();
            if (data.message) loaded.push({ from: "user", text: data.message });
            if (data.reply) loaded.push({ from: "ai", text: data.reply });
          });
          setMessages(loaded);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }

      try {
        const moodSnap = await getDocs(
          query(
            collection(db, "users", user.uid, "moods"),
            orderBy("createdAt", "asc"),
            limit(50)
          )
        );
        if (!moodSnap.empty) {
          const loadedMoods = [];
          moodSnap.forEach((d) => {
            const data = d.data();
            loadedMoods.push({
              emoji: data.emoji,
              label: data.label,
              time: data.time || "",
            });
          });
          setEmotions(loadedMoods);
        }
      } catch (err) {
        console.error("Failed to load mood history:", err);
      }
    };

    loadHistory();
  }, []);

  /* ===== SEND MESSAGE (BACKEND CONNECTED) ===== */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    const detectedEmotion = detectEmotionFromText(userText);

    // NEW: last few messages so Saathi remembers the conversation
    const recentHistory = messages.slice(-10).map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));
    const uid = auth.currentUser?.uid;

    // Add user message instantly
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setIsTyping(true);
    setInput("");

    if (detectedEmotion) {
      setEmotions((prev) => [
        ...prev,
        { ...detectedEmotion, time: new Date().toLocaleString() },
      ]);
      saveMoodToFirestore(detectedEmotion); // NEW
    }

    try {
      const data = await sendChatMessage(userText, uid, recentHistory); // CHANGED

      setIsTyping(false);

      // Add AI reply
      setMessages((prev) => [...prev, { from: "ai", text: data.reply }]);

      // 🔥 SAVE TO FIRESTORE
      await saveChatToFirestore(userText, data.reply);

      if (data.crisis === true) {
        setShowCrisis(true);
      }
    } catch (err) {
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "I’m having trouble connecting right now 💙" },
      ]);
    }
  };

  const openBreathe = () => {
    setShowGround(false);
    setShowDashboard(false);
    setShowBreathe(true);
    setSidebarOpen(false);
  };

  const clearChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };
  
  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isTyping]);
  
let recognition;

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;

  setTranscript("");
  setShowVoiceCard(true);
  setIsListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    let text = "";
    for (let i = 0; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    setTranscript(text);
  };

  recognition.onerror = () => {
    setIsListening(false);
  };
};
const stopListening = () => {
  if (recognition) recognition.stop();
  setIsListening(false);
};

const handleVoiceDone = () => {
  stopListening();
  setInput(transcript);
  setShowVoiceCard(false);
};

  return (
    <div className="chat-page">
      {/* HEADER */}
      <header className="chat-header">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <div className="header-brand">
          <h1>Saathi</h1>
          <span>A calm space to talk and heal</span>
        </div>
      </header>

      {/* BODY */}
      <div className="chat-layout">
        {/* SIDEBAR */}
        <aside
          className={`chat-sidebar ${sidebarOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sidebar-content">
            <div className="sidebar-item" onClick={openBreathe}>
              🫁 Breath
            </div>

            <div
              className="sidebar-item"
              onClick={() => {
                setShowBreathe(false);
                setShowDashboard(false);
                setShowGround(true);
                setSidebarOpen(false);
              }}
            >
              🌱 Ground
            </div>

            <div
              className="sidebar-item"
              onClick={() => {
                setShowBreathe(false);
                setShowGround(false);
                setShowDashboard(true);
                setSidebarOpen(false);
              }}
            >
              📊 Dashboard
            </div>
             
            <div
            className="sidebar-item"
            onClick={() => {
            setShowBreathe(false);
            setShowGround(false);
            setShowDashboard(false);
            setShowCalm(true);
            setSidebarOpen(false);
           }}
          >
           🎧 Calm Sound
           </div>
           <div className="sidebar-item danger" onClick={clearChat}>
           🧹 Clear Chat
           </div>
           
           <div
           className="sidebar-item"
           onClick={() => {
           setShowBreathe(false);
           setShowGround(false);
           setShowDashboard(false);
           setShowCalm(false);
           setShowMeditation(true);
           setSidebarOpen(false);
        }}
        >
           🧘 Mindful Meditation
          </div>
          
          <div
          className="sidebar-item"
          onClick={() => {
          setShowSelfTalk(true);
          setSidebarOpen(false);
         }}
   >
          🗣 Positive Self-Talk
         </div>


            <div className="sidebar-item signout" onClick={onSignOut}>
              🚪 Sign Out
            </div>
          </div>
        </aside>

        {/* CHAT */}
        <main className="chat-container" onClick={() => setSidebarOpen(false)}>
          <div className="chat-messages">
  {messages.map((msg, i) => (
    <div key={i} className={`bubble ${msg.from}`}>
      {msg.text}
    </div>
  ))}

  {isTyping && (
  <div className="bubble ai typing">
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}

  <div ref={chatEndRef} />
</div>


          {showBreathe && (
            <div className="breathe-inline" onClick={(e) => e.stopPropagation()}>
              <Breathe onClose={() => setShowBreathe(false)} />
            </div>
          )}

          {showGround && (
            <div className="breathe-inline" onClick={(e) => e.stopPropagation()}>
              <Ground onClose={() => setShowGround(false)} />
            </div>
          )}

          {showDashboard && (
            <div className="breathe-inline" onClick={(e) => e.stopPropagation()}>
              <Dashboard
                emotions={emotions}
                onClose={() => setShowDashboard(false)}
              />
            </div>
          )}
         
        {showSelfTalk && (
        <div className="breathe-inline">
        <PositiveSelfTalk onClose={() => setShowSelfTalk(false)} />
        </div>
        )}


          {showCrisis && (
          <div className="crisis-overlay">
          <div className="crisis-card">
          <h2>You are not alone 💙</h2>

      <p>
        I’m really glad you spoke up. What you’re feeling matters,
        and help is available right now.
      </p>

      <div className="crisis-info">
        <p><strong>India – 24/7 Helpline</strong></p>
        <p>📞 AASRA: 91-9820466726</p>
      </div>

      <a
        className="map-btn"
        href="https://www.google.com/maps/search/therapist+near+me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        📍 Find Therapist Near Me
      </a>

      <button
        className="safe-btn"
        onClick={() => setShowCrisis(false)}
      >
        I’m safe for now
      </button>
    </div>
  </div>
)}
          {showCalm && (
          <div className="breathe-inline" onClick={(e) => e.stopPropagation()}>
          <CalmSound onClose={() => setShowCalm(false)} />
          </div>
        )}
          {showMeditation && (
           <div className="breathe-inline" onClick={(e) => e.stopPropagation()}>
           <MeditationCarousel onClose={() => setShowMeditation(false)} />
          </div>
          )}
         {showVoiceCard && (
  <div className="voice-overlay">
    <div className="voice-card">
      <h3>Voice Input</h3>

      {isListening && (
        <div className="wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <p className="voice-text">
        {transcript || "Start speaking..."}
      </p>

      <button className="voice-done" onClick={handleVoiceDone}>
        Done
      </button>
    </div>
  </div>
)}
          <div className="chat-input">
         <input
  placeholder="Type or speak how you feel…"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  autoCorrect="on"
  autoCapitalize="sentences"
  spellCheck={true}
  inputMode="text"
  enterKeyHint="send"
/>

         <button
         className={`mic-btn ${isListening ? "listening" : ""}`}
         onClick={startListening}
         >
         <Mic size={18} strokeWidth={2} />
         </button>

        <button
  className="send-btn"
  onClick={sendMessage}
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 12L20 12M20 12L14 6M20 12L14 18"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     </svg>
     </button>
        </div>
        </main>
      </div>
    </div>
  );
}
