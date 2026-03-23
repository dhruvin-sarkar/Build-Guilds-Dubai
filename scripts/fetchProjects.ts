import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/projects.generated.ts');
const IMAGES_DIR = path.join(__dirname, '../public/blueprint-projects'); // Using existing naming convention
const BLUEPRINT_EXPLORE_URL = 'https://blueprint.hackclub.com/explore?sort=top&type=projects';

interface Project {
  id: string;
  slug: string;
  name: string;
  creator: string;
  summary: string;
  githubUrl: string;
  blueprintUrl: string;
  imageUrl: string;
  views: number;
  followers: number;
}

async function fetchProjectDetails(id: string): Promise<{ creator: string; githubUrl: string; fallbackImage: string; description: string }> {
  try {
    const url = `https://blueprint.hackclub.com/projects/${id}`;
    const response = await fetch(url);
    if (!response.ok) return { creator: 'Blueprint Maker', githubUrl: '', fallbackImage: '', description: '' };
    const html = await response.text();
    const root = parse(html);
    
    // 1. Creator Name
    let creator = 'Blueprint Maker';
    const userLinks = root.querySelectorAll('a[href^="/users/"]');
    if (userLinks.length > 0) {
      creator = userLinks[0].text.trim();
    } else {
      const titleMatch = html.match(/<title>(.*?) by (.*?) \| Blueprint/i);
      if (titleMatch) creator = titleMatch[2].trim();
    }

    // 2. GitHub URL
    const githubLink = root.querySelector('a[href*="github.com"]');
    const githubUrl = githubLink ? githubLink.getAttribute('href') || '' : '';

    // 3. Fallback Image (og:image)
    const ogImage = root.querySelector('meta[property="og:image"]');
    const fallbackImage = ogImage ? ogImage.getAttribute('content') || '' : '';

    // 4. Description (Full) - Search for prose or the first significant paragraph
    const prose = root.querySelector('div.prose');
    let description = '';
    
    const isBoilerplate = (txt: string) => {
      const lower = txt.toLowerCase();
      return lower.includes('are you sure') || 
             lower.includes('heads up') || 
             lower.includes('quality standards') || 
             lower.includes('access to more features') ||
             lower.includes('submit your own');
    };

    if (prose) {
      const ps = prose.querySelectorAll('p');
      for (const p of ps) {
        const text = p.text.trim();
        if (text.length > 40 && !isBoilerplate(text)) {
          description = text;
          break;
        }
      }
    }
    
    // Fallback if no prose p found or if it's guard text
    if (!description || isBoilerplate(description)) {
      const allPs = root.querySelectorAll('p');
      for (const p of allPs) {
        const text = p.text.trim();
        if (text.length > 40 && !isBoilerplate(text)) {
          description = text;
          break;
        }
      }
    }

    return { creator, githubUrl, fallbackImage, description };
  } catch {
    return { creator: 'Blueprint Maker', githubUrl: '', fallbackImage: '', description: '' };
  }
}

