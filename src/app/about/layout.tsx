import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — ColdPing",
  description: "Learn about ColdPing, the team behind it, and our mission to make every cold email feel personal.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
