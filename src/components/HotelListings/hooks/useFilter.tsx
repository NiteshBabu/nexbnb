import { useEffect, useMemo, useState } from "react";
import useHotels from "./useHotels";


export default function useFilter() {

    const { hotels, setHotels } = useHotels()
    const [category, setCategory] = useState(null)

    const filteredHotels = useMemo(() => {
        if (!category || category === "all") {
            return hotels
        }
        return hotels.filter(hotel => hotel.category === category)
    }, [category, hotels])


    return [filteredHotels, category, setCategory]
}