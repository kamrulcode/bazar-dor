// app/[...not-found]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  notFound(); // This triggers Next.js to show the template above
}
