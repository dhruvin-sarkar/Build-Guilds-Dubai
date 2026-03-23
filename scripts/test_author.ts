import { parse } from 'node-html-parser';

async function getProjectAuthor(id: string) {
  try {
    const url = `https://blueprint.hackclub.com/projects/${id}`;
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    
    // Check title tag: "<name> by <author> | Blueprint"
    const title = root.querySelector('title')?.text || '';
    const match = title.match(/(.*) by (.*) \| Blueprint/i);
    if (match) {
      return match[2].trim();
    }
    
    // Check meta creator/author
    const metaAuthor = root.querySelector('meta[name="author"]')?.getAttribute('content');
    if (metaAuthor) return metaAuthor;
    
    // Fallback: look for profile links
    const profileLink = root.querySelector('a[href^="/u/"]');
    if (profileLink) return profileLink.text.trim();

    return 'Blueprint Maker';
  } catch (err) {
    return 'Blueprint Maker';
  }
}

async function main() {
  const author = await getProjectAuthor('117');
  console.log(`AUTHOR_START:${author}:AUTHOR_END`);
}

main();
