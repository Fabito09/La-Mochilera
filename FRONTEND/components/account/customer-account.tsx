"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { LoginForm } from "@/components/account/login-form";
import { OrderHistory } from "@/components/account/order-history";
import { ProfileForm } from "@/components/account/profile-form";
import { Button } from "@/components/ui/button";
import { whatsappUrlWithMessage } from "@/content/marca";
import { accountLinks } from "@/content/navegacion";
import { accountPage } from "@/content/paginas/cuenta";
import { fetchCurrentCustomer, logoutCustomer, type CustomerProfile } from "@/lib/customer-api";

type AccountState = { status: "loading" } | { status: "guest" } | { status: "signed-in"; customer: CustomerProfile };

// "Mi cuenta": sin sesión muestra el inicio de sesión y el registro; con
// sesión, los datos de envío y los pedidos del cliente.
export function CustomerAccount() {
  const [state, setState] = useState<AccountState>({ status: "loading" });

  useEffect(() => {
    fetchCurrentCustomer().then(
      (customer) => setState(customer ? { status: "signed-in", customer } : { status: "guest" }),
      () => setState({ status: "guest" }),
    );
  }, []);

  const showCustomer = (customer: CustomerProfile) => setState({ status: "signed-in", customer });

  if (state.status === "loading") {
    return <p className="text-sm text-muted-foreground">Cargando su cuenta…</p>;
  }

  if (state.status === "guest") {
    return (
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="ingresar-titulo">
          <h2 id="ingresar-titulo" className="font-display text-3xl">{accountPage.loginTitle}</h2>
          <p className="mt-2 text-muted-foreground">{accountPage.loginIntro}</p>
          <div className="mt-6">
            <LoginForm onLoggedIn={showCustomer} />
          </div>
          <a
            href={whatsappUrlWithMessage("Hola, olvidé la contraseña de mi cuenta en el sitio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-start gap-2 py-1 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {accountPage.forgotPassword}
          </a>
        </section>
        <section aria-labelledby="registro-titulo" className="self-start rounded-sm bg-muted p-8">
          <h2 id="registro-titulo" className="font-display text-3xl">{accountPage.newCustomerTitle}</h2>
          <p className="mt-2 text-muted-foreground">{accountPage.newCustomerIntro}</p>
          <Button asChild size="lg" variant="outline" className="mt-6 border-foreground bg-transparent">
            <Link href={accountLinks.register.href}>{accountLinks.register.label}</Link>
          </Button>
        </section>
      </div>
    );
  }

  const { customer } = state;
  const handleLogout = async () => {
    await logoutCustomer().catch(() => undefined);
    setState({ status: "guest" });
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl">{accountPage.welcome(customer.name.split(" ")[0])}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{customer.email}</p>
        </div>
        <Button variant="outline" className="border-foreground bg-transparent" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <section aria-labelledby="perfil-titulo">
        <h2 id="perfil-titulo" className="font-display text-3xl">{accountPage.profileTitle}</h2>
        <p className="mt-2 text-muted-foreground">{accountPage.profileIntro}</p>
        <div className="mt-6 max-w-3xl">
          <ProfileForm customer={customer} onSaved={showCustomer} />
        </div>
      </section>

      <section aria-labelledby="pedidos-titulo">
        <h2 id="pedidos-titulo" className="font-display text-3xl">{accountPage.ordersTitle}</h2>
        <div className="mt-6">
          <OrderHistory />
        </div>
      </section>
    </div>
  );
}
