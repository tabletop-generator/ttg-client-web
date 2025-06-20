"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Toast = {
  id: number;
  targetId?: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
};

type ToastContextType = {
  showToast: (message: string, type?: Toast["type"], targetId?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type?: Toast["type"], targetId?: string) => {
      // If targetId exists and is already active, skip
      if (targetId && toasts.some((t) => t.targetId === targetId)) return;

      const id = toastId++;
      const toast: Toast = { id, targetId, message, type };
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [toasts],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast toast-center toast-top z-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`alert` + (toast.type ? ` alert-${toast.type}` : "")}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
