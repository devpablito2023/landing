// Mantener este archivo pero simplificarlo para landing page
const colorSchemes = ["indigo", "blue", "green", "purple", "gray"];
const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function generateSafelist() {
  const safelist = [];

  // Clases esenciales para landing page
  colorSchemes.forEach((color) => {
    intensities.forEach((intensity) => {
      // Fondos
      safelist.push(`bg-${color}-${intensity}`);
      safelist.push(`hover:bg-${color}-${intensity}`);

      // Texto
      safelist.push(`text-${color}-${intensity}`);
      safelist.push(`hover:text-${color}-${intensity}`);

      // Bordes
      safelist.push(`border-${color}-${intensity}`);
    });
  });

  // Gradientes para hero sections
  colorSchemes.forEach((color) => {
    safelist.push(`from-${color}-400`);
    safelist.push(`to-${color}-600`);
    safelist.push(`via-${color}-500`);
  });

  return safelist;
}
