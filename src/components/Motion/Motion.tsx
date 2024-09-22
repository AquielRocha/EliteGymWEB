
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const MotionH2 = ({ children }: { children: ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
);

export default MotionH2;
