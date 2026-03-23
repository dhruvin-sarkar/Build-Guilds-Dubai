import { parse } from 'node-html-parser';

async function test() {
  const url = 'https://blueprint.hackclub.com/explore?sort=top&type=projects';
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);
  
  const links = root.querySelectorAll('a[href^="/projects/"]');
  console.log(`Found ${links.length} project links.`);
  
  if (links.length > 0) {
    console.log('--- HTML of first link ---');
    console.log(links[0].innerHTML.slice(0, 1000));
  }
}

test();
