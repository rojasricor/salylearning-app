"use client";

import { plus_jakarta_sans } from "@/app/fonts";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SearchBookButton() {
  const [inputValue, setInputValue] = useState("");

  const showSearchBookSwal = () => {
    withReactContent(Swal).fire({
      customClass: plus_jakarta_sans.className,
      title: "¿Qué libro estás buscando?",
      text: "Por favor escribe el nombre del libro",
      input: "text",
      inputValue,
      showCancelButton: true,
      confirmButtonText: "Buscar",
      cancelButtonText: "Cancelar",
      inputPlaceholder: "Escribe aquí el nombre de libro",
      preConfirm: (inputValue) => {
        if (!inputValue) {
          Swal.showValidationMessage("Debes escribir el nombre del libro");
        }

        setInputValue(inputValue);
      },
    });
  };

  return (
    <li
      className="tooltips-general"
      title="Buscar libro"
      onClick={showSearchBookSwal}
    >
      <MdSearch style={{ fontSize: 25, marginTop: 15 }} />
    </li>
  );
}
