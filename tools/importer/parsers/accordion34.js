/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Select all accordion items (direct children)
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell: find the toggle div with the title
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        titleCell = titleEl;
      }
    }
    // Content cell: find the dropdown content
    let contentCell = '';
    const contentNav = item.querySelector('.accordion-content');
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text');
      if (richText) {
        contentCell = richText;
      }
    }
    // Always push a row, even if empty (edge case)
    rows.push([
      titleCell || '',
      contentCell || ''
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
