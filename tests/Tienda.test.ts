import { describe, it, expect } from "vitest";
import {
  Venta,
  ventas,
  obtenerVentasPagadas,
  obtenerImportesVentasPagadas,
  obtenerProductosTecnologiaPagados,
  calcularFacturacionTotalPagada,
  contarVentasPendientes,
  calcularImportePendienteDeCobro,
} from "../src/Tienda";

const ventasSinPagos: Venta[] = [
  { producto: "Teclado", categoria: "tecnologia", importe: 45000, pagada: false },
  { producto: "Libro Clean Code", categoria: "libros", importe: 32000, pagada: false },
];

const ventasTodasPagadas: Venta[] = [
  { producto: "Mouse", categoria: "tecnologia", importe: 18000, pagada: true },
  { producto: "Libro TypeScript", categoria: "libros", importe: 25000, pagada: true },
];

describe("1. obtenerVentasPagadas", () => {
  it("devuelve solo las ventas pagadas", () => {
    const resultado = obtenerVentasPagadas(ventas);
    expect(resultado.map((venta) => venta.producto)).toEqual([
      "Libro TypeScript",
      "Mouse",
      "Libro Clean Code",
      "Monitor",
    ]);
  });

  it("devuelve un arreglo vacío si no hay ventas pagadas", () => {
    expect(obtenerVentasPagadas(ventasSinPagos)).toEqual([]);
  });

  it("devuelve un arreglo vacío si la lista está vacía", () => {
    expect(obtenerVentasPagadas([])).toEqual([]);
  });
});

describe("2. obtenerImportesVentasPagadas", () => {
  it("devuelve solo los importes de las ventas pagadas", () => {
    expect(obtenerImportesVentasPagadas(ventas)).toEqual([25000, 18000, 32000, 150000]);
  });

  it("devuelve un arreglo vacío si no hay ventas pagadas", () => {
    expect(obtenerImportesVentasPagadas(ventasSinPagos)).toEqual([]);
  });
});

describe("3. obtenerProductosTecnologiaPagados", () => {
  it("devuelve los nombres de los productos de tecnología pagados", () => {
    expect(obtenerProductosTecnologiaPagados(ventas)).toEqual(["Mouse", "Monitor"]);
  });

  it("no incluye productos de tecnología sin pagar ni libros", () => {
    const resultado = obtenerProductosTecnologiaPagados(ventas);
    expect(resultado).not.toContain("Teclado");
    expect(resultado).not.toContain("Auriculares");
    expect(resultado).not.toContain("Libro TypeScript");
  });

  it("devuelve un arreglo vacío si no hay tecnología pagada", () => {
    expect(obtenerProductosTecnologiaPagados(ventasSinPagos)).toEqual([]);
  });
});

describe("4. calcularFacturacionTotalPagada", () => {
  it("suma los importes de las ventas pagadas", () => {
    expect(calcularFacturacionTotalPagada(ventas)).toBe(225000);
  });

  it("devuelve 0 si no hay ventas pagadas", () => {
    expect(calcularFacturacionTotalPagada(ventasSinPagos)).toBe(0);
  });

  it("devuelve 0 si la lista está vacía", () => {
    expect(calcularFacturacionTotalPagada([])).toBe(0);
  });
});

describe("5. contarVentasPendientes", () => {
  it("cuenta las ventas pendientes de pago", () => {
    expect(contarVentasPendientes(ventas)).toBe(2);
  });

  it("devuelve 0 si todas las ventas están pagadas", () => {
    expect(contarVentasPendientes(ventasTodasPagadas)).toBe(0);
  });

  it("devuelve la cantidad total si ninguna está pagada", () => {
    expect(contarVentasPendientes(ventasSinPagos)).toBe(2);
  });
});

describe("6. calcularImportePendienteDeCobro", () => {
  it("suma los importes de las ventas no pagadas", () => {
    expect(calcularImportePendienteDeCobro(ventas)).toBe(73000);
  });

  it("devuelve 0 si todas las ventas están pagadas", () => {
    expect(calcularImportePendienteDeCobro(ventasTodasPagadas)).toBe(0);
  });

  it("devuelve 0 si la lista está vacía", () => {
    expect(calcularImportePendienteDeCobro([])).toBe(0);
  });
});

describe("Inmutabilidad: ninguna función modifica el arreglo original", () => {
  it("deja el arreglo ventas igual después de ejecutar todas las funciones", () => {
    const copiaOriginal = JSON.stringify(ventas);

    obtenerVentasPagadas(ventas);
    obtenerImportesVentasPagadas(ventas);
    obtenerProductosTecnologiaPagados(ventas);
    calcularFacturacionTotalPagada(ventas);
    contarVentasPendientes(ventas);
    calcularImportePendienteDeCobro(ventas);

    expect(JSON.stringify(ventas)).toBe(copiaOriginal);
  });
});
