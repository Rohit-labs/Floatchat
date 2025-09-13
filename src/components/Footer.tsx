import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-background/80 backdrop-blur-sm border-t border-border/50 py-6 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Float Chat
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Float Chat. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for better conversations</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;