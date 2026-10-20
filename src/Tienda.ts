export type Venta = {
  producto: string;
  categoria: "libros" | "tecnologia";
  importe: number;
  pagada: boolean;
};

export const ventas: Venta[] = [
  { producto: "Libro TypeScript", categoria: "libros", importe: 25000, pagada: true },
  { producto: "Mouse", categoria: "tecnologia", importe: 18000, pagada: true },
  { producto: "Teclado", categoria: "tecnologia", importe: 45000, pagada: false },
  { producto: "Libro Clean Code", categoria: "libros", importe: 32000, pagada: true },
  { producto: "Monitor", categoria: "tecnologia", importe: 150000, pagada: true },
  { producto: "Auriculares", categoria: "tecnologia", importe: 28000, pagada: false },
];

// 1. Todas las ventas pagadas (filter)
export const obtenerVentasPagadas = (listaVentas: Venta[]): Venta[] =>
  listaVentas.filter((venta) => venta.pagada);

// 2. Arreglo con los importes de las ventas pagadas (filter + map)
export const obtenerImportesVentasPagadas = (listaVentas: Venta[]): number[] =>
  obtenerVentasPagadas(listaVentas).map((venta) => venta.importe);

// 3. Nombres de productos de tecnología pagados (filter + map)
export const obtenerProductosTecnologiaPagados = (listaVentas: Venta[]): string[] =>
  listaVentas
    .filter((venta) => venta.pagada && venta.categoria === "tecnologia")
    .map((venta) => venta.producto);


// 4. Facturación total de las ventas pagadas (reduce)
export const calcularFacturacionTotalPagada = (listaVentas: Venta[]): number =>
  obtenerVentasPagadas(listaVentas).reduce(
    (acumuladorImporte, venta) => acumuladorImporte + venta.importe,
    0
  );

// 5. Cantidad de ventas pendientes de pago (filter)
export const contarVentasPendientes = (listaVentas: Venta[]): number =>
  listaVentas.filter((venta) => !venta.pagada).length;

// 6. Importe total pendiente de cobro (filter + reduce)
export const calcularImportePendienteDeCobro = (listaVentas: Venta[]): number =>
  listaVentas
    .filter((venta) => !venta.pagada)
    .reduce((acumuladorImporte, venta) => acumuladorImporte + venta.importe, 0);

// ---------- Verificación ----------
const copiaOriginal = JSON.stringify(ventas);

console.log("1. Ventas pagadas:", obtenerVentasPagadas(ventas));
console.log("2. Importes pagados:", obtenerImportesVentasPagadas(ventas));
console.log("3. Tecnología pagada:", obtenerProductosTecnologiaPagados(ventas));
console.log("4. Facturación total pagada:", calcularFacturacionTotalPagada(ventas));
console.log("5. Ventas pendientes:", contarVentasPendientes(ventas));
console.log("6. Importe pendiente:", calcularImportePendienteDeCobro(ventas));
console.log("Arreglo original sin modificar:", JSON.stringify(ventas) === copiaOriginal);