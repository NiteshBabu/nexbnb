import SignupForm from "@/components/Forms/SignupForm";
import FilterList from "@/components/HotelListings/FilterList";
import HotelListings from "@/components/HotelListings/HotelListings";

type Props = {
  searchParams: Record<string, string>;
};

export default function Home(props: Props) {
  return (
    <main className="" suppressHydrationWarning>
      <FilterList />
    </main>
  );
}
