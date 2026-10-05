import type { Metadata } from "next";
import { CustomerAccount } from "@/components/account/customer-account";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { accountLinks } from "@/content/navegacion";
import { accountPage } from "@/content/paginas/cuenta";

export const metadata: Metadata = {
  title: accountPage.title,
  description: accountPage.metaDescription,
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <main>
      <PageHeader breadcrumbs={[accountLinks.account]} eyebrow={accountPage.eyebrow} title={accountPage.title} />
      <Container className="pb-24 md:pb-32">
        <CustomerAccount />
      </Container>
    </main>
  );
}
