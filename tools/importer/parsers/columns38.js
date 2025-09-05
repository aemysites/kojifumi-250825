/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header must match block name exactly
  const headerRow = ['Columns (columns38)'];

  // Each column cell is the referenced div (preserving images and any content)
  const contentRow = columns;

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
