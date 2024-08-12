const HTML_EMPTY_TAG = /<[^\/>]*><\/[^\/>]*>/g;
const HTML_EMPTY_TAG_WHITE_SPACE = /<[^\/>]*>\s*<\/[^\/>]*>/g;

/**
 * * Remove empty tags from HTML
 */
export function cleanHTML(html: string, keepWhitespaceContent = true): string {
  return (
    html
      // Remove empty tags
      .replace(
        keepWhitespaceContent ? HTML_EMPTY_TAG : HTML_EMPTY_TAG_WHITE_SPACE,
        ""
      )
  );
}
