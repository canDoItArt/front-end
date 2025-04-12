import { motion, AnimatePresence } from "framer-motion";

export default function BottomModalLayout({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-[480px] rounded-t-lg py-2"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 모달 닫히지 않도록 방지
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
