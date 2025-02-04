import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="mt-12">
              <Badge color="primary" className="mb-4">
                Contact
              </Badge>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-sm md:text-base opacity-90 max-w-2xl mb-8">
                Feel free to reach out if you'd like to collaborate or just have a chat.
              </p>
              
              <a 
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                  rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 