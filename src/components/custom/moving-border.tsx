"use client";

import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { Button as ShadcnButton, type ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  borderRadius?: string;
  duration?: number;
  borderClassName?: string;
  children: React.ReactNode;
}

export function AnimatedButton({
  borderRadius = "1.75rem",
  duration = 2000,
  borderClassName,
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <ShadcnButton
      {...props}
      className={cn("relative overflow-hidden p-[1px]", className)}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-80 bg-[radial-gradient(ellipse_at_center,_var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className="relative flex items-center justify-center w-full h-full text-sm"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </ShadcnButton>
  );
}

interface MovingBorderProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export function MovingBorder({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x || 0
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y || 0
  );

  const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translateX(-50%)
    translateY(-50%)
  `;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}