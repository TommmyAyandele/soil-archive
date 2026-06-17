import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CollectionConfig {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  region: string;
  year: string;
  yearRange: string;
  featured: boolean;
  tags: string[];
  coverColor: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Document {
  type: "text" | "letter" | "poem" | "photograph" | "speech";
  title: string;
  date?: string;
  author?: string;
  body: string;
  placeholder?: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "collections");

export function getAllCollections(): CollectionConfig[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const slugs = fs.readdirSync(CONTENT_DIR).filter((d) => {
    return fs.statSync(path.join(CONTENT_DIR, d)).isDirectory();
  });
  return slugs
    .map((slug) => getCollectionConfig(slug))
    .filter(Boolean) as CollectionConfig[];
}

export function getCollectionConfig(slug: string): CollectionConfig | null {
  const configPath = path.join(CONTENT_DIR, slug, "config.json");
  if (!fs.existsSync(configPath)) return null;
  const raw = fs.readFileSync(configPath, "utf-8");
  return { slug, ...JSON.parse(raw) };
}

export function getCollectionOverview(slug: string): { content: string; data: Record<string, unknown> } | null {
  const mdxPath = path.join(CONTENT_DIR, slug, "index.mdx");
  if (!fs.existsSync(mdxPath)) return null;
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}

export function getCollectionTimeline(slug: string): TimelineEntry[] {
  const jsonPath = path.join(CONTENT_DIR, slug, "timeline.json");
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

export function getCollectionDocuments(slug: string): Document[] {
  const jsonPath = path.join(CONTENT_DIR, slug, "documents.json");
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}
