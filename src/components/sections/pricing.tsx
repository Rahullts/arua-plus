import { motion } from "motion/react";
import { Check } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import MagneticButton from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "For discovering what Arua+ feels like.",
    features: [
      "Shuffle-only mood mixes",
      "Standard audio quality",
      "Ads between tracks",
      "1 device at a time",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "₹149",
    period: "/month",
    description: "Full control, zero interruptions.",
    features: [
      "On-demand AI mood mixes",
      "Spatial audio + lossless",
      "Ad-free, always",
      "Offline listening",
      "Live lyrics on every track",
    ],
    cta: "Go Premium",
    popular: true,
  },
  {
    name: "Family",
    price: "₹249",
    period: "/month",
    description: "Everything in Premium, for up to 6 people.",
    features: [
      "6 individual accounts",
      "Separate taste profiles",
      "Parental content controls",
      "One shared family mix",
    ],
    cta: "Start Family Plan",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40">
      <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center mb-16">
        <p className="eyebrow mb-4">Pricing</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          Pick your tempo
        </h2>
        <p className="mt-5 text-foam-dim">
          No hidden tiers, no surprise renewals. Cancel in two taps, anytime.
        </p>
      </RevealOnScroll>

      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -6 }}
            data-cursor-hover
            className={cn(
              "relative rounded-3xl p-8 flex flex-col",
              plan.popular
                ? "glass-strong border border-violet-soft/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]"
                : "glass",
            )}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet to-cyan text-void">
                Most Popular
              </span>
            )}

            <h3 className="font-display text-xl font-semibold mt-2">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">{plan.price}</span>
              <span className="text-foam-faint text-sm">{plan.period}</span>
            </div>
            <p className="text-sm text-foam-dim mt-3">{plan.description}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="size-4 text-cyan shrink-0 mt-0.5" />
                  <span className="text-foam-dim">{f}</span>
                </li>
              ))}
            </ul>

            <MagneticButton
              variant={plan.popular ? "primary" : "secondary"}
              className="w-full justify-center mt-8"
            >
              {plan.cta}
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
