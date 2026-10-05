import { footMeasuringSteps, sizeGuideTable } from "@/content/tallas";

// Tabla de equivalencias y pasos para medir el pie. Se usa en la ventana de
// la ficha de producto y en la página /guia-de-tallas.
export function SizeGuideContent() {
  return (
    <>
      <table className="w-full text-center text-sm">
        <caption className="sr-only">Equivalencia de tallas US, EU y largo del pie</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="py-2 font-medium">US</th>
            <th scope="col" className="py-2 font-medium">EU</th>
            <th scope="col" className="py-2 font-medium">Largo del pie (cm)</th>
          </tr>
        </thead>
        <tbody>
          {sizeGuideTable.map((size) => (
            <tr key={size.eu} className="border-b last:border-0">
              <td className="py-2">{size.us}</td>
              <td className="py-2">{size.eu}</td>
              <td className="py-2">{size.cm}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-8 font-display text-xl">Cómo medir su pie</h3>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
        {footMeasuringSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </>
  );
}
