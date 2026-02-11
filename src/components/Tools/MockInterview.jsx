import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw, MessageSquare, Layout, BrainCircuit, Target, Settings, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MockInterview = () => {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' or 'feedback'
  const [interviewType, setInterviewType] = useState('product-sense');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI Interview Coach. Choose an interview type and let's practice. I'll provide feedback on your answers using the STAR method (Situation, Task, Action, Result)." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [model, setModel] = useState('gpt-5.2');
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const interviewTypes = [
    { id: 'product-sense', name: 'Product Sense', icon: BrainCircuit, description: 'Practice identifying user problems and defining product vision.' },
    { id: 'behavioral', name: 'Behavioral', icon: MessageSquare, description: 'Practice STAR stories for leadership and collaboration.' },
    { id: 'technical', name: 'Technical / Architecture', icon: Layout, description: 'Discuss system design and working with engineers.' },
    { id: 'estimation', name: 'Estimation / Guesstimate', icon: Target, description: 'Practice sizing markets and metrics.' },
  ];

  const questions = {
    'product-sense': [
      "Improve Google Maps for visually impaired users.",
      "Design a coffee machine for offices.",
      "How would you improve the Instagram discovery experience?",
      "Design a product to help people find roommates."
    ],
    'behavioral': [
      "Tell me about a time you had a conflict with an engineer.",
      "Describe a product launch that failed. What did you learn?",
      "Tell me about a time you used data to make a difficult decision.",
      "Give an example of when you had to prioritize one feature over another."
    ],
    'technical': [
      "How would you explain an API to a non-technical stakeholder?",
      "Describe the high-level architecture of a real-time chat app.",
      "What happens when you type google.com into a browser?",
      "How do you handle technical debt in your roadmap?"
    ],
    'estimation': [
      "How many windows are in San Francisco?",
      "Estimate the annual revenue of a local Starbucks.",
      "How much storage does YouTube need per day?",
      "Estimate the market size for electric scooters in Paris."
    ]
  };

  const generateQuestion = () => {
    const typeQuestions = questions[interviewType];
    const randomQuestion = typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
    setCurrentQuestion(randomQuestion);
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `Let's practice a ${interviewType.replace('-', ' ')} question: \n\n**"${randomQuestion}"**` 
    }]);
  };

  const getAIResponse = async (currentMessages) => {
    const systemPrompt = activeTab === 'practice' 
      ? `You are an expert Product Management Interviewer. Your goal is to help the user practice for PM interviews. 
         The user is practicing ${interviewType} questions. 
         ${currentQuestion ? `The current question is: "${currentQuestion}"` : "Wait for the user to select a question or start a conversation."}
         Be supportive but professional. Ask probing follow-up questions about metrics, trade-offs, and user segments. 
         Encourage the use of frameworks like CIRCLES or STAR. If the user gives a short answer, ask them to expand.`
      : `You are an expert PM Career Coach. Analyze the user's response using the STAR method (Situation, Task, Action, Result). 
         Provide constructive feedback on each component (S, T, A, R) and suggest how to make the story more impactful with specific metrics or clearer actions. 
         Use markdown formatting with bold headers for each section.`;

    const makeRequest = async (requestedModel) => {
      return await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: requestedModel,
          messages: currentMessages.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: systemPrompt,
          temperature: 0.7,
        })
      });
    };

    let response = await makeRequest(model);

    if (!response.ok) {
      let errorData;
      try { errorData = await response.json(); } catch (e) {}
      const errMsg = (errorData && errorData.error && errorData.error.message) ? errorData.error.message : 'Failed to reach OpenAI';
      const lower = errMsg.toLowerCase();
      const shouldFallback = lower.includes('not a chat model') || lower.includes('not supported') || lower.includes('does not exist') || lower.includes('invalid model') || lower.includes('model not found');
      
      if (shouldFallback && model !== 'gpt-4o') {
        response = await makeRequest('gpt-4o');
        if (response.ok) {
          setModel('gpt-4o');
        } else {
          try { errorData = await response.json(); } catch (e) {}
          throw new Error((errorData && errorData.error && errorData.error.message) ? errorData.error.message : 'Failed to reach OpenAI');
        }
      } else {
        throw new Error(errMsg);
      }
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    const savedInput = input;
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const aiResponse = await getAIResponse(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      console.error("AI Error:", err);
      setError(err.message);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `⚠️ **Error:** ${err.message}\n\nPlease check your API key in the .env file and ensure you have internet access.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold dark:text-white flex items-center gap-2 text-sm md:text-base">
                AI Interview Coach
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-500">OpenAI Integrated ({model})</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowMobileSettings(true)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex bg-slate-200/50 dark:bg-slate-700/50 p-1 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('practice')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'practice' ? 'bg-white dark:bg-slate-600 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            Practice
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'feedback' ? 'bg-white dark:bg-slate-600 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            STAR Feedback
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Backdrop for mobile settings */}
        {showMobileSettings && (
          <div 
            className="absolute inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileSettings(false)}
          />
        )}

        {/* Sidebar - Settings */}
        <div className={`
          w-72 md:w-64 border-r border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-6 overflow-y-auto overscroll-contain
          absolute inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:bg-transparent md:z-auto
          ${showMobileSettings ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex items-center justify-between md:hidden mb-2">
            <h4 className="font-bold dark:text-white">Interview Settings</h4>
            <button 
              onClick={() => setShowMobileSettings(false)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Interview Type</p>
            <div className="space-y-2">
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setInterviewType(type.id);
                    if (window.innerWidth < 768) setShowMobileSettings(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${interviewType === type.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-2">
            <button 
              onClick={() => {
                generateQuestion();
                if (window.innerWidth < 768) setShowMobileSettings(false);
              }}
              className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              New Question
            </button>
            <button 
              onClick={() => {
                setMessages([{ role: 'assistant', content: "Chat reset. Choose an interview type and let's practice!" }]);
                setCurrentQuestion(null);
                if (window.innerWidth < 768) setShowMobileSettings(false);
              }}
              className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Reset Chat
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50/30 dark:bg-slate-900/30">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-primary text-white'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none dark:text-slate-200'}`}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 items-center text-slate-400">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={activeTab === 'feedback' ? "Paste your STAR story here for feedback..." : "Type your answer..."}
                className="flex-1 bg-slate-100 dark:bg-slate-700 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
