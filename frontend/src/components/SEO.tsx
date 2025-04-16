import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  noIndex?: boolean;
  ogImage?: string;
}

const SEO = ({
  title = "企業健康度チェッカー | 財務状況を分析",
  description = "企業の財務健全性を簡単にチェック。証券番号や企業名で検索し、収益性、安定性、成長性を確認できる企業健康度分析ツール。",
  keywords = "企業健康度, 財務分析, 収益性分析, 企業評価, 証券分析",
  noIndex = false,
  ogImage = "/og-image.png",
}: SEOProps) => {
  const fullTitle = title.includes("企業健康度チェッカー")
    ? title
    : `${title} | 企業健康度チェッカー`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
