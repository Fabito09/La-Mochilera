import { cn } from "@/lib/utils";

interface OptionPickerProps {
  /** Nombre del grupo para lectores de pantalla, p. ej. "Talla (EU)". */
  legend: string;
  /** Prefijo único para los ids y el name de los botones. */
  name: string;
  options: string[];
  /** Opciones agotadas: se muestran tachadas y no se pueden elegir. */
  unavailableOptions?: string[];
  selected: string | null;
  onSelect: (option: string) => void;
  /** Contenido a la derecha del título, p. ej. el enlace a la guía de tallas. */
  aside?: React.ReactNode;
  /** Clases de la grilla: las tallas son cortas, los colores necesitan más ancho. */
  gridClassName?: string;
}

// Botones de opción (talla, color) con aspecto de fichas seleccionables.
export function OptionPicker({
  legend,
  name,
  options,
  unavailableOptions = [],
  selected,
  onSelect,
  aside,
  gridClassName = "grid-cols-5 sm:grid-cols-7",
}: OptionPickerProps) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="flex items-center justify-between">
        <p aria-hidden="true" className="text-sm font-medium">
          {legend}
          {selected && <span className="text-muted-foreground">: {selected}</span>}
        </p>
        {aside}
      </div>
      <div className={cn("mt-3 grid gap-2", gridClassName)}>
        {options.map((option, index) => {
          const inputId = `${name}-${index}`;
          const isSelected = selected === option;
          const isUnavailable = unavailableOptions.includes(option);
          return (
            <div key={option}>
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option}
                checked={isSelected}
                disabled={isUnavailable}
                onChange={() => onSelect(option)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className={cn(
                  "flex h-11 cursor-pointer items-center justify-center rounded-sm border px-2 text-center text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : isUnavailable
                      ? "cursor-not-allowed border-dashed border-input text-muted-foreground line-through"
                      : "border-input hover:bg-accent",
                )}
              >
                {option}
                {isUnavailable && <span className="sr-only"> (agotada)</span>}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
