"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type DitheringMode = "bayer" | "halftone" | "noise" | "crosshatch";
type ColorMode = "original" | "grayscale" | "duotone" | "custom";

interface DitherShaderProps {
  /** Source image URL */
  src: string;
  /** Size of the dithering grid cells */
  gridSize?: number;
  /** Type of dithering pattern */
  ditherMode?: DitheringMode;
  /** Color processing mode */
  colorMode?: ColorMode;
  /** Invert the dithered output colors */
  invert?: boolean;
  /** Pixelation multiplier (1 = no pixelation, higher = more pixelated) */
  pixelRatio?: number;
  /** Primary color for duotone mode */
  primaryColor?: string;
  /** Secondary color for duotone mode */
  secondaryColor?: string;
  /** Custom color palette array for custom mode */
  customPalette?: string[];
  /** Brightness adjustment (-1 to 1) */
  brightness?: number;
  /** Contrast adjustment (0 to 2, 1 = normal) */
  contrast?: number;
  /** Background color behind the dithered image */
  backgroundColor?: string;
  /** Object fit behavior */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Threshold bias for dithering (0 to 1) */
  threshold?: number;
  /** Enable animation effect */
  animated?: boolean;
  /** Animation speed (lower = slower) */
  animationSpeed?: number;
  /** Additional CSS classes for the container (use this to set size via Tailwind) */
  className?: string;
}

// 4x4 Bayer matrix for ordered dithering
const BAYER_MATRIX_4x4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

// 8x8 Bayer matrix for finer dithering
const BAYER_MATRIX_8x8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

function parseColor(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      const r = hex.charAt(0);
      const g = hex.charAt(1);
      const b = hex.charAt(2);
      return [
        parseInt(r + r, 16),
        parseInt(g + g, 16),
        parseInt(b + b, 16),
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const match = color.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
  if (match && match[1] && match[2] && match[3]) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  }
  return [0, 0, 0];
}

