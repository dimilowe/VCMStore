'use client';

import Link from 'next/link';
import { 
  ArrowRight,
  Zap,
  CheckCircle,
  AlertTriangle,
  Maximize,
  Image,
  Calculator,
  Heart,
  Activity,
  Scale,
  TrendingUp,
  Target,
  Footprints,
  Clock,
  FileImage,
  Video,
  Smartphone,
  Users,
  Building,
  Briefcase,
  Eye,
  Type,
  Palette,
  Music,
  Grid,
  Square,
  Crop,
  Instagram,
  Youtube,
  Linkedin,
  Twitter
} from 'lucide-react';
import { ArticleContent, ClusterTheme } from '@/lib/articleTypes';
import MoreFreeTools from '@/components/MoreFreeTools';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

const iconMap: Record<string, any> = {
  Zap, CheckCircle, AlertTriangle, Maximize, Image, Calculator, Heart, Activity,
  Scale, TrendingUp, Target, Footprints, Clock, FileImage, Video, Smartphone,
  Users, Building, Briefcase, Eye, Type, Palette, Music, Grid, Square, Crop,
  Instagram, Youtube, Linkedin, Twitter, ArrowRight
};

interface ArticleTemplateProps {
  article: {
    slug: string;
    title: string;
    cluster_slug: string;
    content: ArticleContent;
  };
  clusterName: string;
  clusterPath: string;
  theme: ClusterTheme;
}

export default function ArticleTemplate({ article, clusterName, clusterPath, theme }: ArticleTemplateProps) {
  const { content } = article;
  const HeroIcon = iconMap[content.hero.icon] || Image;
  const CtaIcon = iconMap[content.quickCTA.icon] || Zap;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={clusterPath} className="hover:text-orange-600">{clusterName}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{article.title.split(' – ')[0]}</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${content.hero.iconGradient} rounded-2xl mb-4 shadow-lg`}>
                <HeroIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {content.hero.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {content.hero.subtitle}
              </p>
            </div>

            <div className={`bg-gradient-to-r ${content.quickCTA.bgGradient} rounded-2xl p-6 ${content.quickCTA.borderColor} border mb-10`}>
              <div className="flex items-center gap-3 mb-3">
                <CtaIcon className={`w-6 h-6 ${content.quickCTA.iconColor}`} />
                <span className="font-semibold text-gray-900">{content.quickCTA.title}</span>
              </div>
              <p className="text-gray-700 mb-4">
                {content.quickCTA.description}
              </p>
              <Link 
                href={`/tools/${content.quickCTA.toolSlug}`}
                className={`inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${content.quickCTA.buttonGradient} hover:${content.quickCTA.buttonHoverGradient} text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg`}
              >
                {content.quickCTA.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {content.sections.map((section, idx) => {
              const SectionIcon = iconMap[section.icon] || CheckCircle;
              return (
                <section key={idx} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <SectionIcon className={`w-6 h-6 ${section.iconColor}`} />
                    {section.heading}
                  </h2>
                  
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: p }} />
                  ))}

                  {section.specs && section.specs.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Specifications</h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {section.specs.map((spec, sIdx) => {
                            const SpecIcon = iconMap[spec.icon] || CheckCircle;
                            return (
                              <div key={sIdx} className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${spec.iconColor} rounded-lg flex items-center justify-center`}>
                                  <SpecIcon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">{spec.label}</p>
                                  <p className="font-semibold text-gray-900">{spec.value}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.tips && section.tips.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {section.tips.map((tip, tIdx) => (
                        <div key={tIdx} className="bg-white rounded-xl p-5 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                          <p className="text-gray-700 text-sm">{tip.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.proTip && (
                    <div className={`bg-${theme.accentColor}-50 rounded-xl p-5 border border-${theme.accentColor}-200`}>
                      <p className="text-gray-700">
                        <strong>Pro tip:</strong> {section.proTip}
                      </p>
                    </div>
                  )}
                </section>
              );
            })}

            {content.faqs && content.faqs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {content.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white rounded-xl p-5 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.bottomCTA && (
              <div className={`bg-gradient-to-r ${content.quickCTA.bgGradient} rounded-2xl p-8 ${content.quickCTA.borderColor} border text-center mb-16`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{content.bottomCTA.heading}</h2>
                <p className="text-gray-700 mb-6">{content.bottomCTA.description}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link 
                    href={`/tools/${content.bottomCTA.primaryTool.slug}`}
                    className={`inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${content.quickCTA.buttonGradient} text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg`}
                  >
                    {content.bottomCTA.primaryTool.name}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {content.bottomCTA.secondaryTool && (
                    <Link 
                      href={`/tools/${content.bottomCTA.secondaryTool.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg border border-gray-200"
                    >
                      {content.bottomCTA.secondaryTool.name}
                    </Link>
                  )}
                </div>
              </div>
            )}

            <MoreFreeTools exclude={[`/tools/${content.quickCTA.toolSlug}`]} />
          </article>
        </div>
      </div>
      <MonetizationBar />
      <PostResultUpsell />
    </>
  );
}
