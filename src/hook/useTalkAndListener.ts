const useTalkAndListener = () => {
  const talk = (text: string) => {
    const synth = window.speechSynthesis;

    const speakWithVoice = () => {
      const voices = synth.getVoices();
      const spanishVoice = voices.find(
        v => (v.name.includes("Google") || v.name.includes("Microsoft")) && v.lang === "es-ES"
      );

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 1.2; // 🔹 Aumenta un poquito la velocidad

      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = speakWithVoice;
    } else {
      speakWithVoice();
    }
  };


  const listen = () => {
  };

  return { talk, listen };
};

export default useTalkAndListener;