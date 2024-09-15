import { useEffect, useState } from "react"
import hotelsJson from "@/data/hotels.json";
import { IHotel } from "@/types";


const useHotels = () => {
    const [hotels, setHotels] = useState<IHotel[] | []>([])

    useEffect(() => {
        const hotelsPromise = new Promise((res, rej) => {
            setTimeout(() => res(hotelsJson), 2000)
        })
        hotelsPromise.then(hotels => {
            setHotels(hotels as IHotel[])
        })
    }, [])

    return { hotels, setHotels }
}

export default useHotels;