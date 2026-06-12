"use client";

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
}

export function AdSense({ slot, style, className }: AdSenseProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`flex items-center justify-center rounded-lg border border-dashed border-blue-500/30 bg-blue-500/5 p-4 ${className || ""}`} style={style}>
        <span className="text-xs text-blue-400">Anuncio AdSense ({slot})</span>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className || ""}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%", minHeight: "90px" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  );
}

export function AdSenseHorizontal() {
  return <AdSense slot="1234567890" style={{ width: "100%", height: "90px" }} />;
}

export function AdSenseSidebar() {
  return <AdSense slot="0987654321" style={{ width: "300px", height: "250px" }} />;
}

export function AdSenseInArticle() {
  return <AdSense slot="5678901234" style={{ width: "100%", height: "100px", margin: "16px 0" }} />;
}