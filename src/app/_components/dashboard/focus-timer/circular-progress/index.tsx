import { motion } from "framer-motion";

interface Props {
  progress: number;
}
const CircularProgress = ({ progress }: Props) => {
  const radius = 18; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke dashoffset based on the progress
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <motion.circle
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        stroke="blue"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.2 }} // Adjust the duration as needed
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
};

export default CircularProgress;
