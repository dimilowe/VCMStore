import MonetizationBar from "@/components/MonetizationBar";

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pb-14">
        {children}
      </div>
      <MonetizationBar />
    </>
  );
}
