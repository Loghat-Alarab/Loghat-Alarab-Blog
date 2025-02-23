import { Eye } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const ViewsLoader = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-8 h-6 rounded-md bg-secondary" />
      <Eye size={24} />
    </div>
  );
};

export default ViewsLoader;
