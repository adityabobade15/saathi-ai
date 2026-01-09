export function saveMoodFromChat(text) {
  const t = text.toLowerCase();

  let mood = null;
  let emoji = "🙂";

  if (t.includes("happy") || t.includes("good")) {
    mood = "Happy";
    emoji = "😊";
  } else if (t.includes("okay") || t.includes("fine")) {
    mood = "Okay";
    emoji = "🙂";
  } else if (t.includes("neutral")) {
    mood = "Neutral";
    emoji = "😐";
  } else if (t.includes("anxious") || t.includes("panic")) {
    mood = "Anxious";
    emoji = "😟";
  } else if (
    t.includes("sad") ||
    t.includes("low") ||
    t.includes("depressed")
  ) {
    mood = "Low";
    emoji = "😔";
  }

  
  if (!mood) return;

  const history =
    JSON.parse(localStorage.getItem("moodHistory")) || [];

  history.unshift({
    mood,
    emoji,
    time: new Date().toLocaleString(),
  });

  localStorage.setItem("moodHistory", JSON.stringify(history));
}
