"use client";

import { plus_jakarta_sans } from "@/app/fonts";
import { crearLibro } from "@/services/libros.service";
import confetti from "canvas-confetti";
import { useRouter } from "next-nprogress-bar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MdCancel, MdCheckCircle, MdUpload } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormNewBook from "./FormNewBook";

const showSwalUploadBook = async (router: AppRouterInstance) => {
  const result = await withReactContent(Swal).fire({
    customClass: plus_jakarta_sans.className,
    title: "Subir nuevo libro",
    html: <FormNewBook />,
    showCancelButton: true,
    confirmButtonText: (
      <>
        <MdUpload /> Subir Libro
      </>
    ),
    cancelButtonText: (
      <>
        <MdCancel /> Cancelar
      </>
    ),
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      const formData = new FormData(
        Swal.getPopup()?.getElementsByTagName("form")[0]
      );

      const imagen_portada = formData.get("imagen_portada");
      const video_libro = formData.get("video_libro");

      try {
        if (imagen_portada instanceof File) {
          if (imagen_portada.size > 5000 * 1024) {
            throw new Error("La imagen de portada no debe superar los 5MB");
          }
          if (!/(jpe?g|png)$/i.test(imagen_portada.type)) {
            throw new Error("La imagen de portada debe ser de tipo jpeg o png");
          }
        }

        if (video_libro instanceof File) {
          if (video_libro.size > 50000 * 1024) {
            throw new Error("El video del libro no debe superar los 50MB");
          }
          if (!/(mp4)$/i.test(video_libro.type)) {
            throw new Error("El video del libro debe ser de tipo mp4");
          }
        }

        return await crearLibro(formData);
      } catch (error) {
        if (error instanceof Error) {
          Swal.showValidationMessage(error.message.replace(/,/g, ", "));
        }
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    router.refresh();

    withReactContent(Swal).fire({
      customClass: plus_jakarta_sans.className,
      title: "Libro subido a la plataforma SalyLearning exitosamente!",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/nyan-cat.gif")
        left bottom
        no-repeat
      `,
      confirmButtonText: (
        <>
          <MdCheckCircle /> Aceptar
        </>
      ),
    });

    confetti();
  }
};

export default function UploadBookButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => showSwalUploadBook(router)}
      className="btn btn-success"
    >
      <MdUpload /> Subir Libro
    </button>
  );
}
