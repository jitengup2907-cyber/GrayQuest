import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Clock, Calendar, Bookmark, Share2, ArrowRight, CheckCircle2, 
  Sparkles, Check, BookOpen, Quote, ChevronRight, ThumbsUp, MessageSquare
} from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckEligibility?: () => void;
  onSelectArticle?: (article: Article) => void;
  relatedArticles?: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onCheckEligibility,
  onSelectArticle,
  relatedArticles = []
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(48);
  const [hasLiked, setHasLiked] = useState(false);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 my-4 border border-brand-border flex flex-col max-h-[92vh]"
      >
        {/* Sticky Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-brand-border flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold">
              {article.category}
            </span>
            <span className="text-12 text-brand-muted hidden sm:inline">
              • {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLike}
              className={`p-2 rounded-full border transition-colors flex items-center gap-1 text-12 font-semibold cursor-pointer ${
                hasLiked 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-white text-brand-muted hover:text-brand-navy border-brand-border'
              }`}
              title="Helpful article"
            >
              <ThumbsUp size={16} className={hasLiked ? 'fill-current' : ''} />
              <span>{likesCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-amber-50 text-amber-600 border-amber-200' 
                  : 'bg-white text-brand-muted hover:text-brand-navy border-brand-border'
              }`}
              title="Bookmark article"
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full bg-white text-brand-muted hover:text-brand-navy border border-brand-border transition-colors cursor-pointer relative"
              title="Share article link"
            >
              {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-brand-navy text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-brand-navy transition-colors cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Article Title */}
          <div>
            <h1 className="text-24 md:text-32 font-bold text-brand-navy leading-tight">
              {article.title}
            </h1>
            <p className="text-15 md:text-17 text-brand-muted mt-3 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Author & Meta Row */}
          <div className="flex items-center justify-between gap-4 py-4 border-y border-brand-border/60">
            <div className="flex items-center gap-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border border-brand-border"
              />
              <div>
                <h4 className="text-14 font-bold text-brand-navy leading-none">
                  {article.author.name}
                </h4>
                <p className="text-12 text-brand-muted mt-1">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="text-right text-12 text-brand-muted space-y-0.5">
              <div className="flex items-center gap-1.5 justify-end">
                <Calendar size={13} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Clock size={13} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Banner Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-brand-border max-h-[380px]">
            <img 
              src={article.image} 
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-brand-surface border border-brand-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-14">
                <Sparkles size={18} />
                <span>Key Executive Takeaways</span>
              </div>
              <ul className="space-y-2 text-13 text-brand-navy">
                {article.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Sections */}
          <div className="space-y-6 text-15 text-brand-navy/90 leading-relaxed font-normal">
            {article.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-18 md:text-20 font-bold text-brand-navy">
                  {sec.heading}
                </h3>
                <p className="text-15 leading-relaxed text-brand-navy/85">
                  {sec.body}
                </p>

                {sec.quote && (
                  <div className="my-4 p-4 rounded-xl bg-brand-blue/5 border-l-4 border-brand-blue flex items-start gap-3">
                    <Quote size={22} className="text-brand-blue shrink-0 mt-0.5 rotate-180 opacity-60" />
                    <p className="text-14 font-semibold italic text-brand-navy leading-relaxed">
                      "{sec.quote}"
                    </p>
                  </div>
                )}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-2 text-14">
                    {sec.bulletPoints.map((pt, pidx) => (
                      <li key={pidx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-border">
            <span className="text-12 font-bold text-brand-muted self-center mr-1">Tags:</span>
            {article.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-11 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Embedded Fee Plan CTA Box */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10 max-w-lg space-y-3">
              <span className="px-2.5 py-0.5 bg-brand-green/20 text-brand-green border border-brand-green/30 rounded text-10 font-bold uppercase tracking-wider">
                0% Interest Fee Plans
              </span>
              <h3 className="text-20 font-bold text-white">
                Ready to split your child's school fees into monthly installments?
              </h3>
              <p className="text-13 text-white/70">
                Check your eligibility and estimated zero-interest EMI in 30 seconds with 0 score impact.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onCheckEligibility) onCheckEligibility();
                }}
                className="px-6 py-3 bg-brand-green text-white rounded-xl font-bold text-14 hover:bg-brand-green/90 transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Check My Fee Plan & Eligibility</span>
                <ArrowRight size={16} />
              </button>
            </div>
            {/* Background glowing circles */}
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand-blue/20 rounded-full blur-2xl" />
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-brand-border space-y-4">
              <h4 className="text-16 font-bold text-brand-navy">Recommended Articles for You</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(rel);
                    }}
                    className="text-left p-3.5 rounded-xl border border-brand-border hover:border-brand-blue hover:bg-brand-surface transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <img 
                      src={rel.image} 
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-brand-blue uppercase">{rel.category}</span>
                      <h5 className="text-13 font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                      <span className="text-[11px] text-brand-muted mt-1 block">{rel.readTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
