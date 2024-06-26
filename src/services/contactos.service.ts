import { fetchClient } from "./api.service";

export const contactoInitState = {
  nombre_completo: "",
  email: "",
  telefono: "",
  mensaje: "",
};

export const contactoYSoporteInitState = {
  nombre_completo: "",
  email: "",
  asunto: "",
  mensaje: "",
};

export async function crearContacto(formData: typeof contactoInitState) {
  const res = await fetchClient("/contactos", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function crearContactoYSoporte(
  formData: typeof contactoYSoporteInitState
) {
  const res = await fetchClient("/soporte", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
