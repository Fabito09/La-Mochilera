import { shaftHeightLabels } from "@/lib/catalog";
import {
  countActiveFilters,
  priceRanges,
  type CatalogFilters,
  type FilterGroup,
  type FilterOptions,
} from "@/lib/catalog-filters";
import { cn } from "@/lib/utils";

export type ToggleFilter = <Group extends FilterGroup>(
  group: Group,
  value: CatalogFilters[Group][number],
) => void;

interface FilterPanelProps {
  options: FilterOptions;
  filters: CatalogFilters;
  onToggle: ToggleFilter;
  onClear: () => void;
  /** El panel se muestra dos veces (escritorio y móvil): evita ids repetidos. */
  idPrefix: string;
}

interface CheckboxOption {
  value: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

function FilterFieldset({
  legend,
  groupId,
  idPrefix,
  options,
}: {
  legend: string;
  groupId: FilterGroup;
  idPrefix: string;
  options: CheckboxOption[];
}) {
  if (options.length === 0) return null;

  return (
    <fieldset className="border-t py-5">
      <legend className="float-left mb-3 w-full font-display text-xl">{legend}</legend>
      <ul className="clear-both space-y-2.5">
        {options.map((option, index) => {
          const inputId = `${idPrefix}-${groupId}-${index}`;
          return (
            <li key={option.value} className="flex items-center gap-3">
              <input
                id={inputId}
                type="checkbox"
                checked={option.isChecked}
                onChange={option.onChange}
                className="h-4 w-4 rounded-sm border-input accent-primary"
              />
              <label htmlFor={inputId} className="text-sm">
                {option.label}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function FilterPanel({ options, filters, onToggle, onClear, idPrefix }: FilterPanelProps) {
  const activeFilterCount = countActiveFilters(filters);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">Filtrar</p>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm underline underline-offset-4 hover:text-muted-foreground"
          >
            Limpiar ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterFieldset
        legend="Altura de caña"
        groupId="shaftHeights"
        idPrefix={idPrefix}
        options={options.shaftHeights.map((shaftHeight) => ({
          value: shaftHeight,
          label: shaftHeightLabels[shaftHeight],
          isChecked: filters.shaftHeights.includes(shaftHeight),
          onChange: () => onToggle("shaftHeights", shaftHeight),
        }))}
      />
      <FilterFieldset
        legend="Tipo de cuero"
        groupId="leatherTypes"
        idPrefix={idPrefix}
        options={options.leatherTypes.map((leatherType) => ({
          value: leatherType,
          label: leatherType,
          isChecked: filters.leatherTypes.includes(leatherType),
          onChange: () => onToggle("leatherTypes", leatherType),
        }))}
      />
      <FilterFieldset
        legend="Color"
        groupId="colorFamilies"
        idPrefix={idPrefix}
        options={options.colorFamilies.map((colorFamily) => ({
          value: colorFamily,
          label: colorFamily,
          isChecked: filters.colorFamilies.includes(colorFamily),
          onChange: () => onToggle("colorFamilies", colorFamily),
        }))}
      />

      <fieldset className="border-t py-5">
        <legend className="float-left mb-3 w-full font-display text-xl">Talla (EU)</legend>
        <ul className="clear-both grid grid-cols-4 gap-2">
          {options.sizes.map((size) => {
            const inputId = `${idPrefix}-talla-${size}`;
            const isChecked = filters.sizes.includes(size);
            return (
              <li key={size}>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle("sizes", size)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-center rounded-sm border text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:bg-accent",
                  )}
                >
                  {size}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <FilterFieldset
        legend="Precio"
        groupId="priceRangeIds"
        idPrefix={idPrefix}
        options={priceRanges.map((range) => ({
          value: range.id,
          label: range.label,
          isChecked: filters.priceRangeIds.includes(range.id),
          onChange: () => onToggle("priceRangeIds", range.id),
        }))}
      />
    </div>
  );
}
