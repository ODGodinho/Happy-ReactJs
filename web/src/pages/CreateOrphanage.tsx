import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from '../components/Sidebar';
import '../styles/pages/create-orphanage.scss';
import mapMarkerPoint from '../utils/mapMarkerPoint';
import api from "../Services/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

interface PositionMap {
  latitude: null | number;
  longitude: null | number;
}

export default function CreateOrphanage() {

  const history = useHistory();
  const [position, setPosition] = useState<PositionMap>({ latitude: null, longitude: null });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }
  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectImagesPreview = selectedImages.map((img) => {
      return URL.createObjectURL(img);
    });

    setImagesPreview(selectImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const itens = [
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      latitude,
      longitude
    ];
    for (let i = 0; i < itens.length; i++) {
      const el = itens[i];
      if (el === null || el === "") {
        swal("Observações", "Você deve preencher todos os campos, e selecionar um local no mapa!", "info");
        return false;
      }
    }

    const data = new FormData();

    data.append("name", String(name));
    data.append("about", String(about));
    data.append("instructions", String(instructions));
    data.append("opening_hours", String(opening_hours));
    data.append("open_on_weekends", String(+open_on_weekends));
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));

    images.forEach((img) => {
      data.append("images", img);
    });

    await api.post("orphanages", data).then(() => {
      swal("Tudo Certo!", "Seu cadastro foi realizado com sucesso.", "success");
      history.push("/app");
    }).catch(() => {
      swal("Ohh não..", "Tivemos algum erro ao concluir seu cadastro :(", "error");
    });



  }

  return (
    <div id="page-create-orphanage">

      <Sidebar></Sidebar>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-19.9204438, -43.9499488]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== null && position.longitude !== null && (
                <Marker
                  interactive={false}
                  icon={mapMarkerPoint}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <br />

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} onChange={e => setAbout(e.target.value)} value={about} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {imagesPreview.map((img, index) => {
                  return (
                    <img src={img} alt={name} key={index} />
                  )
                })}

                <label className="new-image" htmlFor="images">
                  <FiPlus size={24} color="#15b6d6" />
                </label>


              </div>
              <input
                multiple
                onChange={handleSelectImage}
                type="file"
                name="image[]"
                id="images"
                hidden
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                  className={open_on_weekends ? "active" : ""}>Sim</button>
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? "active" : ""}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
