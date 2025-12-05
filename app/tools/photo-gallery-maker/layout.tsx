import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery Maker – Create a Gallery of Photos Online Free",
  description: "Create a beautiful gallery of photos online for free. Upload images, choose layouts (grid, masonry, horizontal), customize spacing and corners, then download as PNG or copy HTML/CSS code.",
};

export default function PhotoGalleryMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
