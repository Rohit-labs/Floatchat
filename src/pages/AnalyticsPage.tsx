import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapVisualization from "@/components/MapVisualization";

const AnalyticsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-40 right-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <motion.main
        className="relative z-10 pt-20 flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <MapVisualization />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;