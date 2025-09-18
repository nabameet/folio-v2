import { motion } from "framer-motion";

interface ProgressDisplayProps {
  /** Current loading progress percentage */
  progress: number;
  /** Loading message to display */
  loadingMessage: string;
  /** Whether to show the progress display */
  isVisible: boolean;
}

/**
 * Loading progress display with smooth animations
 *
 * Shows percentage and loading message with fade out capability
 */
export const ProgressDisplay = ({
  progress,
  loadingMessage,
  isVisible,
}: ProgressDisplayProps) => {
  const roundedProgress = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div>
        <p>{roundedProgress}%</p>
        <p>{loadingMessage}</p>
      </div>
    </motion.div>
  );
};
