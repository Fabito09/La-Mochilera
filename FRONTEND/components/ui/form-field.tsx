import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlClassName =
  "mt-2 w-full rounded-md border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

// Etiqueta + control + ayuda opcional, con el mismo aspecto en todos los formularios.
function FieldShell({ id, label, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-ayuda`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; hint?: string };

export function TextField({ id, label, hint, className, ...inputProps }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint}>
      <input
        id={id}
        aria-describedby={hint ? `${id}-ayuda` : undefined}
        className={cn(controlClassName, "h-11", className)}
        {...inputProps}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: readonly string[];
  placeholder: string;
};

export function SelectField({ id, label, options, placeholder, className, ...selectProps }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <select id={id} className={cn(controlClassName, "h-11", className)} {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; label: string };

export function TextAreaField({ id, label, className, ...textareaProps }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <textarea id={id} className={cn(controlClassName, "py-3", className)} {...textareaProps} />
    </FieldShell>
  );
}

/** Mensaje de error o confirmación debajo de un formulario. */
export function FormMessage({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn("text-sm", tone === "error" ? "text-destructive" : "text-secondary")}
    >
      {children}
    </p>
  );
}
