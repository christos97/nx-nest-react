const chartColors = [
  { name: 'Red', rgb: 'rgb(255, 99, 132)' },
  { name: 'Blue', rgb: 'rgb(54, 162, 235)' },
  { name: 'Yellow', rgb: 'rgb(255, 206, 86)' },
  { name: 'Green', rgb: 'rgb(75, 192, 192)' },
  { name: 'Purple', rgb: 'rgb(153, 102, 255)' },
  { name: 'Orange', rgb: 'rgb(255, 159, 64)' },
  { name: 'Cyan', rgb: 'rgb(0, 255, 255)' },
  { name: 'Magenta', rgb: 'rgb(255, 0, 255)' },
  { name: 'Lime', rgb: 'rgb(0, 255, 0)' },
  { name: 'Pink', rgb: 'rgb(255, 192, 203)' },
  { name: 'Gold', rgb: 'rgb(255, 215, 0)' },
  { name: 'Silver', rgb: 'rgb(192, 192, 192)' },
];

const generatePalette = (): { primaryColor: string; secondaryColor: string } => {
  // Generate random RGB color
  const primaryColor = `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
    Math.random() * 100 + 155,
  )}, ${Math.floor(Math.random() * 100 + 155)})`;

  // Calculate slightly darker color
  const secondaryColor = darkenColor(primaryColor, 0.3); // Adjust the darkness level as desired

  return { primaryColor, secondaryColor };
};

const darkenColor = (color: string, amount: number): string => {
  // Parse RGB components
  const [r, g, b] = color.replace(/[^\d,]/g, '').split(',');

  // Calculate darker color components
  const darkerR = Math.floor(Number(r) * (1 - amount));
  const darkerG = Math.floor(Number(g) * (1 - amount));
  const darkerB = Math.floor(Number(b) * (1 - amount));

  // Return darker color
  return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
};

export { generatePalette };
