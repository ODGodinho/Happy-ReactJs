import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/pages/OrphanagesMap.scss";
import mapMarketImg from "../images/map-marker.svg";

const mapIcon = Leaflet.icon({
    iconUrl: mapMarketImg,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [170, 2]
})

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarketImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :D</p>
                </header>

                <footer>
                    <strong>Minas Gerais</strong>
                    <span>Belo Horizonte</span>
                </footer>
            </aside>

            <Map
                center={[-19.9204438, -43.9499488]}
                zoom={15}
                style={{ width: "100%", height: "100%" }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                <Marker
                    icon={mapIcon}
                    position={[-19.9193575, -43.9617809]}
                >
                    <Popup
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                    >
                        Faculdade Promove
                        <Link to="">
                            <FiArrowRight size={32} color="#FFF" />
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size="32" color="#FFF"></FiPlus>
            </Link>

        </div>
    );
}

export default OrphanagesMap;