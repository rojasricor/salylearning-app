import preguntaImage from "@/assets/pregunta_niño.png";
import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function Card1() {
  return (
    <div className="card shadow border-0 rounded-4 mb-5">
      <div className="card-body p-5">
        <div className="row align-items-center gx-5">
          <div className="col text-center text-lg-start mb-4 mb-lg-0">
            <div className="bg-light p-4 rounded-4">
              <Image
                className="img-fluid rounded-3"
                placeholder="blur"
                quality={100}
                src={preguntaImage}
                width={preguntaImage.width}
                height={preguntaImage.height}
                alt="Pregunta"
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div>
              A partir de las primeras etapas en el ámbito educativo, el cual
              empieza generalmente desde los 6 a 7 años. A los niños se les
              prepara para aprender a leer y escribir, por medio de cuentos o
              libros infantiles.
              <br />A una corta un niño debe empezar a perfeccionar su capacidad
              de lectura e ir ganando destreza y rapidez en la adquisición de
              conceptos favorables para su vida, además de poder entender lo que
              ha leído y sacar sus propias conclusiones.
            </div>
            <Link
              className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder my-2"
              href="https://www.educo.org/blog/¿como-trabajar-la-comprension-lectora-en-ninos-y-n"
              target="_blank"
            >
              Más info.&nbsp;
              <MdOpenInNew style={{ position: "relative", bottom: 2 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
