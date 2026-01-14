"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextScramble } from "../motion-primitives/text-scramble";
import { cn } from "@/lib/utils";
import { Particles } from "../ui/particles";
import Image from "next/image";

export const FaceScanIllustration = () => {
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);

      const hideTimer = setTimeout(() => {
        setShow(false);
        setShowName(true);
      }, 100);

      return () => clearTimeout(hideTimer);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div aria-hidden className="group relative m-auto size-fit">
      {/* Colorful Gradient Background */}
      <div className="absolute -inset-8 z-0 opacity-20 blur-2xl">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-300 to-rose-400 rounded-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-300 to-orange-300 rounded-full" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-300 to-emerald-400 rounded-full" />
      </div>

      {/* Particles Grid Overlay */}
      <div className="absolute -inset-12 z-[5] pointer-events-none">
        <Particles
          className="size-full"
          quantity={150}
          staticity={30}
          color="#ffffff"
          size={0.8}
          ease={20}
        />
      </div>

      <div
        className="not-dark:opacity-25 mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] absolute -inset-6 z-10 mix-blend-screen"
        style={{
          backgroundImage: `
        linear-gradient(to right, #000 1px, transparent 1px),
        linear-gradient(to bottom, #000 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
        }}
      />

      <div className="absolute inset-0 animate-spin opacity-30 blur-2xl dark:opacity-20">
        <div className="bg-linear-to-r/increasing animate-hue-rotate absolute inset-0 rounded-full from-pink-300 to-indigo-300" />
      </div>
      <div className="animate-scan absolute inset-x-12 inset-y-0 z-10">
        <div className="absolute inset-x-0 m-auto h-6 rounded-full bg-white/50 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
        className="aspect-2/3 absolute inset-0 z-10 m-auto w-24"
      >
        <CardDecorator className="scale-125 border-white blur-[3px]" />
        <motion.div
          initial={{ "--frame-color": "white" }}
          animate={{ "--frame-color": "var(--color-lime-400)" }}
          transition={{ duration: 0.4, delay: 3.5, type: "spring" }}
        >
          <CardDecorator className="border-(--frame-color) z-10" />
        </motion.div>
      </motion.div>

      {show && (
        <div className="absolute inset-0 z-10 scale-150 rounded-full bg-white mix-blend-overlay blur-xl" />
      )}

      <div className="bg-radial aspect-square max-w-xs [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] group-hover:opacity-95">
        <Image
          src="/me.png"
          alt="woman face"
          className="bg-illustration size-full object-cover grayscale"
          width={560}
          height={560}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-4 justify-center"
      >
        {showName && (
          <TextScramble className="text-center font-mono text-sm uppercase text-secondary bg-white/80 dark:bg-black/80 rounded-lg px-2 space-y-4">
            Federico Fan
          </TextScramble>
        )}
      </div>
    </div>
  );
};

export const CardDecorator = ({ className }: { className?: string }) => (
  <>
    <span
      className={cn(
        "absolute -left-px -top-px block size-2.5 border-l-[1.5px] border-t-[1.5px] border-white",
        className
      )}
    ></span>
    <span
      className={cn(
        "absolute -right-px -top-px block size-2.5 border-r-[1.5px] border-t-[1.5px] border-white",
        className
      )}
    ></span>
    <span
      className={cn(
        "absolute -bottom-px -left-px block size-2.5 border-b-[1.5px] border-l-[1.5px] border-white",
        className
      )}
    ></span>
    <span
      className={cn(
        "absolute -bottom-px -right-px block size-2.5 border-b-[1.5px] border-r-[1.5px] border-white",
        className
      )}
    ></span>
  </>
);

export default FaceScanIllustration;
