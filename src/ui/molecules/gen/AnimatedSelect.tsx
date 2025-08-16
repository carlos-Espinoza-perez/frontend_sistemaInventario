import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { IAnimatedSelect } from "../../../interface/GenInterface";
import { Link } from "react-router-dom";

export default function AnimatedSelect(props: IAnimatedSelect) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { options } = props;

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelected(props.options.find(a => a.value == props.defaultOptionValue)?.value || "");
  }, [props.options, props.defaultOptionValue]);

  return (
    <div className="relative w-full">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <motion.div
        ref={containerRef}
        initial={{ top: 0, left: 0, position: "relative" }}
        animate={
          open
            ? {
              position: "fixed",
              top: "2rem",
              left: "50%",
              x: "-50%",
              width: "90%",
              zIndex: 50,
            }
            : {
              position: "relative",
              top: 0,
              left: 0,
              x: 0,
              width: "100%",
              zIndex: 1,
            }
        }
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-xl border ${(open ? "border-[var(--border-color)]" : (props.isCorrect == true ? "border-green-600" : props.isCorrect == false ? "border-red-600" : "border-[var(--border-color)]"))} text-[var(--text-primary)] text-sm`}
      >
        
        {
          !open && (
          <div
            className="h-12 px-4 flex items-center justify-between cursor-pointer text-[var(--text-primary)]"
            onClick={() => setOpen(true)}
          >
            {selected
              ? options.find((o) => o.value === selected)?.label
              : props.label}
          </div>
          )
        }

        {open && (
          <div className="p-2 rounded-lg bg-white">
            <input
              className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-12 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="max-h-60 overflow-auto">
              {filteredOptions.map((o) => (
                <li
                  key={o.value}
                  className="px-3 py-4 hover:bg-gray-100 cursor-pointer" 
                  style={{
                    fontSize: "18px"
                  }}
                  onClick={() => {
                    handleSelect(o.value);
                    props.change(o);
                  }}
                >
                  {o.label}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-gray-400">Sin resultados</li>
              )}
            </ul>
          </div>
        )}

        {
          open && 
          <Link to={"/Item/Create"}>
            <button className="flex items-center justify-center w-[90%] m-auto mb-2 rounded-lg h-10 px-4 border border-dashed border-[var(--primary-color)] text-[var(--primary-color)] text-sm font-medium leading-normal hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
              <span className="material-icons mr-1.5 text-lg">add_circle_outline</span>
              Agregar nuevo producto
            </button>
          </Link>
        }
      </motion.div>
    </div>
  );
}
