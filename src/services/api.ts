// Direct Gemini AI integration for chat
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "code" | "chart";
}

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    try {
      if (!API_KEY) {
        console.error('VITE_GEMINI_API_KEY not found in environment variables');
        return;
      }
      
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  async generateResponse(message: string, conversationHistory: Message[]): Promise<string> {
    try {
      if (!this.model) {
        throw new Error('Gemini AI not initialized. Please check your API key.');
      }

      // Build context from conversation history
      let context = "";
      if (conversationHistory.length > 0) {
        const recentMessages = conversationHistory.slice(-5); // Last 5 messages for context
        context = recentMessages
          .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
          .join('\n') + '\n\n';
      }

      const prompt = `${context}Human: ${message}\nAssistant:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text || "I apologize, but I couldn't generate a response at the moment. Please try again.";
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `I'm sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`;
    }
  }

  async testConnection(): Promise<{ status: string; message: string }> {
    try {
      if (!this.model) {
        return {
          status: 'error',
          message: 'Gemini AI not initialized. Please check your API key.'
        };
      }

      const testResponse = await this.generateResponse("Hello, can you confirm you're working?", []);
      return {
        status: 'connected',
        message: `Gemini AI connected successfully. Response: ${testResponse.slice(0, 100)}${testResponse.length > 100 ? '...' : ''}`
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Gemini AI connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

const geminiService = new GeminiService();

export class ApiService {
  static async sendMessage(message: string, conversationHistory: Message[]): Promise<Message> {
    try {
      const aiResponse = await geminiService.generateResponse(message, conversationHistory);
      
      return {
        id: Date.now().toString(),
        content: aiResponse,
        sender: "assistant",
        timestamp: new Date(),
        type: "text"
      };
    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback response if API fails
      return {
        id: Date.now().toString(),
        content: "🤖 I'm experiencing some technical difficulties connecting to the AI service. Please check your internet connection and API key, then try again.",
        sender: "assistant",
        timestamp: new Date(),
        type: "text"
      };
    }
  }

  static async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      return await geminiService.testConnection();
    } catch (error) {
      return {
        status: 'error',
        message: 'Cannot connect to Gemini AI service'
      };
    }
  }
}
