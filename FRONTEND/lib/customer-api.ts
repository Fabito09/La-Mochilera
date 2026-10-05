// Cuentas de cliente desde el navegador. Habla con la API del panel
// (/api/customers y /api/orders); la sesión viaja en una cookie segura que el
// navegador manda solo, así que la página nunca guarda la contraseña.

import { accountErrors } from "@/content/paginas/cuenta";

export interface ShippingAddress {
  province?: string | null;
  canton?: string | null;
  district?: string | null;
  address?: string | null;
}

export interface CustomerProfile extends ShippingAddress {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
}

export interface CustomerOrder {
  id: number;
  createdAt: string;
  status: string;
  total?: number | null;
  items: {
    id?: string | null;
    product: number | { name: string };
    size?: number | null;
    color?: string | null;
    quantity: number;
  }[];
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class AccountError extends Error {}

interface PayloadErrorBody {
  errors?: { message?: string; data?: { errors?: { path?: string }[] } }[];
}

/** Traduce la respuesta de error de la API a un mensaje en "usted". */
async function accountErrorFrom(response: Response): Promise<AccountError> {
  if (response.status === 401 || response.status === 403) {
    return new AccountError(accountErrors.wrongCredentials);
  }
  const body = (await response.json().catch(() => ({}))) as PayloadErrorBody;
  const invalidPaths = body.errors?.flatMap((error) => error.data?.errors ?? []).map((error) => error.path);
  if (invalidPaths?.includes("email")) return new AccountError(accountErrors.emailTaken);
  return new AccountError(accountErrors.generic);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new AccountError(accountErrors.generic);
  }
  if (!response.ok) throw await accountErrorFrom(response);
  return response.json() as Promise<T>;
}

/** El cliente con sesión iniciada, o null si no hay sesión. */
export async function fetchCurrentCustomer(): Promise<CustomerProfile | null> {
  const { user } = await request<{ user: CustomerProfile | null }>("/api/customers/me");
  return user;
}

export async function loginCustomer(email: string, password: string): Promise<CustomerProfile> {
  const { user } = await request<{ user: CustomerProfile }>("/api/customers/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return user;
}

export async function logoutCustomer(): Promise<void> {
  await request("/api/customers/logout", { method: "POST" });
}

/** Crea la cuenta y deja la sesión iniciada. */
export async function registerCustomer(data: RegistrationData): Promise<CustomerProfile> {
  await request("/api/customers", { method: "POST", body: JSON.stringify(data) });
  return loginCustomer(data.email, data.password);
}

export async function updateCustomer(
  id: number,
  data: Partial<Omit<CustomerProfile, "id" | "email">>,
): Promise<CustomerProfile> {
  const { doc } = await request<{ doc: CustomerProfile }>(`/api/customers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return doc;
}

/** Pedidos del cliente con sesión (la API solo devuelve los suyos). */
export async function fetchCustomerOrders(): Promise<CustomerOrder[]> {
  const { docs } = await request<{ docs: CustomerOrder[] }>(
    "/api/orders?sort=-createdAt&depth=1&limit=50",
  );
  return docs;
}
