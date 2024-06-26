"use client";

import { plus_jakarta_sans } from "@/app/fonts";
import { signOut } from "next-auth/react";
import { MdCancel, MdLogout, MdOutlinePowerSettingsNew } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const showSignOutSwal = async () => {
  const result = await withReactContent(Swal).fire({
    customClass: { container: plus_jakarta_sans.className },
    title: "¿Estás seguro de que quieres salir?",
    showCancelButton: true,
    confirmButtonColor: "#e21e80",
    cancelButtonColor: "#1e30f3",
    confirmButtonText: (
      <>
        <MdLogout style={{ position: "relative", top: 2 }} /> Si, salir
      </>
    ),
    cancelButtonText: (
      <>
        <MdCancel style={{ position: "relative", top: 2 }} /> Cancelar
      </>
    ),
    icon: "question",
  });

  if (result.isConfirmed) {
    signOut();
  }
};

export default function PowerButton() {
  return (
    <li
      className="tooltips-general"
      data-tooltip-id="tooltip-navbar-actions"
      data-tooltip-content="Salir del sistema"
      onClick={showSignOutSwal}
    >
      <MdOutlinePowerSettingsNew
        style={{ position: "relative", top: 6, fontSize: 25 }}
      />
    </li>
  );
}
