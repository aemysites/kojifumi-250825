/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as required
  const headerRow = ['Columns (columns5)'];

  // Get all direct children (should be the 5 column divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell will contain the full content of its respective div (usually an image)
  const columnsRow = columnDivs.map((colDiv) => colDiv);

  // Compose the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
