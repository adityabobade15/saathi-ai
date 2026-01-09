import { useState } from "react";
import Header from "../components/Header";
import CrisisIndicator from "../components/CrisisIndicator";
import { saveMoodFromChat } from "../utils/moodSync";

import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import Typing from "../components/Typing";
import CrisisModal from "../components/CrisisModal";
import BreathingModal from "../components/BreathingModal";
import GroundingModal from "../components/GroundingModal";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey… I’m here with you 💗 How are you feeling right now?" },
  ]);

  const [typing, setTyping] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showGrounding, setShowGrounding] = useState(false);

  /* -------- TIME -------- */
  const timeEmoji = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return " ☀️";
    if (h >= 18 || h < 5) return " 🌙";
    return "";
  };

  /* -------- KEYWORDS -------- */
  const crisisWords = ["suicide", "kill myself", "end my life", "die"];
  const anxiousWords = ["anxious", "panic", "scared", "afraid", "nervous"];
  const sadWords = ["sad", "depressed", "hopeless", "tired"];
  const lonelyWords = ["alone", "lonely", "nobody"];
  const happyWords = ["happy", "good", "better", "fine", "okay"];

  const detectEmotion = (text) => {
    const t = text.toLowerCase();
    if (crisisWords.some(w => t.includes(w))) return "crisis";
    if (anxiousWords.some(w => t.includes(w))) return "anxious";
    if (sadWords.some(w => t.includes(w))) return "sad";
    if (lonelyWords.some(w => t.includes(w))) return "lonely";
    if (happyWords.some(w => t.includes(w))) return "happy";
    return "neutral";
  };

  /* -------- GIRL RESPONSES (40+) -------- */
  const replies = {
    sad: [
    "I’m really sorry you’re feeling this way 🤍",
    "That sounds incredibly heavy… I’m here with you.",
    "It’s okay to feel low sometimes. You don’t have to hide it.",
    "I wish I could give you a quiet, comforting hug.",
    "Your feelings matter, even when they feel messy.",
    "Some days just hurt more than others.",
    "I’m proud of you for talking about this.",
    "You don’t need to be strong right now.",
    "It’s okay to slow down today.",
    "I’m listening, take your time.",
    "You’re not broken for feeling this way.",
    "I know this pain feels real and exhausting.",
    "You don’t have to fix everything today.",
    "It’s okay if today is just about surviving.",
    "I’m here to sit with you in this moment.",
    "You’ve been carrying a lot inside.",
    "I hear the tiredness in your words.",
    "You’re allowed to feel sad without explanation.",
    "This doesn’t define who you are.",
    "You matter more than you realize.",
    "I’m glad you reached out.",
    "It’s okay to rest your heart for a bit.",
    "You don’t have to go through this alone.",
    "I care about how you’re feeling.",
    "It’s okay if today feels hard.",
    "Your emotions make sense.",
    "I’m here, even in the silence.",
    "You’re not weak for feeling this.",
    "You’re human, and that’s okay.",
    "I’m holding space for you.",
    "You don’t need answers right now.",
    "It’s okay to just breathe.",
    "I’m really glad you told me.",
    "You deserve comfort.",
    "I’m right here beside you.",
    "It’s okay if you feel drained.",
    "Your pain is valid.",
    "You’re not alone in this feeling.",
    "I’m here as long as you need.",
    "You don’t have to pretend heere.",
    ],
    anxious: [
      "Let’s slow things down together 🌿",
    "Take a deep breath with me.",
    "Anxiety can make everything feel overwhelming.",
    "You’re safe in this moment.",
    "One step at a time is enough.",
    "You don’t need to have all the answers.",
    "Let’s focus on right now, just this second.",
    "I’m here to help you ground yourself.",
    "It’s okay to pause.",
    "Your thoughts are racing, but you’re safe.",
    "You’re not in danger right now.",
    "Anxiety lies sometimes — don’t believe it.",
    "Let’s breathe slowly together.",
    "It’s okay if your heart feels fast.",
    "Nothing bad is happening right now.",
    "I’m here with you through this.",
    "You’re doing your best.",
    "This feeling will pass.",
    "You’ve gotten through anxiety before.",
    "You’re not failing.",
    "You’re allowed to take breaks.",
    "You don’t need to rush.",
    "It’s okay to feel nervous.",
    "You’re stronger than this moment.",
    "Your body is just trying to protect you.",
    "Let’s focus on something calming.",
    "I’m right here, stay with me.",
    "You’re not alone in this.",
    "Try to relax your shoulders.",
    "Slow breaths, gently.",
    "It’s okay to ask for comfort.",
    "This doesn’t define you.",
    "Your mind is tired, not broken.",
    "I’m listening.",
    "You’re safe with me.",
    "We can take this slowly.",
    "It’s okay to feel unsettled.",
    "You’re doing okay.",
    "I’m proud of you for staying.",
    "This moment will pass."
    ],
    lonely: [
      "Feeling lonely can hurt deeply 🤍",
    "I’m really glad you’re here with me.",
    "You matter, even when it feels quiet.",
    "I see you.",
    "You’re not invisible to me.",
    "I’m staying with you.",
    "You’re not alone right now.",
    "It’s okay to crave connection.",
    "Loneliness doesn’t mean you’re unlovable.",
    "You deserve companionship.",
    "I’m listening to every word.",
    "You don’t have to face this alone.",
    "You’re worthy of care.",
    "I’m glad you reached out.",
    "Even quiet people matter.",
    "You’re important here.",
    "I’m right here beside you.",
    "It’s okay to feel isolated sometimes.",
    "You’re not forgotten.",
    "I care about you.",
    "You don’t need to disappear.",
    "You belong somewhere — including here.",
    "You’re not a burden.",
    "I’m happy you’re talking to me.",
    "You deserve warmth.",
    "You’re not alone in this moment.",
    "I hear you.",
    "Your presence matters.",
    "I’m here as long as you need.",
    "You’re not unwanted.",
    "You deserve kindness.",
    "I’m staying.",
    "You’re not ignored here.",
    "I care about your thoughts.",
    "You’re important.",
    "You’re not too much.",
    "You’re enough.",
    "I’m glad you exist.",
    "You matter to me.",
    "I’m listening."
    ],
    happy: [
      "That makes me smile 😊",
    "I’m really happy to hear that!",
    "You deserve moments like this.",
    "That sounds wonderful.",
    "I love hearing this from you.",
    "Enjoy this feeling.",
    "That’s really nice 🤍",
    "I’m glad today feels lighter.",
    "Hold onto this moment.",
    "That’s great news!",
    "You earned this happiness.",
    "I’m smiling with you.",
    "That sounds peaceful.",
    "I’m happy for you.",
    "It’s nice to hear positivity.",
    "That’s beautiful.",
    "Your happiness matters.",
    "Enjoy it fully.",
    "That’s lovely.",
    "I’m glad you shared this.",
    "That sounds refreshing.",
    "You deserve joy.",
    "I’m really glad for you.",
    "That’s uplifting.",
    "I love this energy.",
    "That’s a good feeling.",
    "Enjoy this moment.",
    "That’s heartwarming.",
    "I’m glad today feels good.",
    "That’s amazing.",
    "Your joy matters.",
    "I’m here celebrating with you.",
    "That’s wonderful to hear.",
    "Keep enjoying it.",
    "That sounds calming.",
    "I’m really happy for you.",
    "That’s comforting.",
    "I love hearing this.",
    "That’s great.",
    "Enjoy it 🤍"
    ],
    neutral: [
       "I’m listening 💬",
    "Tell me more.",
    "I’m here with you.",
    "What’s been on your mind?",
    "You can talk freely here.",
    "I’m right here.",
    "Go on, I’m listening.",
    "Take your time.",
    "I’m curious to hear more.",
    "What’s been happening lately?",
    "I’m paying attention.",
    "You don’t have to rush.",
    "I’m here for this conversation.",
    "Tell me what you feel comfortable sharing.",
    "I’m listening carefully.",
    "You’re safe to talk here.",
    "I’m here.",
    "What’s next on your mind?",
    "I’m open to hearing anything.",
    "You can continue.",
    "I’m not judging.",
    "Tell me more if you want.",
    "I’m staying with you.",
    "I’m here to listen.",
    "Take your time.",
    "I’m present.",
    "You can speak freely.",
    "I’m listening.",
    "What would you like to talk about?",
    "I’m here.",
    "Go ahead.",
    "I’m right here.",
    "You’re safe to share.",
    "I’m listening quietly.",
    "I’m here for you.",
    "Tell me what’s on your heart.",
    "I’m open.",
    "You can continue.",
    "I’m listening attentively.",
    "I’m here."
    ],
    crisis: [
      "I’m really glad you told me this 💔 You don’t have to go through it alone.",
    ],
  };

  const pickReply = (emotion) => {
    const pool = replies[emotion] || replies.neutral;
    return pool[Math.floor(Math.random() * pool.length)] + timeEmoji();
  };

  /* -------- SEND MESSAGE -------- */
  const sendMessage = (text) => {
  if (!text.trim()) return;

  setMessages(prev => [...prev, { sender: "user", text }]);

  // ✅ SAVE MOOD FOR DASHBOARD
  saveMoodFromChat(text);

  const emotion = detectEmotion(text);

  if (emotion === "crisis") {
    setShowCrisis(true);
  }

  if (emotion === "anxious") {
    setTimeout(() => setShowBreathing(true), 800);
  }

  setTyping(true);
  setTimeout(() => {
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: pickReply(emotion) },
    ]);
    setTyping(false);
  }, 1200);
};

      return (
    <div style={page}>
      <Header />

      <div style={chatBox}>
        {messages.map((m, i) => (
          <Message key={i} sender={m.sender} text={m.text} />
        ))}
        {typing && <Typing />}
      </div>

      {/* quick actions */}
      <div style={actions}>
        <button style={btn} onClick={() => setShowBreathing(true)}>🌬 Breathe</button>
        <button style={btn} onClick={() => setShowGrounding(true)}>🌱 Ground</button>
      </div>
      


      <MessageInput onSend={sendMessage} />

      <CrisisModal open={showCrisis} onClose={() => setShowCrisis(false)} />
       <BreathingModal
      open={showBreathing}
      onClose={() => setShowBreathing(false)}
      emotion={
        detectEmotion(
          messages.filter(m => m.sender === "user").slice(-1)[0]?.text || ""
        )
      }
    />
      <GroundingModal open={showGrounding} onClose={() => setShowGrounding(false)} />
    </div>
  );
}

/* -------- STYLES -------- */
const page = {
  minHeight: "100vh",
  background: "#000",
  display: "flex",
  flexDirection: "column",
};

const chatBox = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
};

const actions = {
  display: "flex",
  gap: "10px",
  padding: "10px 20px",
};

const btn = {
  background: "#111",
  color: "white",
  border: "1px solid #222",
  borderRadius: "10px",
  padding: "8px 12px",
  cursor: "pointer",
};
