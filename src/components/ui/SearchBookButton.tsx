"use client";

import { plus_jakarta_sans } from "@/app/fonts";
import { obtenerLibrosPorNombre } from "@/services/libros.service";
import { MdCancel, MdCheckCircle, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ListLibrosFound from "./ListLibrosFound";

export default function SearchBookButton() {
  const showSearchBookSwal = async () => {
    const result = await withReactContent(Swal).fire({
      customClass: { container: plus_jakarta_sans.className },
      title: "¿Qué libro estás buscando?",
      text: "Por favor escribe el nombre del libro",
      input: "text",
      inputPlaceholder: "Escribe aquí el nombre de libro",
      inputValidator(nom_libro: string) {
        if (!nom_libro) {
          return "Debes escribir el nombre del libro";
        }
      },
      showCancelButton: true,
      cancelButtonColor: "#1e30f3",
      confirmButtonColor: "#e21e80",
      confirmButtonText: (
        <>
          <MdSearch style={{ position: "relative", top: 2 }} /> Buscar libro
        </>
      ),
      cancelButtonText: (
        <>
          <MdCancel style={{ position: "relative", top: 2 }} /> Cancelar
        </>
      ),
      showLoaderOnConfirm: true,
      preConfirm: async (nom_libro) => {
        try {
          return await obtenerLibrosPorNombre(nom_libro);
        } catch (error) {
          if (error instanceof Error) {
            Swal.showValidationMessage(error.message.replace(/,/g, ", "));
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      withReactContent(Swal).fire({
        customClass: { container: plus_jakarta_sans.className },
        title: "Hemos encontrado los siguientes libros",
        html: <ListLibrosFound libros={result.value} />,
        icon: result.value.length > 0 ? "success" : "error",
        confirmButtonColor: "#e21e80",
        confirmButtonText: (
          <>
            <MdCheckCircle style={{ position: "relative", top: 2 }} /> Aceptar
          </>
        ),
      });
    }
  };

  return (
    <li
      className="tooltips-general"
      data-tooltip-id="tooltip-navbar-actions"
      data-tooltip-content="Buscar libro"
      onClick={showSearchBookSwal}
    >
      <MdSearch style={{ position: "relative", top: 6, fontSize: 25 }} />
    </li>
  );
}
