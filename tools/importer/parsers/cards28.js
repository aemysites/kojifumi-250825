/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid inside each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      let imageCell = null;
      let textCell = document.createElement('div');
      textCell.style.display = 'block';
      // Try to find image container
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        const img = imgContainer.querySelector('img');
        if (img) {
          imageCell = img;
        }
      }
      // If no image, leave cell empty
      if (!imageCell) {
        imageCell = document.createElement('div');
      }
      // Find heading and description
      const heading = card.querySelector('h3');
      if (heading) textCell.appendChild(heading);
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCell.appendChild(desc);
      // If there is a CTA link (not present in this HTML, but for future-proofing)
      // Example: const cta = card.querySelector('a.cta');
      // if (cta) textCell.appendChild(cta);
      rows.push([imageCell, textCell]);
    });
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
