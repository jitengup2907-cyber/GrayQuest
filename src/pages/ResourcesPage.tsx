import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, Bookmark, 
  Sparkles, Download, FileText, Share2, Check, Filter, 
  ExternalLink, ChevronRight, GraduationCap, TrendingUp, ShieldCheck,
  X, CheckCircle2 
} from 'lucide-react';
import { ARTICLES, Article, RESOURCE_GUIDES } from '../data/articles';
import { ArticleModal } from '../components/ArticleModal';

interface ResourcesPageProps {
  onCheckEligibility?: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onCheckEligibility }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [downloadModalGuide, setDownloadModalGuide] = useState<any | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = [
    'All',
    'Financial Planning',
    'Fintech & Credit',
    'Admissions & Boards',
    'Higher Education',
    'Parenting & Tech'
  ];

  // Featured article (first featured or first in list)
  const featuredArticle = useMemo(() => {
    return ARTICLES.find(a => a.featured) || ARTICLES[0];
  }, []);

  // Filtered articles based on search & category
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q)) ||
        art.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadModalGuide(null);
    }, 2400);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setUserEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-20">
      {/* Header Banner */}
      <div className="bg-brand-navy text-white pt-14 pb-20 relative overflow-hidden">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/20 text-brand-blue-light border border-brand-blue/30 rounded-full text-12 font-bold mb-4">
              <Sparkles size={14} />
              <span>GrayQuest Knowledge Hub & Editorial</span>
            </div>
            <h1 className="text-36 md:text-50 font-black tracking-tight text-white leading-tight">
              Parent Insights & Education Finance Guides
            </h1>
            <p className="text-16 md:text-18 text-white/70 mt-3 leading-relaxed">
              Explore in-depth articles, board comparisons, financial worksheets, and credit guides designed to empower your family's educational journey.
            </p>
          </div>

          {/* Real-time Search Box */}
          <div className="mt-8 max-w-3xl bg-white p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-brand-border">
            <div className="pl-3 text-brand-muted">
              <Search size={20} />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, 0% EMI rules, boards (CBSE/IB), CIBIL scores..."
              className="flex-1 py-2 text-14 md:text-15 text-brand-navy placeholder:text-brand-muted focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-12 text-brand-muted hover:text-brand-navy font-semibold px-2 py-1"
              >
                Clear
              </button>
            )}
            <button 
              type="button"
              className="px-5 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-14 hover:bg-brand-blue/90 transition-all shrink-0 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -mb-20 pointer-events-none" />
      </div>

      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 -mt-8 relative z-20">
        {/* Category Pills Header */}
        <div className="bg-white p-3 rounded-2xl shadow-md border border-brand-border flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 text-12 font-bold text-brand-muted pl-2 pr-3 border-r border-brand-border shrink-0">
            <Filter size={15} />
            <span>Topics:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-13 font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-xs font-bold'
                  : 'bg-brand-surface text-brand-navy/70 hover:bg-brand-surface-2 hover:text-brand-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED EDITORIAL HERO (Visible when no specific query filters it out) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-white rounded-3xl p-6 md:p-8 border border-brand-border shadow-md hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-11 font-black uppercase tracking-wider">
                    ★ Spotlight Editorial
                  </span>
                  <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold">
                    {featuredArticle.category}
                  </span>
                  <span className="text-12 text-brand-muted">• {featuredArticle.readTime}</span>
                </div>

                <h2 
                  onClick={() => handleOpenArticle(featuredArticle)}
                  className="text-24 md:text-34 font-bold text-brand-navy leading-tight group-hover:text-brand-blue transition-colors cursor-pointer"
                >
                  {featuredArticle.title}
                </h2>

                <p className="text-14 md:text-16 text-brand-muted leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredArticle.author.avatar} 
                      alt={featuredArticle.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-brand-border"
                    />
                    <div>
                      <h4 className="text-13 font-bold text-brand-navy">{featuredArticle.author.name}</h4>
                      <p className="text-11 text-brand-muted">{featuredArticle.author.role}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenArticle(featuredArticle)}
                    className="px-6 py-2.5 bg-brand-navy text-white rounded-xl font-bold text-13 hover:bg-brand-blue transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Banner Image */}
              <div 
                onClick={() => handleOpenArticle(featuredArticle)}
                className="lg:col-span-5 h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer relative shadow-inner"
              >
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                    Click to Open Interactive Reader
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MAIN ARTICLES GRID */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-22 md:text-26 font-bold text-brand-navy">
                {selectedCategory === 'All' ? 'Latest Publications & Guides' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-13 text-brand-muted">
                Showing {filteredArticles.length} curated educational resources
              </p>
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => {
                const isBookmarked = bookmarkedIds.includes(article.id);
                return (
                  <motion.article 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOpenArticle(article)}
                    className="bg-white rounded-2xl border border-brand-border hover:border-brand-blue/60 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-11 font-bold bg-white/90 backdrop-blur-md text-brand-navy shadow-xs border border-white/50">
                          {article.category}
                        </span>
                      </div>
                      
                      {/* Bookmark button */}
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                          isBookmarked 
                            ? 'bg-amber-500 text-white shadow-md' 
                            : 'bg-black/30 hover:bg-black/50 text-white'
                        }`}
                        title="Bookmark article"
                      >
                        <Bookmark size={15} className={isBookmarked ? 'fill-current' : ''} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-11 text-brand-muted font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {article.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-17 font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-13 text-brand-muted line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      {/* Author & Read Action Footer */}
                      <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={article.author.avatar} 
                            alt={article.author.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover border border-brand-border"
                          />
                          <span className="text-12 font-semibold text-brand-navy truncate max-w-[120px]">
                            {article.author.name}
                          </span>
                        </div>

                        <span className="text-12 font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Read Article</span>
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-brand-border max-w-lg mx-auto space-y-4">
              <BookOpen size={36} className="mx-auto text-brand-muted" />
              <h3 className="text-18 font-bold text-brand-navy">No articles matching your search</h3>
              <p className="text-13 text-brand-muted">
                Try searching for broader terms like "fees", "CIBIL", "ICSE", or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-13 hover:bg-brand-blue/90 transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* DOWNLOADABLE TOOLKITS & PDF GUIDES */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-full text-12 font-bold mb-2">
              <Download size={14} />
              <span>Free Downloadable Parent Toolkits</span>
            </div>
            <h2 className="text-28 md:text-34 font-bold text-brand-navy">
              Download Practical Financial & Admission Worksheets
            </h2>
            <p className="text-14 text-brand-muted mt-2">
              Comprehensive PDF roadmaps to help you calculate annual cash flows, navigate board admissions, and optimize education taxes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCE_GUIDES.map((guide) => (
              <div 
                key={guide.id}
                className="bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-blue shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-32">{guide.icon}</span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-11 font-bold">
                      {guide.badge}
                    </span>
                  </div>

                  <h3 className="text-17 font-bold text-brand-navy leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-13 text-brand-muted leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                  <div className="text-11 text-brand-muted space-x-2">
                    <span className="font-semibold">{guide.pages}</span>
                    <span>•</span>
                    <span>{guide.downloads}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDownloadModalGuide(guide)}
                    className="px-4 py-2 bg-brand-blue/10 hover:bg-brand-blue hover:text-white text-brand-blue rounded-lg font-bold text-12 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER CTA BOX */}
        <div className="mt-20 bg-brand-navy rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-brand-navy shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3 py-1 bg-brand-blue/20 text-brand-blue-light border border-brand-blue/30 rounded-full text-11 font-bold">
              Stay Informed
            </span>
            <h2 className="text-28 md:text-36 font-bold text-white">
              Get the Monthly Parent Education & Finance Digest
            </h2>
            <p className="text-14 md:text-16 text-white/70 leading-relaxed">
              Curated tips on school fee budgeting, tax savings under Section 80C, and school board updates delivered directly to your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-brand-green/20 border border-brand-green/40 rounded-2xl text-white flex items-center justify-center gap-2 max-w-md mx-auto">
                <Check size={20} className="text-brand-green" />
                <span className="font-bold text-14">Thank you! You have successfully subscribed to the digest.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <input 
                  type="email" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email address..." 
                  className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-blue transition-colors text-14"
                  required
                />
                <button 
                  type="submit"
                  className="px-7 py-3 bg-brand-green text-white rounded-xl font-bold text-14 hover:bg-brand-green/90 transition-all shadow-md cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-white/40 pt-1">
              Zero spam. Unsubscribe with a single click at any time.
            </p>
          </div>

          {/* Decorative glowing backdrops */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onCheckEligibility={onCheckEligibility}
        onSelectArticle={(art) => setSelectedArticle(art)}
        relatedArticles={ARTICLES.filter(a => a.id !== selectedArticle?.id).slice(0, 2)}
      />

      {/* DOWNLOAD GUIDE MODAL */}
      {downloadModalGuide && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-brand-border space-y-4 relative"
          >
            <button
              onClick={() => setDownloadModalGuide(null)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-navy p-1 rounded-full hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2">
              <span className="text-40 block">{downloadModalGuide.icon}</span>
              <h3 className="text-18 font-bold text-brand-navy">
                Download {downloadModalGuide.title}
              </h3>
              <p className="text-12 text-brand-muted">
                {downloadModalGuide.pages} • Instant PDF Download
              </p>
            </div>

            {downloadSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <p className="text-14 font-bold text-emerald-900">Download Starting!</p>
                <p className="text-12 text-emerald-700">Your complimentary guide has been dispatched.</p>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-12 font-bold text-brand-navy mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 border border-brand-border rounded-lg text-13 focus:border-brand-blue outline-none"
                  />
                </div>
                <div>
                  <label className="block text-12 font-bold text-brand-navy mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 border border-brand-border rounded-lg text-13 focus:border-brand-blue outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold text-14 hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download size={16} />
                  <span>Get Free PDF Guide</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
