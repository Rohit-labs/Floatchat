import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MessageCircle, 
  BarChart3, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Zap,
  Globe,
  Bot
} from "lucide-react";

const Homepage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      <Navbar />
      
      <motion.div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-20 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <Badge variant="secondary" className="px-6 py-2 text-sm font-medium bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Chat Experience
          </Badge>
        </motion.div>

        {/* Main Heading with Typing Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-6">
            Float Chat
          </h1>
          <div className="text-2xl md:text-4xl font-semibold text-muted-foreground min-h-[3rem] md:min-h-[4rem]">
            <TypeAnimation
              sequence={[
                'AI-Powered Chat Assistant',
                2000,
                'Smart Conversations',
                2000,
                'Voice Recognition Enabled',
                2000,
                'Your Intelligent Chat Partner',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
        >
          Experience the future of AI conversation with Float Chat. Our intelligent chat system 
          features voice recognition, auto-submit functionality, and seamless AI interactions. 
          Chat naturally and get instant responses from our advanced AI assistant.
        </motion.p>

        {/* Action Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-12"
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Card className="relative p-8 border-2 border-border hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer group bg-card">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <Bot className="h-8 w-8" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">AI Chat Assistant</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Engage with our intelligent AI assistant. Ask questions, 
                  get insights, and explore conversations through natural language with voice support.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Voice Recognition</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Auto-Submit</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Context Aware</Badge>
                </div>
                <Button 
                  onClick={() => navigate('/chat')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chatting
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Card className="relative p-8 border-2 border-border hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer group bg-card">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Data Visualization</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Transform your data into beautiful, interactive visualizations. 
                  Create charts, graphs, and insights that bring your data to life.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Interactive Charts</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Real-time Data</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950">Export Options</Badge>
                </div>
                <Button 
                  onClick={() => navigate('/analytics')}
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                  size="lg"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Analytics
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Real-time Data</span>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Homepage;