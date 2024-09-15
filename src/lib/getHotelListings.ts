import hotelsJson from "../data/hotels.json";

export const getHotelsListings = async (category, per_page, page_no) => {
  await new Promise((res) => {
    setTimeout(res, 0);
  });

  let hotels = hotelsJson.filter((hotel) =>
    category === "all" ? hotel : hotel.category === category
  );

  const totalPage = Math.ceil(hotels.length / per_page);

  hotels = hotels.slice((page_no - 1) * per_page, page_no * per_page);
  return {
    hotels,
    totalPage,
  };
};
