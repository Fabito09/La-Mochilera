"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Falta definir el servicio de newsletter (Klaviyo, Mailchimp u otro).
// Hasta conectarlo, el formulario avisa que el registro aún no está activo
// en lugar de simular una suscripción exitosa.
export function NewsletterSignup() {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(
      "El registro todavía no está activo: se habilita al conectar el servicio de newsletter.",
    );
  };

  return (
    <section aria-labelledby="newsletter-titulo" className="bg-forest py-24 text-forest-foreground">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-forest-foreground/75">
            Newsletter
          </p>
          <h2 id="newsletter-titulo" className="mt-3 font-display text-4xl md:text-5xl">
            Historias del camino
          </h2>
          <p className="mt-4 max-w-md leading-7 text-forest-foreground/85">
            Nuevos modelos, guías de cuidado y lanzamientos antes que nadie. Un correo al mes,
            sin relleno.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="newsletter-email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="nombre@correo.com"
              className="h-11 flex-1 rounded-md border border-forest-foreground/40 bg-transparent px-4 text-forest-foreground placeholder:text-forest-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-foreground"
            />
            <Button type="submit" size="lg" variant="secondary">
              Suscribirme
            </Button>
          </div>
          <p role="status" className="mt-3 min-h-6 text-sm text-forest-foreground/85">
            {statusMessage}
          </p>
        </form>
      </Container>
    </section>
  );
}
