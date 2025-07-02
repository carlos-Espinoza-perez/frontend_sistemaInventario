import { useState, type ChangeEvent } from "react";
import { axiosPrivate } from "../../../services/AxiosInstance";
import { useNavigate } from "react-router-dom";
import type { IFormCreateNewWarehouses } from "../../../interface/WarehousesInterface";

const FormCreateNewWarehouses = () => { 
  const navigate = useNavigate();

  const requiredFields = ["name"];
  const [disabled, setDisabled] = useState(false);

  const [formValue, setFormValue] = useState<IFormCreateNewWarehouses>({
    name: "",
    location: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => { 
    setDisabled(true);

    // Revisar campos requeridos
    const missingFields = requiredFields.filter((field: string) => !formValue[field]);
    if (missingFields.length > 0) {
      alert("Completa todos los campos requeridos.");
      setDisabled(false);
      return;
    }

    axiosPrivate.post("/warehouses", formValue)
      .then(() => {
        navigate(-1);
        alert("Bodega creada con éxito");
      })
      .finally(() => {
        setDisabled(false);
      });
  };


  return (
    <main className="p-4 space-y-6">
      <div>
        <label
          className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-14 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"
          id="name"
          placeholder="Ingresar nombre"
          name="name"
          type="text"
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
          htmlFor="location"
        >
          Ubicación (Opcional)
        </label>
        <textarea
          className="form-textarea block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white min-h-32 placeholder:text-[var(--text-secondary)] p-4 text-base font-normal leading-normal resize-none"
          id="location"
          placeholder="Agregar cualquier ubicación o información relevante..."
          onChange={handleChange}
          name="location"
        ></textarea>
      </div>

      <button
        disabled={disabled}
        onClick={handleSubmit}
        className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-[var(--primary-color)] text-white text-base font-semibold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
        <span className="material-icons mr-2">save</span>
        Guardar bodega
      </button>
    </main>
  );
};

export default FormCreateNewWarehouses;