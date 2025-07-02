import { useEffect, useState, type ChangeEvent } from "react";
import type { IOption } from "../../../interface/GenInterface";
import ListOptionsToArray from "../../molecules/gen/ListOptionsToArray";
import { axiosPrivate } from "../../../services/AxiosInstance";
import type { ICategory } from "../../../interface/CategoryInterface";
import type { IFormCreateNewItem } from "../../../interface/ItemInterface";
import { useNavigate } from "react-router-dom";

const FormCreateNewItem = () => { 
  const navigate = useNavigate();
  const [listCategories, setListCategories] = useState<IOption[]>([]);

  const requiredFields = ["name", "category_id"];
  const [disabled, setDisabled] = useState(false);

  const [formValue, setFormValue] = useState<IFormCreateNewItem>({
    name: "",
    code: "",
    description: "",
    category_id: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {

    console.log(e.target.name, e.target.value);
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const getListCategories = async () => {
    const response = await axiosPrivate.get("/categories");
    const listCategories = response.data.map((category: ICategory) => ({
      value: category.id,
      label: category.name,
    }));

    setListCategories(listCategories);
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

    axiosPrivate.post("/items", formValue)
      .then(() => {
        navigate(-1);
        alert("Producto creado con éxito");
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  useEffect(() => {
    getListCategories();
  }, []);


  return (
    <main className="p-4 space-y-6">
      <div>
        <label
          className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
          htmlFor="category_id"
        >
          Categoría
        </label>
        <div className="relative">
          <select
            className="form-select appearance-none block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-14 px-4 text-base font-normal leading-normal bg-[image:--select-button-svg] bg-no-repeat bg-right_1rem_center"
            id="category_id"
            onChange={handleChange}
            name="category_id"
          >
            <option className="text-[var(--text-secondary)]">
              Selecciona una categoría
            </option>

            <ListOptionsToArray options={listCategories} />
          </select>
        </div>
      </div>

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
          htmlFor="code"
        >
          Código (Opcional)
        </label>
        <input
          className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-14 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"
          id="code"
          placeholder="Ingresar código (opcional)"
          type="text"
          onChange={handleChange}
          name="code"
        />
      </div>

      <div>
        <label
          className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
          htmlFor="description"
        >
          Observación (Opcional)
        </label>
        <textarea
          className="form-textarea block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white min-h-32 placeholder:text-[var(--text-secondary)] p-4 text-base font-normal leading-normal resize-none"
          id="description"
          placeholder="Agregar cualquier observación relevante..."
          onChange={handleChange}
          name="description"
        ></textarea>
      </div>

      <button
        disabled={disabled}
        onClick={handleSubmit}
        className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-[var(--primary-color)] text-white text-base font-semibold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
        <span className="material-icons mr-2">save</span>
        Guardar producto
      </button>
    </main>
  );
};

export default FormCreateNewItem;