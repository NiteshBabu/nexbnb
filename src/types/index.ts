export interface IHotel {
    id: string;
    name: string;
    title: string;
    category: string;
    locale: string;
    tier_id: number;
    room_type: string;
    location: {
        lat: number;
        lng: number;
        city: string;
        state: string;
        country: string;
        address: string;
        code: string;
    };
    pictures: {
        contextual: {
            id: string;
            url: string;
            messages?: string[];
        }[];
    };
    pricing_quote: {
        primary: {
            price: string;
            qualifier: string;
        };
        details: {
            title: string;
            price: string;
            type?: string;
        }[];
    };
    context: {
        checkin: string;
        checkout: string;
        adults: number;
        children: number;
        infants: number;
        pets: number;
    };
    url: string;
    property_type: {
        name: string;
    };
    capacity: {
        person: number;
        bathrooms: number;
        bedrooms: number;
        beds: number;
    };
    picture: {
        url: string;
    };
    hosts: {
        id: number;
        first_name: string;
        picture: string;
    }[];
    pricing_info: {
        price: number;
        currency: string;
        currency_native: string;
        min_nights: number;
        max_nights: number;
        cancel_policy: {
            name: string;
        };
        checkout_time: number;
        checkin_time_start: number;
        checkin_time_end: number;
    };
    reviews: {
        count: number;
    };
}


// import { IHotel } from "@/types";

// export const hotels: IHotel[] = [];
// for (let i = 0; i < 20; i++) {
//     hotels.push({ id: 2, name: "Nitesh", location: 'Bangalore', distance: (Math.random() * 5).toFixed(), images: [], description: 'This is a test hotel', price: (i + 1) * 30 })
// }

