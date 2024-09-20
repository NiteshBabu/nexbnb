import prisma from "../../lib/db";
import { redirect } from "next/navigation";
import { NoItem } from "../../components/NoItem";
import { Card } from "../../components/HomeListing/HomeListingCard";
import { unstable_noStore as noStore } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

async function getData(userId: string) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    include: {
      Home: {
        select: {
          id: true,
          photos: true,
          name: true,
          title: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}

export default async function FavoriteRoute() {
  const user = await currentUser();
  if (!user) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you dont have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <Card
              pathName="/favorites"
              home={item.Home}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0].id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