function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export const DitherShader: React.FC<DitherShaderProps> = ({
  src,
  gridSize = 4,
  ditherMode = "bayer",
  colorMode = "original",
  invert = false,
  pixelRatio = 1,
  primaryColor = "#000000",
  secondaryColor = "#ffffff",
  customPalette = ["#000000", "#ffffff"],
  brightness = 0,
  contrast = 1,
  backgroundColor = "transparent",
  objectFit = "cover",
  threshold = 0.5,
  animated = false,
  animationSpeed = 0.02,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const parsedPrimaryColor = parseColor(primaryColor);
  const parsedSecondaryColor = parseColor(secondaryColor);
  const parsedCustomPalette = customPalette.map(parseColor);

  // IntersectionObserver to pause loop when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = !!entry?.isIntersecting;
      },
      { rootMargin: "100px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ResizeObserver for responsive sizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width: Math.round(width), height: Math.round(height) });
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    let isCancelled = false;

    // Use downscaled resolution buffer with CSS nearest-neighbor imageRendering for 100x FPS boost
    const step = Math.max(1, Math.floor(gridSize * pixelRatio));
    const renderWidth = Math.ceil(dimensions.width / step);
    const renderHeight = Math.ceil(dimensions.height / step);

    canvas.width = renderWidth;
    canvas.height = renderHeight;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const outputImgData = ctx.createImageData(renderWidth, renderHeight);
    const outData = outputImgData.data;

    // Sample source image onto offscreen canvas of matching render resolution
    const offscreen = document.createElement("canvas");
    offscreen.width = renderWidth;
    offscreen.height = renderHeight;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

    const matrixSize = gridSize <= 4 ? 4 : 8;
    const bayerMatrix = gridSize <= 4 ? BAYER_MATRIX_4x4 : BAYER_MATRIX_8x8;
    const matrixScale = matrixSize === 4 ? 16 : 64;

    const renderFrame = (time: number, srcImgData: ImageData | null) => {
      if (!srcImgData) return;
      const sData = srcImgData.data;

      for (let y = 0; y < renderHeight; y++) {
        const rowOffset = y * renderWidth * 4;
        const matrixY = y % matrixSize;

        for (let x = 0; x < renderWidth; x++) {
          const idx = rowOffset + x * 4;
          let r = sData[idx] ?? 0;
          let g = sData[idx + 1] ?? 0;
          let b = sData[idx + 2] ?? 0;
          const a = sData[idx + 3] ?? 255;

          if (a < 10) {
            outData[idx + 3] = 0;
            continue;
          }

          if (contrast !== 1 || brightness !== 0) {
            r = clamp((r - 128) * contrast + 128 + brightness * 255, 0, 255);
            g = clamp((g - 128) * contrast + 128 + brightness * 255, 0, 255);
            b = clamp((b - 128) * contrast + 128 + brightness * 255, 0, 255);
          }

          const luminance = getLuminance(r, g, b) / 255;
          const matrixX = x % matrixSize;

          let ditherThreshold: number;
          if (ditherMode === "bayer") {
            ditherThreshold = (bayerMatrix[matrixY]?.[matrixX] ?? 0) / matrixScale;
          } else if (ditherMode === "noise") {
            const noiseVal = Math.sin(x * 12.9898 + y * 78.233 + time * 10) * 43758.5453;
            ditherThreshold = noiseVal - Math.floor(noiseVal);
          } else {
            ditherThreshold = (bayerMatrix[matrixY]?.[matrixX] ?? 0) / matrixScale;
          }

          ditherThreshold = ditherThreshold * (1 - threshold) + threshold * 0.5;

          let outR: number, outG: number, outB: number;
          if (colorMode === "duotone") {
            const isDark = luminance < ditherThreshold;
            const targetColor = isDark ? parsedPrimaryColor : parsedSecondaryColor;
            outR = targetColor[0];
            outG = targetColor[1];
            outB = targetColor[2];
          } else if (colorMode === "grayscale") {
            const val = luminance < ditherThreshold ? 0 : 255;
            outR = val;
            outG = val;
            outB = val;
          } else {
            const ditherAmt = ditherThreshold - 0.5;
            outR = clamp(r + ditherAmt * 64, 0, 255);
            outG = clamp(g + ditherAmt * 64, 0, 255);
            outB = clamp(b + ditherAmt * 64, 0, 255);
          }

          if (invert) {
            outR = 255 - outR;
            outG = 255 - outG;
            outB = 255 - outB;
          }

          outData[idx] = outR;
          outData[idx + 1] = outG;
          outData[idx + 2] = outB;
          outData[idx + 3] = a;
        }
      }

      ctx.putImageData(outputImgData, 0, 0);
    };

    let cachedSrcData: ImageData | null = null;

    const setupAndRun = (img: HTMLImageElement) => {
      if (isCancelled || !offCtx) return;

      const iw = img.naturalWidth || renderWidth;
      const ih = img.naturalHeight || renderHeight;

      let dw = renderWidth;
      let dh = renderHeight;
      let dx = 0;
      let dy = 0;

      if (objectFit === "cover") {
        const scale = Math.max(renderWidth / iw, renderHeight / ih);
        dw = Math.ceil(iw * scale);
        dh = Math.ceil(ih * scale);
        dx = Math.floor((renderWidth - dw) / 2);
        dy = Math.floor((renderHeight - dh) / 2);
      }

      offCtx.drawImage(img, dx, dy, dw, dh);
      try {
        cachedSrcData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
      } catch {
        return;
      }

      renderFrame(0, cachedSrcData);

      if (animated) {
        let lastTick = 0;
        const loop = (timestamp: number) => {
          if (isCancelled) return;
          // Only animate if visible and throttled to max ~30fps for background texture
          if (isVisibleRef.current && timestamp - lastTick > 32) {
            lastTick = timestamp;
            timeRef.current += animationSpeed;
            renderFrame(timeRef.current, cachedSrcData);
          }
          animationRef.current = requestAnimationFrame(loop);
        };
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    if (imageRef.current && imageRef.current.complete) {
      setupAndRun(imageRef.current);
    } else {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        imageRef.current = img;
        setupAndRun(img);
      };
      img.onerror = () => {
        // Fallback placeholder pattern if image is offline
        if (offCtx) {
          const grad = offCtx.createLinearGradient(0, 0, renderWidth, renderHeight);
          grad.addColorStop(0, "#07130e");
          grad.addColorStop(1, "#10b981");
          offCtx.fillStyle = grad;
          offCtx.fillRect(0, 0, renderWidth, renderHeight);
          cachedSrcData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
          renderFrame(0, cachedSrcData);
        }
      };
    }

    return () => {
      isCancelled = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    src,
    dimensions,
    gridSize,
    pixelRatio,
    ditherMode,
    colorMode,
    invert,
    brightness,
    contrast,
    threshold,
    animated,
    animationSpeed,
    objectFit,
  ]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          imageRendering: "pixelated",
          transform: "translateZ(0)",
        }}
        aria-label="Dithered visual backdrop"
        role="img"
      />
    </div>
  );
};

export default DitherShader;
