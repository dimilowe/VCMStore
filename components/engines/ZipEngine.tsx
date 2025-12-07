'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { 
  ArrowLeft, Upload, Download, FileArchive, Loader2, 
  AlertCircle, CheckCircle, ChevronDown, ChevronUp, X,
  File, Image, FileText, Film, Music, Code, Trash2, BookOpen
} from 'lucide-react';
import { ToolRecord } from '@/lib/toolsRepo';
import { ZipEngineConfig, getZipPresetBySlug } from '@/engines/zip/config';
import PostResultUpsell from '@/components/PostResultUpsell';
import CreatorStack from '@/components/CreatorStack';

interface ZipEngineProps {
  tool: ToolRecord;
}

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

interface FAQ {
  question: string;
  answer: string;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return Image;
  if (type.startsWith('video/')) return Film;
  if (type.startsWith('audio/')) return Music;
  if (type.startsWith('text/') || type.includes('document')) return FileText;
  if (type.includes('javascript') || type.includes('json') || type.includes('xml')) return Code;
  return File;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-1"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-1 text-gray-600 text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-xl border p-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

export default function ZipEngine({ tool }: ZipEngineProps) {
  const preset = getZipPresetBySlug(tool.slug);
  
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [zipName, setZipName] = useState(preset?.defaultZipName || 'archive');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const config: ZipEngineConfig = preset || {
    slug: tool.slug,
    title: tool.name,
    description: tool.description || 'Create ZIP archives from your files',
    maxFiles: 50,
    maxTotalSizeMB: 100,
    allowedMimeTypes: ['*/*'],
    defaultZipName: 'archive',
    ui: {
      heroHeading: 'Create ZIP Files',
      heroSubheading: 'Combine files into a ZIP archive',
      primaryCtaLabel: 'Download ZIP',
      dropzoneLabel: 'Drop files here or click to browse',
      secondaryNotes: []
    },
    seo: {
      title: `${tool.name} - VCM Suite`,
      metaDescription: tool.description || 'Create ZIP archives from your files',
      faq: []
    },
    relatedArticleSlugs: []
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const maxTotalBytes = config.maxTotalSizeMB * 1024 * 1024;

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    setError(null);
    setSuccess(false);
    
    const fileArray = Array.from(newFiles);
    const validFiles: FileItem[] = [];

    for (const file of fileArray) {
      if (files.length + validFiles.length >= config.maxFiles) {
        setError(`Maximum ${config.maxFiles} files allowed`);
        break;
      }

      const newTotalSize = totalSize + validFiles.reduce((s, f) => s + f.size, 0) + file.size;
      if (newTotalSize > maxTotalBytes) {
        setError(`Total size exceeds ${config.maxTotalSizeMB}MB limit`);
        break;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream'
      });
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  }, [files.length, totalSize, config.maxFiles, maxTotalBytes, config.maxTotalSizeMB]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setError(null);
  };

  const clearAll = () => {
    setFiles([]);
    setError(null);
    setSuccess(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      e.target.value = '';
    }
  };

