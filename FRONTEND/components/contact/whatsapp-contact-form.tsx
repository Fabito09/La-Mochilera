"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrlWithMessage } from "@/content/marca";

const contactReasons = [
  "Quiero comprar",
  "Consulta de tallas",
  "Cambios o garantía",
  "Visitar el showroom",
  "Otra consulta",
];

const fieldClassName =
  "mt-2 w-full rounded-md border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// Sin servidor: el formulario arma el mensaje y lo abre en WhatsApp, que es
// el canal de atención de la marca.
export function WhatsAppContactForm() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState(contactReasons[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Hola, soy ${name.trim()}. Motivo: ${reason}.\n\n${message.trim()}`;
    window.open(whatsappUrlWithMessage(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contacto-nombre" className="text-sm font-medium">
          Nombre
        </label>
        <input
          id="contacto-nombre"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`${fieldClassName} h-11`}
        />
      </div>
      <div>
        <label htmlFor="contacto-motivo" className="text-sm font-medium">
          Motivo
        </label>
        <select
          id="contacto-motivo"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className={`${fieldClassName} h-11`}
        >
          {contactReasons.map((contactReason) => (
            <option key={contactReason}>{contactReason}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contacto-mensaje" className="text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="contacto-mensaje"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClassName} py-3`}
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
        Enviar por WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">
        Se abrirá WhatsApp con su mensaje listo para enviar.
      </p>
    </form>
  );
}
