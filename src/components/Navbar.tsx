import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Home, BarChart3, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "AI Chat", href: "/chat", icon: MessageCircle },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Float Chat
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => navigate(item.href)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-4 w-4" />
              </Button>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50"
          >
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => {
                        navigate(item.href);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full justify-start gap-3 py-3",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;