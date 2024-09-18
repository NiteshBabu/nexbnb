'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/hooks/useCountries'
import { icon } from 'leaflet'

const ICON = icon({
  iconUrl:
    'https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png',
  iconSize: [50, 50],
})

export default function Map({
  locationValue,
  latLang,
}: {
  locationValue: string
  latLang?: [number, number]
}) {
  const { getCountryByCountryCode, getCountryByCountryName } = useCountries()
  if (!latLang) {
    latLang = getCountryByCountryCode(locationValue)?.latLang || getCountryByCountryName(locationValue)?.latLang
  }

  return (
    <MapContainer
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [20, 77]}
      zoom={4}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
    </MapContainer>
  )
}
