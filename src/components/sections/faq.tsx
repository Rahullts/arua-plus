import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const FAQS = [
  {
    q: "How is Arua+ different from other streaming apps?",
    a: "Most apps recommend based on what you've already played. Arua+ starts from how you're feeling right now, then builds the mix around that — so the same person gets a different flow on a Monday morning versus a Friday night.",
  },
  {
    q: "Does spatial audio require special headphones?",
    a: "No. It's mixed to sound noticeably better on any headphones, and even richer on ones that support head tracking. There's no separate hardware to buy.",
  },
  {
    q: "Can I use Arua+ offline?",
    a: "Yes, on Premium and Family plans. Download a flow before you lose signal and it plays exactly as it would online, equalizer and all.",
  },
  {
    q: "What happens to my mixes if I cancel Premium?",
    a: "Every playlist you've saved stays in your library. You'll move back to shuffle-only mixing and standard quality, but nothing you've built gets deleted.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes — verified students get Premium at the Free tier's price. Verification takes about a minute through your university email.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onClick}
        data-cursor-hover
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-medium text-foam">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-cyan"
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-foam-dim leading-relaxed max-w-2xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 lg:py-40">
      <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center mb-16">
        <p className="eyebrow mb-4">Questions</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          Still wondering?
        </h2>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto max-w-2xl px-6">
        {FAQS.map((faq, i) => (
          <FAQItem
            key={faq.q}
            faq={faq}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </RevealOnScroll>
    </section>
  );
}
