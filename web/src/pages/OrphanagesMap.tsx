import React, { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

import "../styles/pages/orphanages-map.scss";
import mapMarketImg from "../images/map-marker.svg";
import mapMarkerPoint from '../utils/mapMarkerPoint';
import { OrphanageInterface } from '../Interfaces/OrphanageRequest';
import api from "../Services/api";
import { AxiosResponse } from "axios";

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([]);

    useEffect(() => {
        api.get('orphanages').then((response: AxiosResponse) => {
            setOrphanages(response.data);
        })
    }, []);

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

                {orphanages.map((orphanage) => {
                    return (
                        <Marker
                            icon={mapMarkerPoint}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}
                            <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={32} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#FFF"></FiPlus>
            </Link>

        </div>
    );
}

export default OrphanagesMap;