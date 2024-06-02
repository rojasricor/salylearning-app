import PageHeader from "@/app/learning/components/PageHeader";
import terminasteImage from "@/assets/Terminaste.png";
import type { Metadata } from "next";
import Image from "next/image";
import ActivitiesTabs from "../components/ActivitiesTabs";

export const metadata: Metadata = {
  title: "Hechas (Actividades): Estudiantes | Saly Learning",
};

export default function PendingActivitiesPage() {
  return (
    <>
      <PageHeader title="Actividades hechas" />

      <section className="container-fluid">
        <div
          className="container-flat-form text-center"
          style={{ backgroundColor: "#d4edda" }}
        >
          <ActivitiesTabs />

          <div className="tab-content">
            <Image
              src={terminasteImage}
              className="img-finish"
              style={{ margin: "2rem 0", borderRadius: "10px" }}
              alt="estas al dia"
              width={200}
              height={300}
              quality={100}
              placeholder="blur"
            />
            <div id="hecho">
              {/* Contenido de "Hecho" */}
              <h2>¡Actividades hechas!</h2>
              <p>¡Felicidades por completar estas actividades!</p>
              <div className="row">
                {/* Tarjetas de actividades hechas aquí */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
