/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as per block requirements (exactly one column)
  const headerRow = ['Cards (cards6)'];

  // Get all immediate children (each card is a child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each cardDiv contains an image (inside .utility-aspect-1x1)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Try to find the image inside the cardDiv
    const img = cardDiv.querySelector('img');
    // Defensive: if no image, leave cell empty
    const imageCell = img ? img : '';
    // Use the alt text as the card's text content, fallback to empty string
    let textCell = '';
    if (img && img.alt) {
      textCell = img.alt;
    } else {
      // If no alt, try to get any text content from the cardDiv
      textCell = cardDiv.textContent.trim();
    }
    return [imageCell, textCell];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix the header row to have exactly one column (remove any extra th)
  const ths = block.querySelectorAll('thead tr th');
  if (ths.length > 1) {
    for (let i = 1; i < ths.length; i++) {
      ths[i].remove();
    }
  }

  // Replace the original element with the new block table
  element.replaceWith(block);
}
