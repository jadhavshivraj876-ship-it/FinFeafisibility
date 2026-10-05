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
  Bot,
  Send,
  Loader2
} from 'lucide-react';
import { Language } from '@/types';
import { SpeechAssistant } from '@/lib/speechUtils';

export interface VoiceAssistantContext {
  businessTitle?: string;
  location?: string;
  domain?: string;
  category?: string;
  projectCost?: number;
  subsidyAmount?: number;
  dscr?: number;
  marginPercent?: number;
  rawMaterials?: string[];
  statutoryLicenses?: string[];
  eligibleSchemes?: Array<{ name: string; subsidyPercent?: number }>;
  matchedInvestors?: Array<{ name: string; ticketSizeRange?: string }>;
}

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  activeContext?: VoiceAssistantContext;
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
    'মিনি ডাল মিল शुरू করতে কত মূলধন দরকার?',
    'PMEGP প্রকল্পে ভর্তুকি কত পাওয়া যায়?'
  ]
};

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  activeContext
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        currentLang === 'mr'
          ? 'नमस्कार! मी फिनमित्र (FinMitra) — आपला AI ग्रामीण व्यवसाय व बँक कर्ज सल्लागार. आपल्या उद्योगाबद्दल, सबसिडी किंवा बँक कर्जाबद्दल कोणताही प्रश्न विचारू शकता.'
          : currentLang === 'hi'
          ? 'नमस्ते! मैं फिनमित्र (FinMitra) — आपका AI ग्रामीण उद्योग एवं ऋण सलाहकार। आप अपने उद्यम, PMEGP सब्सिडी या बैंक लोन के बारे में कोई भी सवाल पूछ सकते हैं।'
          : 'Hello! I am FinMitra — your AI rural micro-enterprise and bank financing advisory assistant. Ask me anything about your project costs, government subsidies, licenses, or bank DPR.'
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
  }, [messages, isThinking]);

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

  const handleProcessQuery = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsListening(false);
    setTextInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/advisory-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({ sender: m.sender === 'assistant' ? 'ai' : 'user', text: m.text })),
          context: activeContext,
          language: currentLang
        })
      });

      const data = await res.json();
      const replyText = data.reply || (
        currentLang === 'mr'
          ? 'माफ करा, प्रतिसाद मिळवण्यात अडचण आली. कृपया पुन्हा विचारून पहा.'
          : currentLang === 'hi'
          ? 'क्षमा करें, उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।'
          : 'Could not fetch response. Please try asking again.'
      );

      // Determine action link if relevant
      let link: ChatMessage['actionLink'] = undefined;
      const lowerReply = replyText.toLowerCase();
      if (lowerReply.includes('pmegp') || lowerReply.includes('subsidy') || lowerReply.includes('anudan')) {
        link = { label: 'Explore Scheme Router', href: '/scheme-router' };
      } else if (lowerReply.includes('dscr') || lowerReply.includes('financial') || lowerReply.includes('margin')) {
        link = { label: 'View Financial Calculator', href: '/financial-calculator' };
      } else if (lowerReply.includes('dpr') || lowerReply.includes('bank report')) {
        link = { label: 'Generate Bank DPR', href: '/dpr-generator' };
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        actionLink: link
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Speak reply
      if (speechRef.current) {
        setIsSpeaking(true);
        speechRef.current.speak(replyText, currentLang, () => {
          setIsSpeaking(false);
        });
      }
    } catch (err) {
      console.warn('Voice AI query error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: currentLang === 'mr'
          ? 'माफ करा, सर्व्हरशी संपर्क साधताना अडचण आली. कृपया पुन्हा विचारून पहा.'
          : currentLang === 'hi'
          ? 'क्षमा करें, सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'
          : 'Sorry, could not connect to AI advisory service. Please try asking again.'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleStopSpeaking = () => {
    speechRef.current?.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-amber-200 dark:border-zinc-700 flex flex-col h-[640px] max-h-[92vh] overflow-hidden"
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
                <h3 className="font-bold text-base">FinMitra Rural AI Advisor</h3>
                <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Multilingual AI
                </span>
              </div>
              <p className="text-amber-100 text-xs">
                Speak or type in Marathi, Hindi, or English about schemes, costs & bank loans
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
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-xs whitespace-pre-line ${
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

          {isThinking && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">
                FM
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-amber-200 dark:border-zinc-700 shadow-xs flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span className="text-xs italic">FinMitra is thinking...</span>
              </div>
            </div>
          )}

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
                disabled={isThinking}
                className="shrink-0 text-left bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-700 dark:text-zinc-300 hover:text-amber-800 dark:hover:text-amber-300 border border-zinc-200 dark:border-zinc-700 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Voice & Text Input Action Bar */}
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-2">
          {/* Text Input Row */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleProcessQuery(textInput);
            }} 
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your question in Marathi, Hindi, or English..."
              disabled={isThinking}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-hidden"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isThinking}
              className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-40 transition-all cursor-pointer"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Voice Row */}
          <div className="flex items-center gap-3 pt-1 border-t border-zinc-200 dark:border-zinc-700">
            <button
              onClick={handleToggleListening}
              disabled={isThinking}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50 ${
                isListening
                  ? 'bg-rose-600 animate-bounce ring-4 ring-rose-300'
                  : 'bg-amber-600 hover:bg-amber-700 active:scale-95'
              }`}
              title={isListening ? 'Stop listening' : 'Start speaking'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <div className="flex-1">
              {isListening ? (
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                  <span>Listening... Speak your question</span>
                </div>
              ) : transcript ? (
                <div className="text-zinc-800 dark:text-zinc-200 text-xs italic truncate">
                  &ldquo;{transcript}&rdquo;
                </div>
              ) : (
                <div className="text-zinc-500 text-xs">
                  Click mic to speak, or type above
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

