"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormMessage, SelectField, TextAreaField, TextField } from "@/components/ui/form-field";
import { COSTA_RICA_PROVINCES } from "@/lib/costa-rica";
import { updateCustomer, type CustomerProfile } from "@/lib/customer-api";

interface ProfileFormProps {
  customer: CustomerProfile;
  onSaved: (customer: CustomerProfile) => void;
}

type ProfileFields = "name" | "phone" | "province" | "canton" | "district" | "address";

// Datos del cliente y su dirección de envío, para no escribirla en cada compra.
export function ProfileForm({ customer, onSaved }: ProfileFormProps) {
  const [form, setForm] = useState<Record<ProfileFields, string>>({
    name: customer.name,
    phone: customer.phone ?? "",
    province: customer.province ?? "",
    canton: customer.canton ?? "",
    district: customer.district ?? "",
    address: customer.address ?? "",
  });
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateField =
    (field: ProfileFields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setIsSaving(true);
    try {
      const saved = await updateCustomer(customer.id, {
        ...form,
        name: form.name.trim(),
        // Vacío se guarda como "sin dato" para que la provincia no quede inválida.
        province: form.province || null,
      });
      onSaved(saved);
      setMessage({ tone: "success", text: "Sus datos se guardaron." });
    } catch (saveError) {
      setMessage({ tone: "error", text: (saveError as Error).message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="perfil-nombre" label="Nombre completo" required autoComplete="name" value={form.name} onChange={updateField("name")} />
        <TextField id="perfil-telefono" label="Teléfono" type="tel" autoComplete="tel" value={form.phone} onChange={updateField("phone")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <SelectField
          id="perfil-provincia"
          label="Provincia"
          options={COSTA_RICA_PROVINCES}
          placeholder="Elija una"
          value={form.province}
          onChange={updateField("province")}
        />
        <TextField id="perfil-canton" label="Cantón" value={form.canton} onChange={updateField("canton")} />
        <TextField id="perfil-distrito" label="Distrito" value={form.district} onChange={updateField("district")} />
      </div>
      <TextAreaField
        id="perfil-direccion"
        label="Dirección exacta (otras señas)"
        rows={3}
        autoComplete="street-address"
        value={form.address}
        onChange={updateField("address")}
      />
      {message && <FormMessage tone={message.tone}>{message.text}</FormMessage>}
      <Button type="submit" size="lg" disabled={isSaving}>
        {isSaving ? "Guardando…" : "Guardar datos"}
      </Button>
    </form>
  );
}
