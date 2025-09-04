import { useState } from "react";
import { axiosPublic, setToken } from "../../../services/AxiosInstance";
import { useNavigate } from "react-router-dom";

const FormLogin = () => { 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Por favor, rellena todos los campos");
      return;
    }


    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axiosPublic.post("/auth/login", formData)
      .then((response) => {
        setToken(response.data.access_token);

        navigate("/")
      })
      .catch(() => {
      });
    
  };

  return (
    <form className="space-y-6" method="dialog">
      <div>
        <label
          className="block text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-1.5"
          htmlFor="username"
        >
          Nombre de Usuario
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="material-symbols-outlined material-icons-outlined text-[var(--md-sys-color-on-surface-variant)] text-xl">
              person
            </span>
          </div>
          <input
            className="form-input block w-full rounded-lg border-[var(--md-sys-color-outline)] border bg-white/[0.05] py-3.5 pl-12 pr-3 text-[var(--md-sys-color-on-surface)] placeholder:text-[var(--md-sys-color-on-surface-variant)]/70 focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/30 sm:text-sm transition-colors duration-300"
            id="username"
            name="username"
            placeholder="ej. juan.perez"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-1.5"
          htmlFor="password"
        >
          Contraseña
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="material-symbols-outlined material-icons-outlined text-[var(--md-sys-color-on-surface-variant)] text-xl">
              lock
            </span>
          </div>
          <input
            className="form-input block w-full rounded-lg border-[var(--md-sys-color-outline)] border bg-white/[0.05] py-3.5 pl-12 pr-3 text-[var(--md-sys-color-on-surface)] placeholder:text-[var(--md-sys-color-on-surface-variant)]/70 focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/30 sm:text-sm transition-colors duration-300"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            className="h-4 w-4 rounded border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-primary)] focus:ring-[var(--md-sys-color-primary)]"
            id="remember-me"
            name="remember-me"
            type="checkbox"
          />
          <label
            className="ml-2.5 block text-sm text-[var(--md-sys-color-on-surface-variant)]"
            htmlFor="remember-me"
          >
            Recuérdame
          </label>
        </div>
        <div className="text-sm">
          <a
            className="font-medium text-[var(--md-sys-color-primary)] hover:text-[var(--md-sys-color-secondary)] transition-colors duration-300"
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <div>
        <button
          className="flex w-full justify-center items-center rounded-full bg-[var(--md-sys-color-primary)] hover:bg-opacity-90 py-3.5 px-4 text-sm font-semibold text-[var(--md-sys-color-on-primary)] shadow-md hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-sys-color-primary)] transition-all duration-300 transform hover:scale-[1.02]"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          <span className="material-symbols-outlined material-icons-outlined mr-2 text-base">
            login
          </span>
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default FormLogin;