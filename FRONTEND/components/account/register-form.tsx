"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormMessage, TextField } from "@/components/ui/form-field";
import { MIN_PASSWORD_LENGTH, accountErrors, registerPage } from "@/content/paginas/cuenta";
import { accountLinks } from "@/content/navegacion";
import { registerCustomer } from "@/lib/customer-api";

const emptyForm = { name: "", email: "", phone: "", password: "", passwordConfirmation: "" };

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof emptyForm) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (form.password !== form.passwordConfirmation) {
      setError(accountErrors.passwordsDontMatch);
      return;
    }
    setIsSubmitting(true);
    try {
      await registerCustomer({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      router.push(accountLinks.account.href);
      router.refresh();
    } catch (registerError) {
      setError((registerError as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField id="registro-nombre" label="Nombre completo" required autoComplete="name" value={form.name} onChange={updateField("name")} />
      <TextField
        id="registro-correo"
        label="Correo electrónico"
        type="email"
        required
        autoComplete="email"
        value={form.email}
        onChange={updateField("email")}
      />
      <TextField
        id="registro-telefono"
        label="Teléfono (opcional)"
        type="tel"
        autoComplete="tel"
        hint="Para coordinar la entrega de sus pedidos."
        value={form.phone}
        onChange={updateField("phone")}
      />
      <TextField
        id="registro-contrasena"
        label="Contraseña"
        type="password"
        required
        minLength={MIN_PASSWORD_LENGTH}
        autoComplete="new-password"
        hint={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres.`}
        value={form.password}
        onChange={updateField("password")}
      />
      <TextField
        id="registro-confirmacion"
        label="Repita la contraseña"
        type="password"
        required
        minLength={MIN_PASSWORD_LENGTH}
        autoComplete="new-password"
        value={form.passwordConfirmation}
        onChange={updateField("passwordConfirmation")}
      />
      {error && <FormMessage tone="error">{error}</FormMessage>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creando su cuenta…" : "Crear cuenta"}
      </Button>
      <p className="text-xs text-muted-foreground">
        {registerPage.privacyNotice}{" "}
        <Link href="/legal/privacidad" className="underline underline-offset-4 hover:text-foreground">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
