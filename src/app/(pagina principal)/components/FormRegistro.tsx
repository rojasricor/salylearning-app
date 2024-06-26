import { registrarse, registrarseInitState } from "@/services/auth.service";
import { obtenerGrados } from "@/services/grados.service";
import { THandleChange, THandleSubmit } from "@/types";
import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { toast } from "sonner";

interface IProps {
  setIsModalRegistroOpen: (value: boolean) => void;
  isModalRegistroOpen: boolean;
}

const objectiveInputsNumber = ["edad"];
const objectiveInputsString = [
  "p_nombre",
  "s_nombre",
  "p_apellido",
  "s_apellido",
];

export default function FormRegistro({
  isModalRegistroOpen,
  setIsModalRegistroOpen,
}: IProps) {
  const [grados, setGrados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(registrarseInitState);
  const inputFcs = useRef<HTMLInputElement>(null);

  const handleChange = (e: THandleChange) => {
    if (objectiveInputsString.includes(e.target.name)) {
      if (!/^[a-zA-Z]*$/.test(e.target.value)) {
        return;
      }
    }

    if (objectiveInputsNumber.includes(e.target.name)) {
      if (!/^[0-9]{0,2}$/.test(e.target.value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(registrarse(formData), {
      loading: "Registrando usuario...",
      success(data) {
        setFormData(registrarseInitState);
        setIsModalRegistroOpen(false);
        return data.message;
      },
      error(error) {
        if (error instanceof Error) {
          return error.message.replace(/,/g, ", ");
        }
      },
      finally() {
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!isModalRegistroOpen || grados.length > 0) return;
    inputFcs.current?.focus();

    toast.promise(obtenerGrados, {
      loading: "Cargando grados...",
      success(data) {
        setGrados(data);
        return "Listo";
      },
      error(error) {
        if (error instanceof Error) {
          return error.message.replace(/,/g, ", ");
        }
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalRegistroOpen]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-light text-center pt-3 pb-1">CREAR CUENTA</h1>
      {/* Primera Fila */}
      <div className="row">
        <div className="form-group col-md-6 py-3">
          <input
            ref={inputFcs}
            name="p_nombre"
            type="text"
            className="form-control text-capitalize"
            placeholder="Primer nombre *"
            required
            onChange={handleChange}
            value={formData.p_nombre}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-6 py-3">
          <input
            name="s_nombre"
            type="text"
            className="form-control text-capitalize"
            placeholder="Segundo nombre"
            onChange={handleChange}
            value={formData.s_nombre}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
      {/* Segunda Fila */}
      <div className="row">
        <div className="form-group col-md-6 py-3">
          <input
            name="p_apellido"
            type="text"
            className="form-control text-capitalize"
            placeholder="Primer apellido *"
            required
            onChange={handleChange}
            value={formData.p_apellido}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-6 py-3">
          <input
            name="s_apellido"
            type="text"
            className="form-control text-capitalize"
            placeholder="Segundo apellido"
            onChange={handleChange}
            value={formData.s_apellido}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
      {/* Tercera Fila */}
      <div className="row">
        <div className="form-group col-md-6 py-3">
          <input
            name="edad"
            type="number"
            className="form-control"
            placeholder="Edad *"
            required
            onChange={handleChange}
            value={formData.edad}
          />
        </div>
        <div className="form-group col-md-6 py-3">
          <select
            name="id_grado"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.id_grado}
          >
            <option value="">
              {(formData.rol as User["rol"]) === "ESTUDIANTE"
                ? "Seleccione su grado escolar"
                : "Seleccione el grado al que da clase"}{" "}
              *
            </option>
            {grados.map((grado: any) => (
              <option key={grado.id} value={grado.id}>
                {grado.nom_grado}
              </option>
            ))}
          </select>
        </div>

        {formData.rol === "DOCENTE" && (
          <div className="form-group col-md-6 py-3">
            <input
              name="cod_docente"
              type="text"
              className="form-control text-uppercase"
              placeholder="Código Docente *"
              required
              onChange={handleChange}
              value={formData.cod_docente}
              spellCheck={false}
              autoComplete="off"
              minLength={10}
              maxLength={10}
            />
          </div>
        )}
        <div className="form-group col-md-6 py-3">
          <select
            name="rol"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.rol}
          >
            <option value="">Seleccione su rol *</option>
            <option value={"DOCENTE"}>Docente</option>
            <option value={"ESTUDIANTE"}>Estudiante</option>
          </select>
        </div>
        <div className="form-group col-md-6 py-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Correo electrónico *"
            required
            autoComplete="off"
            onChange={handleChange}
            value={formData.email}
            spellCheck={false}
          />
        </div>
        <div className="form-group col-md-6 py-3">
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            className="form-control"
            placeholder="Contraseña *"
            required
            minLength={6}
            onChange={handleChange}
            value={formData.password}
          />
        </div>
      </div>
      {/* cuarta Fila */}
      <div className="row">
        <div className="form-group col-md-6 py-3">
          <input
            name="confirmar_password"
            type="password"
            autoComplete="new-password"
            className="form-control"
            placeholder="Confirmar contraseña *"
            required
            minLength={6}
            onChange={handleChange}
            value={formData.confirmar_password}
          />
        </div>
        <div className="form-group col-md-6 py-2 mb-4">
          <button
            type="submit"
            className="btn w-100 ingresar"
            disabled={isLoading}
          >
            <MdOutlineArrowCircleRight
              style={{ position: "relative", bottom: 2, fontSize: "24px" }}
            />{" "}
            {isLoading ? "REGISTRÁNDOME..." : "REGISTRARME"}
          </button>
        </div>
      </div>
    </form>
  );
}
