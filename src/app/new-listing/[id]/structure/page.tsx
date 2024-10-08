import { createCategoryPage } from "@/lib/actions";
import { SelectedCategory } from "@/components/NewListing/SelectedCategory";
import { NewListingBottomBar } from "@/components/NewListing/NewListingBottomBar";

export default function StrucutrePage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>


      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />
        <NewListingBottomBar />
      </form>
    </>
  );
}
