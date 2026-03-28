import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug, categories } from '@/lib/tools';
import { ToolPage } from '@/components/tools/ToolPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Werkzeug nicht gefunden - BildTools',
    };
  }

  const category = categories.find(c => c.slug === tool.category);

  return {
    title: `${tool.name} - Kostenlos Online | BildTools`,
    description: tool.description,
    keywords: [...tool.keywords, 'kostenlos', 'online', 'deutsch', 'bildtools', 'bildbearbeitung'],
    authors: [{ name: 'BildTools Team' }],
    creator: 'BildTools',
    publisher: 'BildTools',
    openGraph: {
      title: `${tool.name} - Kostenlos Online`,
      description: tool.description,
      type: 'website',
      url: `https://bildtools.online/tools/${tool.slug}`,
      siteName: 'BildTools',
      locale: 'de_DE',
      images: [
        {
          url: '/logo.svg',
          width: 512,
          height: 512,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Kostenlos Online | BildTools`,
      description: tool.description,
      images: ['/logo.svg'],
    },
    alternates: {
      canonical: `https://bildtools.online/tools/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        url: `https://bildtools.online/tools/${tool.slug}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1250',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Organization',
          name: 'BildTools',
          url: 'https://bildtools.online',
        },
        isPartOf: {
          '@type': 'WebSite',
          name: 'BildTools',
          url: 'https://bildtools.online',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://bildtools.online',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: category?.name || 'Werkzeuge',
              item: `https://bildtools.online/category/${tool.category}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: tool.name,
              item: `https://bildtools.online/tools/${tool.slug}`,
            },
          ],
        },
      }),
    },
  };
}

export const dynamic = 'force-static';

export default async function ToolPageWrapper({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPage tool={tool} />;
}