import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchEngines } from './components/SearchEngines';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FloatingControls } from './components/FloatingControls';
import { BlockedOverlay } from './components/BlockedOverlay';
import './App.css';

interface HistoryEntry {
  url: string;
  title: string;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('google');
  const [isLoading, setIsLoading] = useState(false);
  const [showBlockedOverlay, setShowBlockedOverlay] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFloatingControls, setShowFloatingControls] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        exitFullscreen();
      }
      if (e.key === 'ArrowLeft' && isFullscreen) {
        goBack();
      }
      if (e.key === 'ArrowRight' && isFullscreen) {
        goForward();
      }
      if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
        setIsDarkMode(!isDarkMode);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    const handleMouseMove = () => {
      if (isFullscreen) {
        showControls();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode, isFullscreen]);

  const showControls = () => {
    setShowFloatingControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowFloatingControls(false);
    }, 3000);
  };

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      showControls();
    } catch (error) {
      console.log('Fullscreen not supported');
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
      setShowFloatingControls(false);
    } catch (error) {
      console.log('Exit fullscreen failed');
    }
  };

  const buildSearchUrl = (engine: string, query: string): string => {
    const engines: Record<string, string> = {
      google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
      startpage: `https://www.startpage.com/sp/search?query=${encodeURIComponent(query)}`,
      searx: `https://searx.org/search?q=${encodeURIComponent(query)}`,
      ncbi: `https://www.ncbi.nlm.nih.gov/search/all/?term=${encodeURIComponent(query)}`,
      pubmed: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`,
      ddbj: `https://www.ddbj.nig.ac.jp/search?query=${encodeURIComponent(query)}`,
      uniprot: `https://www.uniprot.org/uniprot/?query=${encodeURIComponent(query)}`,
      pdb: `https://www.rcsb.org/search?request=%7B%22query%22%3A%7B%22type%22%3A%22terminal%22%2C%22service%22%3A%22text%22%2C%22parameters%22%3A%7B%22value%22%3A%22${encodeURIComponent(query)}%22%7D%7D%7D`,
      kegg: `https://www.genome.jp/kegg/kegg2.html?query=${encodeURIComponent(query)}`,
      ensembl: `https://www.ensembl.org/Multi/Search/Results?q=${encodeURIComponent(query)}`,
      genbank: `https://www.ncbi.nlm.nih.gov/genbank/?term=${encodeURIComponent(query)}`,
      embl: `https://www.ebi.ac.uk/ena/browser/text-search?query=${encodeURIComponent(query)}`,
      pfam: `https://pfam.xfam.org/search/keyword?query=${encodeURIComponent(query)}`,
      interpro: `https://www.ebi.ac.uk/interpro/search/text/${encodeURIComponent(query)}`,
      go: `http://amigo.geneontology.org/amigo/search/annotation?q=${encodeURIComponent(query)}`,
      reactome: `https://reactome.org/content/query?q=${encodeURIComponent(query)}`,
      biocyc: `https://biocyc.org/substring-search?type=NIL&object=${encodeURIComponent(query)}`,
      string: `https://string-db.org/cgi/input.pl?input_query_species=9606&input_query=${encodeURIComponent(query)}`,
      david: `https://david.ncifcrf.gov/search.jsp?search=${encodeURIComponent(query)}`,
      blast: `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PROGRAM=blastn&PAGE_TYPE=BlastSearch&QUERY=${encodeURIComponent(query)}`,
      clustal: `https://www.ebi.ac.uk/Tools/msa/clustalo/`,
      phylogeny: `http://www.phylogeny.fr/simple_phylogeny.cgi`,
      wikipedia: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`,
      w3schools: `https://www.w3schools.com/search/search_asp.asp?search=${encodeURIComponent(query)}`,
      mdn: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(query)}`,
      stackoverflow: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`,
      github: `https://github.com/search?q=${encodeURIComponent(query)}`,
      arxiv: `https://arxiv.org/search/?query=${encodeURIComponent(query)}`,
      biorxiv: `https://www.biorxiv.org/search/${encodeURIComponent(query)}`,
      nature: `https://www.nature.com/search?q=${encodeURIComponent(query)}`,
      science: `https://www.science.org/action/doSearch?AllField=${encodeURIComponent(query)}`,
      cell: `https://www.cell.com/action/doSearch?AllField=${encodeURIComponent(query)}`,
      plos: `https://journals.plos.org/plosone/search?q=${encodeURIComponent(query)}`,
      coursera: `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
      edx: `https://www.edx.org/search?q=${encodeURIComponent(query)}`,
      khanacademy: `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(query)}`,
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      scholar: `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`,
      researchgate: `https://www.researchgate.net/search?q=${encodeURIComponent(query)}`,
      mendeley: `https://www.mendeley.com/search/?query=${encodeURIComponent(query)}`,
      zotero: `https://www.zotero.org/search/?q=${encodeURIComponent(query)}`,
      omim: `https://www.omim.org/search?index=entry&start=1&search=${encodeURIComponent(query)}`,
      clinvar: `https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(query)}`,
      gwas: `https://www.ebi.ac.uk/gwas/search?query=${encodeURIComponent(query)}`,
      tcga: `https://portal.gdc.cancer.gov/search/s?filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22${encodeURIComponent(query)}%22%5D%7D%7D%5D%7D`,
      gtex: `https://gtexportal.org/home/search?searchText=${encodeURIComponent(query)}`,
      encode: `https://www.encodeproject.org/search/?searchTerm=${encodeURIComponent(query)}`,
      roadmap: `http://www.roadmapepigenomics.org/data/`,
      cosmic: `https://cancer.sanger.ac.uk/cosmic/search?q=${encodeURIComponent(query)}`,
      disgenet: `https://www.disgenet.org/search?q=${encodeURIComponent(query)}`,
      hpo: `https://hpo.jax.org/app/browse/search?q=${encodeURIComponent(query)}`,
      mondo: `https://monarchinitiative.org/search/${encodeURIComponent(query)}`
    };

    return engines[engine] || engines.google;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const url = buildSearchUrl(selectedEngine, searchQuery);
    setCurrentUrl(url);
    setIsLoading(true);

    // Add to history
    const newEntry: HistoryEntry = {
      url,
      title: `${searchQuery} - ${selectedEngine}`
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newEntry);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Enter fullscreen automatically
    if (!document.fullscreenElement) {
      await enterFullscreen();
    }

    // Load in iframe
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Check if iframe is blocked
    try {
      if (iframeRef.current?.contentDocument === null && currentUrl) {
        setShowBlockedOverlay(true);
      }
    } catch (error) {
      // Cross-origin, which is fine
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const entry = history[newIndex];
      setCurrentUrl(entry.url);
      if (iframeRef.current) {
        iframeRef.current.src = entry.url;
      }
      setIsLoading(true);
      showControls();
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const entry = history[newIndex];
      setCurrentUrl(entry.url);
      if (iframeRef.current) {
        iframeRef.current.src = entry.url;
      }
      setIsLoading(true);
      showControls();
    }
  };

  const openInNewTab = () => {
    if (currentUrl) {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className={`background ${showBackground ? 'visible' : 'hidden'}`} />
      
      <div className="app-container">
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleBackground={() => setShowBackground(!showBackground)}
          onToggleFullscreen={isFullscreen ? exitFullscreen : enterFullscreen}
          isFullscreen={isFullscreen}
        />

        <div className="search-section">
          <SearchEngines
            selectedEngine={selectedEngine}
            onEngineChange={setSelectedEngine}
          />
          
          <div className="search-bar">
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search bioinformatics resources..."
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
            <button onClick={openInNewTab} className="external-button" disabled={!currentUrl}>
              Open ↗
            </button>
          </div>
        </div>

        <div className="iframe-container">
          {isLoading && <LoadingSpinner />}
          <iframe
            ref={iframeRef}
            className="search-iframe"
            onLoad={handleIframeLoad}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
            allowFullScreen
          />
        </div>

        <footer className="footer">
          © {new Date().getFullYear()} Bioinformatics.Sync - Distraction-free search for bioinformatics
        </footer>
      </div>

      {isFullscreen && (
        <FloatingControls
          visible={showFloatingControls}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onBack={goBack}
          onForward={goForward}
          onExit={exitFullscreen}
          onOpenExternal={openInNewTab}
        />
      )}

      <BlockedOverlay
        visible={showBlockedOverlay}
        onOpenExternal={openInNewTab}
        onClose={() => setShowBlockedOverlay(false)}
      />
    </div>
  );
}