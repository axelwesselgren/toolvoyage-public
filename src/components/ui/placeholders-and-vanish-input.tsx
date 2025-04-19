"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface AnimatedPlaceholderInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  placeholders: string[];
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  className,
  value,
  onKeyDown,
  ...props
}: AnimatedPlaceholderInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [placeholders]);

  return (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onChange={onChange}
        placeholder=""
        className={className}
        onKeyDown={onKeyDown}
      />
      {!value && (
        <div className="absolute inset-0 left-3 flex items-center pointer-events-none pl-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={`placeholder-${currentPlaceholder}`}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="text-sm text-neutral-500"
            >
              {placeholders[currentPlaceholder]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
