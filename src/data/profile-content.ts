import { blogPosts, presentations as latestPresentations, books, contributions } from "./blog-entries";

// エクスポート - blog-entries.tsから取得したデータをそのまま使用
export { blogPosts, books, contributions };

// プレゼン情報のエクスポート
export const presentations = latestPresentations;
