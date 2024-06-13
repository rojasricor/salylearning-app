import PageHeader from "@/app/learning/components/PageHeader";
import checkListImage from "@/assets/checklist.png";
import { obtenerLibrosPopulares } from "@/services/libros.service";
import type { Metadata } from "next";
import Image from "next/image";
import { MdSearch } from "react-icons/md";
import ButtonMoreInfoBook from "./components/ButtonMoreInfoBook";

export const metadata: Metadata = {
  title: "Libros Populares: Docentes | Saly Learning",
};

export default async function PopularBooksPage() {
  const librosPopulares = await obtenerLibrosPopulares();

  return (
    <>
      <PageHeader title="Libros populares" />

      <div className="container-fluid" style={{ margin: "40px 0" }}>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <Image
              src={checkListImage}
              alt="pdf"
              className="img-responsive center-box"
              width={110}
              height={110}
              quality={100}
              priority
            />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-8 text-justify lead">
            ¡Bienvenidos a nuestra encantadora sección de libros populares!
            Aquí, en el mágico rincón de la lectura, nos emociona compartir
            historias cautivadoras y aventuras inolvidables diseñadas
            especialmente para los pequeños exploradores de la imaginación.
            <br />
            Si deseas buscar un libro por nombre o título has click en el icono
            &nbsp;
            <MdSearch />
            &nbsp; que se encuentra en la barra superior
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ margin: "0 0 50px 0" }}>
        <h2 className="text-center" style={{ margin: "0 0 25px 0" }}>
          POPULARES
        </h2>
      </div>

      <div className="container-fluid" id="libros-container">
        {librosPopulares.map((libro: any, index: number) => (
          <div key={index} className="media media-hover" data-tiempo="semana">
            <div className="media-left media-middle">
              <Image
                className="media-object"
                src={libro.imagen_portada}
                alt={libro.nom_libro}
                width={60}
                height={60}
                quality={75}
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className="media-body">
              <h4 className="media-heading">{`"${libro.nom_libro}" de ${libro.autor}`}</h4>
              <div className="pull-left" style={{ fontWeight: "bold" }}>
                {libro.autor}
                <br />
                Publicación original: {new Date(libro.fecha_pub).getFullYear()}
              </div>
              <p className="text-center pull-right">
                <ButtonMoreInfoBook libro_descripcion={libro.descripcion} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
