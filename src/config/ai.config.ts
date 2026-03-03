const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
];

const contentsInput = (cleanHtml: string, userRequirement: string) => {
  const outPut = `You are a web scraping expert. 
           Based on this HTML structure: ${cleanHtml}
           Identify the specific CSS selector needed to extract the information for: "${userRequirement}".
           
           Rules:
           1. Return ONLY the CSS selector string (e.g., "h3.title", "div.price > span").
           2. Do not include any explanations, markdown, or extra text.
           3. If you cannot find a clear selector, return "NOT_FOUND".`;
  return outPut;
};

const MODELS = [
  "gemini-2.0-flash",
  " gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3-flash-preview",
  "	gemini-3.1-flash-lite-preview",
];
export default { USER_AGENTS, MODELS, contentsInput };