  const createZip = async () => {
    if (files.length === 0) {
      setError('Add at least one file to create a ZIP');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const zip = new JSZip();
      
      for (const fileItem of files) {
        zip.file(fileItem.name, fileItem.file);
      }

      const blob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      const fileName = `${zipName.trim() || 'archive'}.zip`;
      saveAs(blob, fileName);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create ZIP file. Please try again.');
      console.error('ZIP creation error:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/tools" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Tools</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <FileArchive className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{config.ui.heroHeading}</h1>
              <p className="text-gray-600">{config.ui.heroSubheading}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
              transition-all duration-200
              ${isDragging 
                ? 'border-orange-500 bg-orange-50 scale-[1.02]' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium ${isDragging ? 'text-orange-600' : 'text-gray-700'}`}>
              {isDragging ? 'Drop your files here' : config.ui.dropzoneLabel}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Up to {config.maxFiles} files, {config.maxTotalSizeMB}MB total
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {files.length} file{files.length !== 1 ? 's' : ''} ({formatFileSize(totalSize)})
                </span>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {files.map((fileItem) => {
                  const IconComponent = getFileIcon(fileItem.type);
                  return (
                    <div
                      key={fileItem.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <IconComponent className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{fileItem.name}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatFileSize(fileItem.size)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(fileItem.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">ZIP file created and downloaded successfully!</span>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP file name
              </label>
              <input
                type="text"
                value={zipName}
                onChange={(e) => setZipName(e.target.value)}
                placeholder="archive"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={createZip}
                disabled={files.length === 0 || isCreating}
                className={`
                  px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
                  ${files.length === 0 || isCreating
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow'
                  }
                `}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    {config.ui.primaryCtaLabel}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {config.ui.secondaryNotes && config.ui.secondaryNotes.length > 0 && (
          <div className="bg-white rounded-xl border p-4 mb-6">
            <ul className="grid grid-cols-2 gap-2">
              {config.ui.secondaryNotes.map((note, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {config.ui.notes && config.ui.notes.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-orange-800 mb-2">Pro Tips:</h3>
            <ul className="space-y-1">
              {config.ui.notes.map((note, index) => (
                <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <CreatorStack />

        {config.seo.contentGuide && (
          <ContentGuide content={config.seo.contentGuide} />
        )}

        <PostResultUpsell />

        <RelatedArticles articleSlugs={config.relatedArticleSlugs} />

        {config.seo.faq && config.seo.faq.length > 0 && (
          <FAQSection faqs={config.seo.faq} />
        )}
      </div>
    </main>
  );
}

function ContentGuide({ content }: { content: string }) {
  const renderMarkdown = (text: string) => {
    const lines = text.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inBoldSection = false;
    let boldSectionTitle = '';
    let boldSectionItems: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-1 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatBold(item) }} />
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushBoldSection = () => {
      if (boldSectionTitle && boldSectionItems.length > 0) {
        elements.push(
          <div key={`bold-section-${elements.length}`} className="mb-4">
            <p className="font-semibold text-gray-800 mb-2">{boldSectionTitle}</p>
            <ul className="space-y-1 ml-4">
              {boldSectionItems.map((item, i) => (
                <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        boldSectionTitle = '';
        boldSectionItems = [];
        inBoldSection = false;
      }
    };

    const formatBold = (text: string) => {
      return text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-800">$1</strong>');
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('## ')) {
        flushList();
        flushBoldSection();
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushList();
        flushBoldSection();
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-semibold text-gray-800 mb-3 mt-5">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.match(/^\*\*[^*]+:\*\*$/)) {
        flushList();
        flushBoldSection();
        boldSectionTitle = trimmedLine.replace(/\*\*/g, '').replace(':', '');
        inBoldSection = true;
      } else if (trimmedLine.startsWith('- ')) {
        if (inBoldSection) {
          boldSectionItems.push(trimmedLine.replace('- ', ''));
        } else {
          currentList.push(trimmedLine.replace('- ', ''));
        }
      } else if (trimmedLine === '') {
        flushList();
        if (!inBoldSection) {
          flushBoldSection();
        }
      } else if (trimmedLine) {
        flushList();
        flushBoldSection();
        elements.push(
          <p key={`p-${index}`} className="text-gray-600 text-sm mb-4" dangerouslySetInnerHTML={{ __html: formatBold(trimmedLine) }} />
        );
      }
    });

    flushList();
    flushBoldSection();
    return elements;
  };

  return (
    <section className="mt-10 bg-white rounded-xl border p-6 md:p-8">
      <div className="prose prose-sm max-w-none">
        {renderMarkdown(content)}
      </div>
    </section>
  );
}

function RelatedArticles({ articleSlugs }: { articleSlugs: string[] }) {
  if (articleSlugs.length === 0) return null;

  const articles = articleSlugs.map(slug => ({
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }));

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-orange-500" />
        Related Guides
      </h2>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/mbb/${article.slug}`}
            className="block p-4 bg-white border rounded-lg hover:border-orange-300 hover:shadow-sm transition-all group"
          >
            <span className="font-medium text-gray-800 group-hover:text-orange-700">
              {article.title}
            </span>
            <span className="block text-xs text-gray-400 mt-1">Read guide →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
