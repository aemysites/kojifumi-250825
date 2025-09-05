/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.children || element.children.length === 0) return;

  // Header row: one cell with block name, but spanning two columns for alignment
  const headerRow = [
    { content: 'Cards (cards8)', colspan: 2 }
  ];
  const rows = [headerRow];

  // Each card is a direct child div with class 'utility-aspect-1x1'
  const cardDivs = Array.from(element.children).filter(div => div.classList.contains('utility-aspect-1x1'));

  cardDivs.forEach(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image

    // First cell: the image element itself
    // Second cell: use the alt text as heading (strong)
    let textCell;
    if (img.alt && img.alt.trim()) {
      const heading = document.createElement('strong');
      heading.textContent = img.alt;
      textCell = heading;
    } else {
      textCell = '';
    }

    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
