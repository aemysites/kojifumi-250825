/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row: block name per instructions
  const headerRow = ['Columns (columns29)'];

  // Table content row: each cell is the referenced column div
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
