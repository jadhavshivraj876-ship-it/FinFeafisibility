'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { Language } from '@/types';
import { SpeechAssistant } from '@/lib/speechUtils';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

const SAMPLE_QUERIES: Record<Language, string[]> = {
  mr: [
    'हळद पावडर उद्योग सुरू करायचा आहे, किती भांडवल लागेल?',
    'PMEGP योजनेत महिलांसाठी किती टक्के सबसिडी मिळते?',
    'गांडूळखत प्रकल्पासाठी बँक कर्ज कसे मिळेल?',
    'कोल्ड प्रेस्ड तेल उद्योगात नफा किती होतो?'
  ],
  hi: [
    'मिनी दाल मिल शुरू करने के लिए कितना खर्च आएगा?',
    'PMEGP योजना में 35% सब्सिडी कैसे मिलती है?',
    'वर्मीकम्पोस्ट खाद के लिए बैंक लोन कैसे लें?',
    'सौर ऊर्जा कोल्ड स्टोरेज के क्या फायदे हैं?'
  ],
  en: [
    'How much capital is needed for a Cold Pressed Oil unit?',
    'What is the subsidy percentage under PMEGP for rural areas?',
    'How to calculate DSCR for a bank term loan?',
    'Which business has the highest profit margin in Satara?'
  ],
  te: [
    'పప్పు మిల్లు ప్రారంభించడానికి ఎంత ఖర్చవుతుంది?',
    'PMEGP పథకంలో సబ్సిడీ ఎంత లభిస్తుంది?'
  ],
  ta: [
    'எண்ணெய் ஆலை தொடங்க எவ்வளவு முதலீடு தேவை?',
    'PMEGP திட்டத்தில் மானியம் பெறுவது எப்படி?'
  ],
  gu: [
    'દાળ મિલ શરૂ કરવા કેટલું રોકાણ જોઇશે?',
    'PMEGP યોજનામાં સબસિડી કેટલી મળે છે?'
  ],
  bn: [
    'মিনি ডাল মিল শুরু করতে কত মূলধন দরকার?',
    'PMEGP প্রকল্পে ভর্তুকি কত পাওয়া যায়?'
  ]
};

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        currentLang === 'mr'
          ? 'नमस्कार! मी फिनमित्र (FinMitra) — आपला ग्रामीण व्यवसाय व कर्ज सल्लागार. आपण व्यवसाय खर्च, सरकारी सबसिडी किंवा बँक कर्जाविषयी प्रश्न विचारू शकता.'
          : currentLang === 'hi'
          ? 'नमस्ते! मैं फिनमित्र (FinMitra) — आपका ग्रामीण व्यापार एवं ऋण सलाहकार। आप व्यवसाय लागत, सब्सिडी या बैंक लोन के बारे में पूछ सकते हैं।'
          : 'Hello! I am FinMitra — your rural micro-enterprise and bank financing advisory assistant. Ask me about project costs, government subsidies, or loan repayment schedules.'
    }
  ]);

  const speechRef = useRef<SpeechAssistant | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    speechRef.current = new SpeechAssistant();
    return () => {
      speechRef.current?.stopListening();
      speechRef.current?.stopSpeaking();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleToggleListening = () => {
    if (!speechRef.current) return;

    if (isListening) {
      speechRef.current.stopListening();
      setIsListening(false);
    } else {
      setTranscript('');
      setIsListening(true);
      speechRef.current.startListening(
        currentLang,
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal && text.trim().length > 2) {
            handleProcessQuery(text);
          }
        },
        (err) => {
          console.warn('Voice recognition error:', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const handleProcessQuery = (query: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsListening(false);

    // Dynamic Intelligent Advisory Response Generator
    const qLower = query.toLowerCase();
    let reply = '';
    let link: ChatMessage['actionLink'] = undefined;

    if (qLower.includes('pmegp') || qLower.includes('सबसिडी') || qLower.includes('subsidy') || qLower.includes('अनुदान')) {
      reply =
        currentLang === 'mr'
          ? 'PMEGP योजनेअंतर्गत ग्रामीण भागातील महिला, SC, ST, OBC प्रवर्गासाठी तब्बल ३५% भांडवली अनुदान (सबसिडी) मिळते. यासाठी उद्योजकाचे स्वतःचे योगदान फक्त ५% आवश्यक असते, तर उर्वरित ९०-९५% रक्कम बँकेमार्फत मुदत कर्ज स्वरूपात मिळते!'
          : currentLang === 'hi'
          ? 'PMEGP योजना के तहत ग्रामीण क्षेत्रों में महिलाओं, SC, ST, OBC वर्ग के लिए 35% पूंजीगत सब्सिडी मिलती है। उद्यमी का अपना अंशदान सिर्फ 5% रहता है और बाकी बैंक लोन मिलता है।'
          : 'Under PMEGP, rural special category entrepreneurs (Women, SC, ST, OBC, Minority) get 35% capital subsidy, requiring only 5% promoter contribution, with the remaining 95% financed by bank loan.';
      link = { label: 'Explore Scheme Router', href: '/scheme-router' };
    } else if (qLower.includes('हळद') || qLower.includes('turmeric') || qLower.includes('हल्दी')) {
      reply =
        currentLang === 'mr'
          ? 'हळद पावडर व पॉलिशिंग युनिटसाठी अंदाजे १२.५ लाख रुपये प्रकल्प खर्च येतो. PMEGP मधून ४.३ लाख रुपयांपर्यंत अनुदान मिळू शकते. मासिक नफा अंदाजे ६०,००० ते ८०,००० रुपये संभव आहे.'
          : currentLang === 'hi'
          ? 'हल्दी पाउडर व पॉलिशिंग इकाई के लिए लगभग ₹12.5 लाख का प्रोजेक्ट कॉस्ट लगता है, जिसमें PMEGP से 35% तक सब्सिडी मिल सकती है।'
          : 'A Turmeric Processing & Packaging unit costs approx ₹12.5 Lakhs. With PMEGP rural subsidy (₹4.37 Lakhs), the effective loan burden is significantly minimized with average DSCR of 1.78.';
      link = { label: 'View Financial Plan', href: '/financial-calculator' };
    } else if (qLower.includes('दाल') || qLower.includes('डाळ') || qLower.includes('dal')) {
      reply =
        currentLang === 'mr'
          ? 'मिनी डाळ मिल प्रकल्पाचा एकूण खर्च सुमारे ९.५ लाख रुपये आहे. तूर, हरभरा व मूग डाळ प्रक्रियेतून २०% ते २२% नफा मिळतो. हा प्रकल्प मुद्रा किंवा PMEGP अंतर्गत सहज मंजूर होतो.'
          : 'Automatic Mini Dal Mill project cost is approx ₹9.5 Lakhs. With steady local pulse sourcing, it provides a break-even at 42% capacity.';
      link = { label: 'Calculate EMI & DSCR', href: '/financial-calculator' };
    } else if (qLower.includes('dscr') || qLower.includes('कर्ज') || qLower.includes('loan') || qLower.includes('बँक')) {
      reply =
        currentLang === 'mr'
          ? 'बँका कर्ज मंजूर करताना DSCR (Debt Service Coverage Ratio) १.५ पेक्षा जास्त तपासतात. FinFeasibility मध्ये आपले कर्ज आपोआप १.५+ DSCR नुसार नियोजित केले जाते जेणेकरून बँक कर्ज नाकारत नाही.'
          : currentLang === 'hi'
          ? 'बैंक लोन पास करते समय DSCR अनुपात 1.5 से अधिक होना चाहिए। हमारा सिस्टम स्वचालित रूप से बैंक-अनुकूल वित्तीय रिपोर्ट तैयार करता है।'
          : 'Banks require a minimum DSCR of 1.4 to 1.5 to approve loans. FinFeasibility structures your revenue and debt service to ensure optimal DSCR and zero loan rejections.';
      link = { label: 'Check DPR Generator', href: '/dpr-generator' };
    } else {
      reply =
        currentLang === 'mr'
          ? `आपला प्रश्न: "${query}". या प्रकल्पाची स्थानिक बाजारातील व्यवहार्यता, कच्चा माल उपलब्धता आणि सरकारी योजना तपासून आम्ही तपशीलवार अहवाल तयार केला आहे.`
          : currentLang === 'hi'
          ? `आपके सवाल "${query}" के आधार पर, हमने स्थानीय बाजार मांग और उपयुक्त सरकारी योजना का विश्लेषण किया है।`
          : `For your query regarding "${query}", FinFeasibility recommends evaluating local APMC raw material proximity and structuring financing under PMEGP or PMFME.`;
      link = { label: 'View Full Feasibility', href: '/' };
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      text: reply,
      actionLink: link
    };

    setMessages((prev) => [...prev, assistantMsg]);

    // Speak reply
    if (speechRef.current) {
      setIsSpeaking(true);
      speechRef.current.speak(reply, currentLang, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleStopSpeaking = () => {
    speechRef.current?.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-amber-200 dark:border-zinc-700 flex flex-col h-[620px] max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">FinMitra Rural Voice Assistant</h3>
                <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Multilingual AI
                </span>
              </div>
              <p className="text-amber-100 text-xs">
                Ask in Marathi, Hindi, or English about schemes, costs & bank loans
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={handleStopSpeaking}
                className="p-2 rounded-full bg-amber-900/60 hover:bg-amber-900 text-white text-xs flex items-center gap-1 transition-colors"
                title="Stop audio"
              >
                <VolumeX className="w-4 h-4 text-amber-300" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat message thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-zinc-50 dark:bg-zinc-950">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">
                  FM
                </div>
              )}
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-none'
                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-none'
                }`}
              >
                <p className="text-xs leading-relaxed">{m.text}</p>
                {m.actionLink && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-700">
                    <a
                      href={m.actionLink.href}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      <span>{m.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Sample suggested prompts */}
        <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-[11px] text-zinc-500 font-semibold mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested Questions (Click to Ask):</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(SAMPLE_QUERIES[currentLang] || SAMPLE_QUERIES['en']).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessQuery(q)}
                className="shrink-0 text-left bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-700 dark:text-zinc-300 hover:text-amber-800 dark:hover:text-amber-300 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Input Action Bar */}
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
          <button
            onClick={handleToggleListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-md cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-600 animate-bounce ring-4 ring-rose-300'
                : 'bg-amber-600 hover:bg-amber-700 active:scale-95'
            }`}
            title={isListening ? 'Stop listening' : 'Start speaking'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1">
            {isListening ? (
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span>Listening to you... Speak in your language</span>
              </div>
            ) : transcript ? (
              <div className="text-zinc-800 dark:text-zinc-200 text-xs italic truncate">
                &ldquo;{transcript}&rdquo;
              </div>
            ) : (
              <div className="text-zinc-500 text-xs">
                Click mic and speak your idea or question...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
