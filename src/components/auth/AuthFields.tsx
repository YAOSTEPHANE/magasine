"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  getPasswordStrength,
  PASSWORD_STRENGTH_LABEL,
  type PasswordStrength,
} from "@/components/auth/auth-shared";

interface AuthPasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  placeholder?: string;
  minLength?: number;
  showStrength?: boolean;
  hint?: string;
}

export function AuthPasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  placeholder = "Your password",
  minLength,
  showStrength = false,
  hint,
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const strength: PasswordStrength = showStrength ? getPasswordStrength(value) : "empty";

  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-label">
        {label}
      </label>
      <div className="auth-input-wrap">
        <input
          id={id}
          type={visible ? "text" : "password"}
          name={id}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          minLength={minLength}
          placeholder={placeholder}
          className="auth-input auth-input--password"
          aria-describedby={
            [hint ? `${id}-hint` : null, showStrength && value ? `${id}-strength` : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="w-4 h-4" aria-hidden /> : <Eye className="w-4 h-4" aria-hidden />}
        </button>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="auth-field-hint">
          {hint}
        </p>
      )}
      {showStrength && value && strength !== "empty" && (
        <div id={`${id}-strength`} className="auth-password-strength" aria-live="polite">
          <div className="auth-password-strength-bar" aria-hidden>
            <span className={`auth-password-strength-fill auth-password-strength-fill--${strength}`} />
          </div>
          <span className={`auth-password-strength-label auth-password-strength-label--${strength}`}>
            {PASSWORD_STRENGTH_LABEL[strength]}
          </span>
        </div>
      )}
    </div>
  );
}

interface AuthTextFieldProps {
  id: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  placeholder?: string;
  minLength?: number;
}

export function AuthTextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  minLength,
}: AuthTextFieldProps) {
  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        minLength={minLength}
        placeholder={placeholder}
        className="auth-input"
      />
    </div>
  );
}
