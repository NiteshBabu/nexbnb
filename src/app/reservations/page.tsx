import { Card } from "../../components/HomeListing/HomeListingCard";
import { NoItem } from "../../components/NoItem";
import prisma from "../../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import {currentUser} from "@clerk/nextjs/server"

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      Home: {
        select: {
          id: true,
          name: true,
          title: true,
          country: true,
          photos: true,
          description: true,
          price: true,
          // Favorite: {
          //   where: {
          //     userId: userId,
          //   },
          // },
        },
      },
    },
  });

  return data;
}

export default async function ReservationsRoute() {
  const user = await currentUser();
  
  if (!user?.id) return redirect("/");

  const data = await getData(user.id);
  console.log(data);
  
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItem
          title="Hey you dont have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <Card
              key={item.Home?.id}
              pathName="/favorites"
              userId={user.id}
              home={item.Home}
              booking={{startDate : item.startDate, endDate : item.endDate}}
              // favoriteId={item.Home?.Favorite[0]?.id as string}
              // isInFavoriteList={
              //   (item.Home?.Favorite.length as number) > 0 ? true : false
              // }
            />
          ))}
        </div>
      )}
    </section>
  );
}
