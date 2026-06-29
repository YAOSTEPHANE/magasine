export type ToastVariant = "success" | "error" | "info" | "warning" | "loading";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  createdAt: number;
}

export interface ToastOptions {
  id?: string;
  description?: string;
  duration?: number;
}

type ToastListener = (toasts: ToastItem[]) => void;

const MAX_TOASTS = 5;

const DEFAULT_DURATION: Record<ToastVariant, number> = {
  success: 4000,
  error: 5500,
  info: 4000,
  warning: 4500,
  loading: 0,
};

let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function genId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function emit() {
  const snapshot = [...toasts];
  listeners.forEach((listener) => listener(snapshot));
}

function clearTimer(id: string) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
}

export function subscribeToasts(listener: ToastListener) {
  listeners.add(listener);
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}

export function dismissToast(id: string) {
  clearTimer(id);
  const next = toasts.filter((item) => item.id !== id);
  if (next.length === toasts.length) return;
  toasts = next;
  emit();
}

function scheduleDismiss(id: string, duration: number) {
  clearTimer(id);
  if (duration <= 0) return;
  timers.set(
    id,
    setTimeout(() => dismissToast(id), duration)
  );
}

function pushToast(title: string, variant: ToastVariant, options?: ToastOptions) {
  const id = options?.id ?? genId();
  const duration = options?.duration ?? DEFAULT_DURATION[variant];

  clearTimer(id);

  const item: ToastItem = {
    id,
    title,
    description: options?.description,
    variant,
    duration,
    createdAt: Date.now(),
  };

  toasts = [...toasts.filter((t) => t.id !== id), item].slice(-MAX_TOASTS);
  emit();
  scheduleDismiss(id, duration);

  return id;
}

function show(variant: ToastVariant, title: string, options?: ToastOptions) {
  return pushToast(title, variant, options);
}

export const toast = {
  success: (title: string, options?: ToastOptions) => show("success", title, options),
  error: (title: string, options?: ToastOptions) => show("error", title, options),
  info: (title: string, options?: ToastOptions) => show("info", title, options),
  warning: (title: string, options?: ToastOptions) => show("warning", title, options),
  loading: (title: string, options?: ToastOptions) =>
    show("loading", title, { ...options, duration: options?.duration ?? 0 }),
  dismiss: dismissToast,
  promise: async <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((value: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    const id = toast.loading(messages.loading);
    try {
      const result = await promise;
      dismissToast(id);
      const successMessage =
        typeof messages.success === "function" ? messages.success(result) : messages.success;
      toast.success(successMessage);
      return result;
    } catch (error) {
      dismissToast(id);
      const errorMessage =
        typeof messages.error === "function" ? messages.error(error) : messages.error;
      toast.error(errorMessage);
      throw error;
    }
  },
};
