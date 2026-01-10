import { createClient } from "@sanity/client";
import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for token
if (!process.env.SANITY_TOKEN) {
  console.error("Error: SANITY_TOKEN is missing in .env");
  process.exit(1);
}

const client = createClient({
  projectId: "wza0icfm", // Hardcoded from config
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const blogDir = path.join(__dirname, "../src/content/blog");

async function migrate() {
  try {
    const files = fs
      .readdirSync(blogDir)
      .filter((file) => file.endsWith(".md"));

    console.log(`Found ${files.length} markdown files to migrate...`);

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data, content: body } = matter(content);
      const slug = path.basename(file, ".md");

      const doc = {
        _id: `post-${slug}`,
        _type: "post",
        title: data.title,
        slug: { _type: "slug", current: slug },
        publishedAt: new Date(data.pubDate).toISOString(),
        author: data.author, // Assuming string as per updated schema
        description: data.description,
        tags: data.tags,
        body: body, // Markdown string
      };

      try {
        const res = await client.createOrReplace(doc);
        console.log(`✅ Migrated: ${file} -> ${res._id}`);
      } catch (err) {
        console.error(`❌ Failed to migrate ${file}:`, err.message);
      }
    }
    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
