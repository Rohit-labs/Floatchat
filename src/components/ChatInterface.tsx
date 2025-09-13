import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Mic, MicOff } from "lucide-react";
import { ApiService } from "@/services/api";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "code" | "chart";
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Welcome to Float Chat! I'm your intelligent AI assistant specialized in oceanographic float data analysis. I can help you understand ARGO float measurements, CTD profiles, temperature and salinity data, and ocean monitoring insights. I support voice input - just click the microphone icon to speak!",
      sender: "assistant",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [autoSubmitTimer, setAutoSubmitTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check Gemini API connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const health = await ApiService.checkHealth();
        setConnectionStatus(health.status === 'connected' ? 'connected' : 'error');
      } catch (error) {
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        
        // Start auto-submit timer
        startAutoSubmitTimer();
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        clearAutoSubmitTimer();
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Auto-submit functionality
  const startAutoSubmitTimer = () => {
    clearAutoSubmitTimer();
    setTimeRemaining(3);
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAutoSubmitTimer(null);
          setTimeRemaining(0);
          handleSendMessage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setAutoSubmitTimer(timer);
  };

  const clearAutoSubmitTimer = () => {
    if (autoSubmitTimer) {
      clearTimeout(autoSubmitTimer);
      setAutoSubmitTimer(null);
      setTimeRemaining(0);
    }
  };

  // Voice recognition toggle
  const toggleVoiceRecognition = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      clearAutoSubmitTimer();
    } else {
      setInputValue('');
      recognition.start();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: messageId,
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    const userInput = inputValue.trim();
    setMessages(prev => {
      console.log('Adding user message, current messages:', prev.length);
      return [...prev, userMessage];
    });
    setInputValue("");
    setIsTyping(true);
    clearAutoSubmitTimer();

    try {
      // Send message to Gemini API
      const response = await ApiService.sendMessage(userInput, messages);
      
      // Ensure response has a unique ID
      const assistantMessage = {
        ...response,
        id: `assistant-${Date.now()}`,
        timestamp: new Date()
      };
      
      setMessages(prev => {
        console.log('Adding assistant message, current messages:', prev.length);
        return [...prev, assistantMessage];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I encountered an error while processing your message. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    console.log('Messages changed, total messages:', messages.length, 'isTyping:', isTyping);
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
          console.log('Scrolled chat area to bottom');
        }
      }
    };
    
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      clearAutoSubmitTimer();
      handleSendMessage();
    }
  };

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 relative">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Chat with AI Assistant
          </h2>
          {/* Connection Status Indicator */}
          <div className="absolute top-0 right-4">
            {connectionStatus === 'connected' && <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>}
            {connectionStatus === 'connecting' && <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>}
            {connectionStatus === 'error' && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
        </div>

        <Card className="h-[75vh] flex flex-col shadow-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.id}-${index}`}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 justify-start">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t">
            {timeRemaining > 0 && (
              <div className="mb-3 text-center">
                <div className="text-sm text-muted-foreground">
                  Auto-submitting in {timeRemaining}s...{' '}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={clearAutoSubmitTimer}
                    className="p-0 h-auto text-xs underline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening... speak now" : "Ask about float data, ocean measurements, or ARGO profiles..."}
                className="flex-1 text-base py-3 px-4 border-2 focus:border-primary transition-colors"
                disabled={isListening}
              />
              <Button 
                onClick={toggleVoiceRecognition} 
                variant={isListening ? "destructive" : "secondary"}
                size="icon"
                disabled={connectionStatus !== 'connected'}
                className="h-12 w-12"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isTyping || connectionStatus !== 'connected'}
                size="icon"
                className="h-12 w-12"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Example Queries */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">🌊 Try these float data queries:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQueries.map((query, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg bg-card/60 backdrop-blur-sm"
                onClick={() => setInputValue(query)}
              >
                <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">{query}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const exampleQueries = [
  "What is ARGO float data and how is it collected?",
  "Explain temperature and salinity profiles in ocean measurements",
  "How do oceanographic floats monitor deep sea conditions?",
  "Show me the latest trends in global ocean temperature data"
];

export default ChatInterface;