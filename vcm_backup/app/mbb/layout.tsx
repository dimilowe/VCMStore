import MonetizationBar from "@/components/MonetizationBar";
import CreatorStack from "@/components/CreatorStack";
import ExploreMoreTools from "@/components/ExploreMoreTools";

export default function MBBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pb-14">
        {children}
        <div className="max-w-4xl mx-auto px-4">
          <ExploreMoreTools />
          <CreatorStack />
        </div>
      </div>
      <MonetizationBar />
    </>
  );
}
