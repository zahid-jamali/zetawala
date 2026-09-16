import React from 'react';
import PipelineWorkspace from '../../../../components/dashboard/PipelineWorkspace';

export const metadata = {
  title: "Free AI YouTube Description Generator | SEO Optimized - Zetawala",

  description:
    "Generate SEO-friendly YouTube video descriptions with AI in seconds. Create engaging, keyword-rich descriptions that improve rankings, boost CTR, and help your videos reach more viewers—for free with Zetawala.",

  keywords: [
    "YouTube Description Generator",
    "AI YouTube Description Generator",
    "Free YouTube Description Generator",
    "YouTube Description Writer",
    "YouTube SEO Description Generator",
    "AI Description Writer",
    "YouTube SEO",
    "YouTube Automation",
    "Video Description Generator",
    "SEO Description Generator",
    "Content Creator Tools",
    "YouTube AI Tools",
    "Free AI Tools",
    "Zetawala"
  ],

  alternates: {
    canonical: "https://www.zetawala.com/tools/youtube/youtube-description-generator",
  },

  openGraph: {
    title: "Free AI YouTube Description Generator | Zetawala",

    description:
      "Create professional, SEO-optimized YouTube descriptions using AI. Improve search rankings, increase visibility, and grow your channel with Zetawala.",

    url: "https://www.zetawala.com/tools/youtube/youtube-description-generator",

    type: "website",

    siteName: "Zetawala",

    images: [
      {
        url: "/og/youtube-description-generator.png",
        width: 1200,
        height: 630,
        alt: "AI YouTube Description Generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free AI YouTube Description Generator",

    description:
      "Generate engaging, SEO-friendly YouTube descriptions instantly using AI.",

    images: ["/og/youtube-description-generator.png"],
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function DescriptionBuilderPage() {
  return <PipelineWorkspace toolSlug="description-builder" categorySlug="youtube-automation" />;
}
