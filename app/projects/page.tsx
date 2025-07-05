// Before :: /projects/page.tsx
// Now :: /projects/ProjectsPage.tsx

import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ProjectsClient />
    </Suspense>
  );
}
