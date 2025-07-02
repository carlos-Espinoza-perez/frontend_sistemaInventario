import FormLogin from "../../organisms/home/FormLogin";

const LoginTemplate = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between group/design-root overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[var(--md-sys-color-surface)] rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-[var(--md-sys-color-primary-container)] p-4 rounded-full mb-6 shadow-sm">
              <span className="material-symbols-outlined material-icons-outlined text-[var(--md-sys-color-primary)] text-5xl">
                inventory_2
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]">
              ¡Bienvenido de Nuevo!
            </h1>
            <p className="mt-2 text-base text-[var(--md-sys-color-on-surface-variant)]">
              Inicia sesión para gestionar tu inventario.
            </p>
          </div>

          <FormLogin />

          <p className="mt-10 text-center text-sm text-[var(--md-sys-color-on-surface-variant)]">
            ¿No tienes una cuenta?
            <a
              className="font-medium text-[var(--md-sys-color-tertiary)] hover:text-opacity-80 transition-colors duration-300"
              href="#"
            >
              Regístrate
            </a>
          </p>
        </div>
      </main>
      <footer className="py-6">
        <p className="text-center text-xs text-[var(--md-sys-color-on-background)]/70">
          © {new Date().getFullYear()} App de Inventario. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LoginTemplate;