async function downloadImage(url: string, id: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    const fileName = `${id}.webp`;
    const filePath = path.join(IMAGES_DIR, fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return `/blueprint-projects/${fileName}`;
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error);
    return '';
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchProjects() {
  console.log('Fetching projects from Blueprint...');

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const urls = [
    'https://blueprint.hackclub.com/explore?sort=top&type=projects',
    'https://blueprint.hackclub.com/explore?sort=new&type=projects',
    'https://blueprint.hackclub.com/explore?sort=shipped&type=projects',
    'https://blueprint.hackclub.com/explore?sort=top&type=projects&page=2',
    'https://blueprint.hackclub.com/explore?sort=new&type=projects&page=2',
    'https://blueprint.hackclub.com/explore?sort=top&type=projects&page=3'
  ];

  const projectsMap = new Map<string, Project>();

  try {
    for (const url of urls) {
      console.log(`Fetching from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) continue;
      const html = await response.text();
      const root = parse(html);

      const projectLinks = root.querySelectorAll('a[href^="/projects/"]');
      console.log(`Analyzing ${projectLinks.length} project links for images...`);

      for (const link of projectLinks) {
        const href = link.getAttribute('href') || '';
        const idMatch = href.match(/\/projects\/(\d+)/);
        if (!idMatch) continue;
        const id = idMatch[1];

        // --- STRICT IMAGE CHECK ---
        // Find the div with background-image inside the link
        const imageDiv = link.querySelector('div[style*="background-image"]');
        const styleText = imageDiv ? imageDiv.getAttribute('style') || '' : '';
        const hasImage = styleText.includes('url(') && !styleText.includes("url('')") && !styleText.includes('url("")');
        
        if (!hasImage) {
          // console.log(`Skipping project ${id} - no valid banner found in snippet.`);
          continue;
        }

        if (projectsMap.has(id)) continue;

        // --- EXTRACT METADATA ---
        const h3Tag = link.querySelector('h3, p.text-2xl'); // Try to find the title
        const projectName = h3Tag ? h3Tag.text.trim() : link.text.split('\n').map(l => l.trim()).filter(l => l.length > 0)[0] || 'Unknown Project';
        const descriptionSnippet = link.querySelector('p:not(.text-2xl)')?.text.trim() || '';

        // Always fetch details for every project to get GitHub URLs and better titles/creators
        console.log(`Deep fetching details for project ${id} (${projectName})...`);
        const details = await fetchProjectDetails(id);
        await delay(300); // Be nice to the server

        const creator = details.creator;
        const blueprintUrl = `https://blueprint.hackclub.com/projects/${id}`;
        const githubUrl = details.githubUrl || blueprintUrl; // Fallback to blueprint if no github
        
        const divs = link.querySelectorAll('div');
        const bgDiv = divs.find(d => d.getAttribute('style')?.includes('background-image'));
        const style = bgDiv?.getAttribute('style') || '';
        const urlMatch = style.match(/url\(['"]?([^'"]+)['"]?\)/);
        let remoteImageUrl = urlMatch ? urlMatch[1] : '';

        if (!remoteImageUrl && style.includes('url(')) {
          const start = style.indexOf('url(') + 4;
          const end = style.indexOf(')', start);
          remoteImageUrl = style.slice(start, end).replace(/['"]/g, '');
        }

        if (remoteImageUrl && remoteImageUrl.startsWith('/')) {
          remoteImageUrl = `https://blueprint.hackclub.com${remoteImageUrl}`;
        }
        
        // Use fallback image from details if remoteImageUrl is still empty
        if (!remoteImageUrl && details.fallbackImage) {
          remoteImageUrl = details.fallbackImage;
        }

        let localImage = '';
        if (remoteImageUrl) {
          const fullImageUrl = remoteImageUrl.startsWith('http') ? remoteImageUrl : `https://blueprint.hackclub.com${remoteImageUrl}`;
          localImage = await downloadImage(fullImageUrl, id);
        }

        // Extract views and followers
        const textContent = link.text;
        const viewsMatch = textContent.match(/(\d+)\s+views/);
        const followersMatch = textContent.match(/(\d+)\s+followers/);
        const views = viewsMatch ? parseInt(viewsMatch[1], 10) : 0;
        const followers = followersMatch ? parseInt(followersMatch[1], 10) : 0;

        projectsMap.set(id, {
          id,
          slug: id,
          name: projectName,
          creator,
          summary: details.description || descriptionSnippet || projectName, // Prefer full description, snippet, then name
          githubUrl,
          blueprintUrl,
          imageUrl: localImage,
          views,
          followers
        });

        if (projectsMap.size >= 150) break;
      }
      if (projectsMap.size >= 150) break;
    }

    const projects = Array.from(projectsMap.values());
    
    const tsContent = `
import { BlueprintProject } from './projects';

export const generatedProjects: BlueprintProject[] = ${JSON.stringify(projects, null, 2)};
`;

    fs.writeFileSync(DATA_FILE, tsContent);
    console.log(`Successfully generated ${projects.length} projects in ${DATA_FILE}`);

  } catch (error) {
    console.error('Error in fetchProjects:', error);
  }
}

fetchProjects();
