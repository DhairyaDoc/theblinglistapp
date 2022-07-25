import L from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-search'
import 'leaflet-search/dist/leaflet-search.min.css'

const createLeafletSearch = ({ searchLayer }) => {
  const instance = new L.Control.Search({
    position: 'topright',
    layer: searchLayer,
    zoom: 20,
  })

  return instance
}

const LeafletSearch = createControlComponent(createLeafletSearch)

export default LeafletSearch