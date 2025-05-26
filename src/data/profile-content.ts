import { blogPosts, presentations as latestPresentations, books, contributions } from "./blog-entries";

// スキル情報
export const skills = [
  // プラットフォームエンジニアリング
  { name: "Kubernetes", category: "Platform" },
  { name: "Docker", category: "Platform" },
  { name: "プラットフォームエンジニアリング", category: "Platform" },
  { name: "Cloud Native", category: "Platform" },
  { name: "Cloud Foundry", category: "Platform" },
  
  // DevOps/SRE関連（HashiCorp製品もこちらに統合）
  { name: "DevOps", category: "DevOps" },
  { name: "SRE", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "GitOps", category: "DevOps" },
  { name: "Observability", category: "DevOps" },
  { name: "Terraform", category: "DevOps" },
  { name: "Vault", category: "DevOps" },
  { name: "Consul", category: "DevOps" },
  { name: "Nomad", category: "DevOps" },
  
  // インシデント管理
  { name: "インシデント管理", category: "Incident" },
  { name: "PagerDuty", category: "Incident" },
  
  // インフラ関連
  { name: "AWS", category: "Infrastructure" },
  
  // ソフトスキル
  { name: "コミュニティ運営", category: "SoftSkill" },
  { name: "技術エバンジェリズム", category: "SoftSkill" },
  { name: "テクニカルライティング", category: "SoftSkill" },
  { name: "プレゼンテーション", category: "SoftSkill" },
  { name: "ファシリテーション", category: "SoftSkill" },
  
  // プログラミング言語
  { name: "Ruby", category: "Language" },
  
  // その他
  { name: "Streaming", category: "Other" },
  { name: "Illustrator", category: "Design" },
  { name: "Photoshop", category: "Design" }
];

// プロフィール情報
export const profileInfo = {
  nameEn: "Kazuto Kusama",
  nameJa: "草間 一人",
  nickname: "jacopen",
  titlePagerDuty: "PagerDuty　プロダクトエバンジェリスト",
  titleCNIA: "一般社団法人クラウドネイティブイノベーターズ協会　代表理事",
  bio: "PagerDutyのProduct Evangelistとして、インシデント管理ソリューションに関する情報発信やコミュニティ作りに携わる。過去には通信事業者でプラットフォームエンジニアを務めたのを皮切りに、いくつかの外資系企業でプロフェッショナルサービスやプリセールスエンジニアとしてクラウドネイティブやプラットフォーム製品に携わるなど、10年以上さまざまな形でプラットフォームに関与している。2023年11月より現職。一般社団法人クラウドネイティブイノベーターズ協会 代表理事。Platform Engineering Meetupオーガナイザー。"
};

// 経歴情報
export const careers = [
  {
    company: "PagerDuty", 
    position: "Product Evangelist", 
    period: "2023/11 - 現在"
  },
  {
    company: "一般社団法人クラウドネイティブイノベーターズ協会", 
    position: "代表理事", 
    period: "2023/6 - 現在"
  },
  {
    company: "ファインディ株式会社", 
    position: "技術アドバイザー", 
    period: "2025/3 - 現在"
  },
  {
    company: "HashiCorp", 
    position: "Senior Solutions Engineer", 
    period: "2021/9 - 2023/11"
  },
  {
    company: "PITTAN", 
    position: "技術顧問", 
    period: "2023/4 - 2024/2"
  },
  {
    company: "VMware", 
    position: "Senior Cloud Native Architect", 
    period: "2020/4 - 2021/9"
  },
  {
    company: "Pivotal", 
    position: "Senior Solutions Engineer", 
    period: "2017/3 - 2020/4"
  },
  {
    company: "NTT Communications", 
    position: "Tech Lead", 
    period: "2012/4 - 2017/3"
  },
  {
    company: "R&AC", 
    position: "Infrastructure Engineer", 
    period: "2008/2 - 2012/3"
  },
  {
    company: "日本デジタル研究所", 
    position: "Customer Engineer", 
    period: "2007/4 - 2008/2"
  }
];

export const communities = [
  { name: "Platform Engineering Kaigi", url: "https://www.cnia.io/pek2024/", activity: "2024年に始まったPlatform Engineeringのカンファレンス。Chairを務める" },
  { name: "Platform Engineering Meetup", url: "https://platformengineering.connpass.com/", activity: "日本初のPlatform Engineeringのコミュニティ。2023年3月よりアクティブに開催中" },
  { name: "CloudNative Days", url: "https://cloudnativedays.jp/", activity: "日本最大のクラウドネイティブ技術の祭典。2019年から2023年までCo-Chairを務めた" },
  { name: "EMTEC", url: "https://emtec.tv/", activity: "最強のライブ配信チーム。IT系カンファレンスやミートアップのライブ配信に特化しており、Directorを担当している" },
  { name: "PagerDuty Community", url: "https://pagerduty.connpass.com/event/318379/", activity: "PagerDutyのコミュニティ。ミートアップの開催を主導" },
  
];

// エクスポート - blog-entries.tsから取得したデータをそのまま使用
export { blogPosts, books, contributions };

// プレゼン情報のエクスポート
export const presentations = latestPresentations;
