import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DetalleHoras {
  concepto: string;
  tiempo: string;
  detalle?: string;
}

interface DatosPDF {
  titulo: string;
  fecha: string;
  horas: number;
  minutos: number;
  desglose: DetalleHoras[];
  disclaimer?: string;
  userName?: string;      // ← NUEVO
  userEmail?: string;     // ← NUEVO
}

// Función para convertir imagen a base64
async function cargarLogoBase64(): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } else {
        reject(new Error("No se pudo obtener el contexto del canvas"));
      }
    };
    
    img.onerror = () => {
      reject(new Error("Error al cargar el logo"));
    };
    
    // Cargar desde la carpeta public
    img.src = "/logo.png";
  });
}

export async function generarPDF(datos: DatosPDF) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colores SEIDOR - Definidos como tuplas explícitas
  const colorPrimario: [number, number, number] = [52, 71, 176]; // #3447B0
  const colorSecundario: [number, number, number] = [68, 100, 226]; // #4464E2
  const colorTexto: [number, number, number] = [60, 60, 60];
  const colorGris: [number, number, number] = [132, 144, 180]; // #8490B4

  let yPosition = 20;

  // ==========================================
  // HEADER - Estilo Opción 3 (Panel Blanco)
  // ==========================================
  
  // Fondo azul degradado simulado
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, pageWidth, 45, "F");

  try {
    const logoBase64 = await cargarLogoBase64();
    
    // Panel blanco para el logo (rectángulo redondeado)
    doc.setFillColor(255, 255, 255); // Blanco
    doc.roundedRect(15, 12, 45, 20, 3, 3, "F"); // x, y, ancho, alto, radio
    
    // Sombra del panel (simulada con gris claro)
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, 12, 45, 20, 3, 3, "S");
    
    // Logo dentro del panel blanco
    doc.addImage(logoBase64, "PNG", 18, 15, 38, 14);
    
    // Texto "Calculadora de Horas" al lado del panel
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Calculadora de Horas", 68, 24);
    
  } catch (error) {
    // Fallback: Si el logo no carga, usar texto
    console.error("Error al cargar el logo:", error);
    
    // Panel blanco
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 12, 45, 20, 3, 3, "F");
    
    // Texto SEIDOR en el panel
    doc.setTextColor(...colorPrimario);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SEIDOR", 22, 24);
    
    // Texto al lado
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Calculadora de Horas", 68, 24);
  }

  yPosition = 55;

  // ==========================================
  // TÍTULO DEL MÓDULO
  // ==========================================
  doc.setTextColor(...colorPrimario);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(datos.titulo, 15, yPosition);
  yPosition += 10;

  // Fecha de generación
  doc.setTextColor(...colorGris);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Fecha: ${datos.fecha}`, 15, yPosition);
  yPosition += 15;

  // ==========================================
  // TIEMPO TOTAL - Caja destacada
  // ==========================================
  const cajaY = yPosition;
  const cajaAltura = 25;
  
  // Fondo celeste claro
  doc.setFillColor(225, 237, 249); // #E1EDF9
  doc.roundedRect(15, cajaY, pageWidth - 30, cajaAltura, 3, 3, "F");
  
  // Borde azul
  doc.setDrawColor(...colorPrimario);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, cajaY, pageWidth - 30, cajaAltura, 3, 3, "S");

  // Texto del tiempo
  doc.setTextColor(...colorPrimario);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tiempo Total Estimado", 20, cajaY + 8);
  
  doc.setFontSize(16);
  const tiempoTexto = datos.minutos > 0 
    ? `${datos.horas} ${datos.horas === 1 ? 'hora' : 'horas'} ${datos.minutos} min`
    : `${datos.horas} ${datos.horas === 1 ? 'hora' : 'horas'}`;
  doc.text(tiempoTexto, 20, cajaY + 18);

  yPosition += cajaAltura + 15;

  // ==========================================
  // TABLA DE DESGLOSE
  // ==========================================
  if (datos.desglose.length > 0) {
    const tableData = datos.desglose.map(item => [
      item.concepto,
      item.tiempo,
      item.detalle || ""
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Concepto", "Tiempo", "Detalle"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: colorPrimario,
        textColor: [255, 255, 255] as [number, number, number],
        fontSize: 11,
        fontStyle: "bold",
        halign: "left",
      },
      bodyStyles: {
        textColor: colorTexto,
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250] as [number, number, number],
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 40 },
        2: { cellWidth: "auto" },
      },
      margin: { left: 15, right: 15 },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // ==========================================
  // DISCLAIMER (si existe)
  // ==========================================
  if (datos.disclaimer) {
    // Verificar si hay espacio suficiente
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 20;
    }

    // Calcular altura dinámica basada en el texto
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const disclaimerLines = doc.splitTextToSize(
      datos.disclaimer,
      pageWidth - 40
    );
    
    // Altura dinámica: líneas * altura de línea + padding
    const lineHeight = 4;
    const disclaimerHeight = (disclaimerLines.length * lineHeight) + 8;
    
    // Fondo amarillo claro
    doc.setFillColor(255, 251, 230); // Amarillo muy claro
    doc.roundedRect(15, yPosition, pageWidth - 30, disclaimerHeight, 3, 3, "F");
    
    // Borde amarillo
    doc.setDrawColor(234, 179, 8); // Amarillo oscuro
    doc.setLineWidth(0.5);
    doc.roundedRect(15, yPosition, pageWidth - 30, disclaimerHeight, 3, 3, "S");

    // Texto del disclaimer
    doc.setTextColor(133, 77, 14); // Texto amarillo oscuro
    doc.text(disclaimerLines, 20, yPosition + 6);

    yPosition += disclaimerHeight + 10;
  }

  // ==========================================
  // PIE DE PÁGINA CON INFORMACIÓN DEL USUARIO
  // ==========================================
  
  // Obtener información del usuario y fecha/hora de generación
  const userName = datos.userName || "Usuario";
  const userEmail = datos.userEmail || "";
  const now = new Date();
  const fecha = now.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hora = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Ir a la última página del documento
  const pageCount = doc.internal.pages.length - 1;
  doc.setPage(pageCount);

  // Posicionar en la parte inferior de la página
  const footerY = pageHeight - 25;

  // Dibujar línea separadora
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, footerY, pageWidth - 15, footerY);

  // Agregar información del usuario (centrado)
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Documento generado por: ${userName}${userEmail ? ` (${userEmail})` : ""}`,
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );
  
  // Agregar fecha y hora de generación
  doc.text(
    `Fecha de generación: ${fecha} a las ${hora}`,
    pageWidth / 2,
    footerY + 10,
    { align: "center" }
  );

  // Texto SEIDOR en el pie (mantener el footer original más abajo)
  doc.setFontSize(7);
  doc.setTextColor(...colorGris);
  doc.text(
    "Este documento ha sido generado automáticamente por la Calculadora de Horas de SEIDOR",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  // ==========================================
  // GUARDAR PDF
  // ==========================================
  const nombreArchivo = `SEIDOR_${datos.titulo.replace(/\s+/g, "_")}_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  doc.save(nombreArchivo);
}

export function obtenerFechaActual(): string {
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return fecha.toLocaleDateString("es-ES", opciones);
}