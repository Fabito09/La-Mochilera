import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/account/register-form";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { accountLinks } from "@/content/navegacion";
import { registerPage } from "@/content/paginas/cuenta";

export const metadata: Metadata = {
  title: registerPage.title,
  description: registerPage.metaDescription,
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[accountLinks.account, accountLinks.register]}
        eyebrow={registerPage.eyebrow}
        title={registerPage.title}
        intro={registerPage.intro}
      />
      <Container className="pb-24 md:pb-32">
        <div className="max-w-xl">
          <RegisterForm />
          <p className="mt-8 text-sm">
            {registerPage.haveAccount}{" "}
            <Link href={accountLinks.account.href} className="font-medium underline underline-offset-4">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
