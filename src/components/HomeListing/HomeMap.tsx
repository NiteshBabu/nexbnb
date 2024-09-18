import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export function HomeMap({ locationValue, latLang }: { locationValue: string, latLang? : [number, number] }) {
  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap locationValue={locationValue} latLang={latLang} />;
}
