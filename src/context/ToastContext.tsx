"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, CircleX } from "lucide-react";

type ToastType = "success" | "error";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", duration = 3000) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const id = ++idRef.current;

      setToast({ id, message, type, duration });

      timerRef.current = setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
        timerRef.current = null;
      }, duration);
    },
    [],
  );

  const success = useCallback(
    (message: string, duration = 3000) =>
      showToast(message, "success", duration),
    [showToast],
  );

  const error = useCallback(
    (message: string, duration = 3000) => showToast(message, "error", duration),
    [showToast],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, success, error }}>
      {children}

      {toast && (
        <div className="toast toast-top toast-center z-9999">
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-[#343a35] shadow-lg"
          >
            {toast.type === "success" ? (
              <CheckCircle2
                size={20}
                strokeWidth={3}
                className="shrink-0 fill-[#5bd34a] text-white"
              />
            ) : (
              <CircleX
                size={20}
                strokeWidth={3}
                className="shrink-0 fill-red-500 text-white"
              />
            )}

            <span className="text-sm font-medium sm:text-base">
              {toast.message}
            </span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
