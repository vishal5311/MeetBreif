"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export const SlideIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);
