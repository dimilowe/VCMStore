import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estimator for Car Repair – Free Auto Repair Cost Calculator",
  description: "Use our free estimator for car repair costs. Calculate brake, engine, transmission, and AC repair prices based on your car make, model, labor rates, and location.",
};

export default function EstimatorForCarRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
