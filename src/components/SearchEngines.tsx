import React from 'react';

interface SearchEnginesProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

export const SearchEngines: React.FC<SearchEnginesProps> = ({
  selectedEngine,
  onEngineChange
}) => {
  const engines = [
    // General Search
    { id: 'google', name: 'Google', category: 'General' },
    { id: 'bing', name: 'Bing', category: 'General' },
    { id: 'startpage', name: 'Startpage', category: 'General' },
    { id: 'searx', name: 'SearX', category: 'General' },
    
    // Major Bioinformatics Databases
    { id: 'ncbi', name: 'NCBI', category: 'Databases' },
    { id: 'pubmed', name: 'PubMed', category: 'Databases' },
    { id: 'ddbj', name: 'DDBJ', category: 'Databases' },
    { id: 'uniprot', name: 'UniProt', category: 'Databases' },
    { id: 'pdb', name: 'Protein Data Bank', category: 'Databases' },
    { id: 'kegg', name: 'KEGG', category: 'Databases' },
    { id: 'ensembl', name: 'Ensembl', category: 'Databases' },
    { id: 'genbank', name: 'GenBank', category: 'Databases' },
    { id: 'embl', name: 'EMBL-EBI', category: 'Databases' },
    
    // Protein & Domain Databases
    { id: 'pfam', name: 'Pfam', category: 'Proteins' },
    { id: 'interpro', name: 'InterPro', category: 'Proteins' },
    { id: 'string', name: 'STRING', category: 'Proteins' },
    
    // Functional Annotation
    { id: 'go', name: 'Gene Ontology', category: 'Annotation' },
    { id: 'reactome', name: 'Reactome', category: 'Annotation' },
    { id: 'biocyc', name: 'BioCyc', category: 'Annotation' },
    { id: 'david', name: 'DAVID', category: 'Annotation' },
    
    // Analysis Tools
    { id: 'blast', name: 'BLAST', category: 'Tools' },
    { id: 'clustal', name: 'Clustal Omega', category: 'Tools' },
    { id: 'phylogeny', name: 'Phylogeny.fr', category: 'Tools' },
    
    // Medical & Clinical
    { id: 'omim', name: 'OMIM', category: 'Medical' },
    { id: 'clinvar', name: 'ClinVar', category: 'Medical' },
    { id: 'gwas', name: 'GWAS Catalog', category: 'Medical' },
    { id: 'cosmic', name: 'COSMIC', category: 'Medical' },
    { id: 'disgenet', name: 'DisGeNET', category: 'Medical' },
    { id: 'hpo', name: 'Human Phenotype Ontology', category: 'Medical' },
    { id: 'mondo', name: 'Monarch Initiative', category: 'Medical' },
    
    // Genomics Projects
    { id: 'tcga', name: 'TCGA', category: 'Genomics' },
    { id: 'gtex', name: 'GTEx', category: 'Genomics' },
    { id: 'encode', name: 'ENCODE', category: 'Genomics' },
    { id: 'roadmap', name: 'Roadmap Epigenomics', category: 'Genomics' },
    
    // Educational Resources
    { id: 'wikipedia', name: 'Wikipedia', category: 'Education' },
    { id: 'w3schools', name: 'W3Schools', category: 'Education' },
    { id: 'mdn', name: 'MDN Web Docs', category: 'Education' },
    { id: 'coursera', name: 'Coursera', category: 'Education' },
    { id: 'edx', name: 'edX', category: 'Education' },
    { id: 'khanacademy', name: 'Khan Academy', category: 'Education' },
    { id: 'youtube', name: 'YouTube', category: 'Education' },
    
    // Academic & Research
    { id: 'scholar', name: 'Google Scholar', category: 'Academic' },
    { id: 'arxiv', name: 'arXiv', category: 'Academic' },
    { id: 'biorxiv', name: 'bioRxiv', category: 'Academic' },
    { id: 'nature', name: 'Nature', category: 'Academic' },
    { id: 'science', name: 'Science', category: 'Academic' },
    { id: 'cell', name: 'Cell', category: 'Academic' },
    { id: 'plos', name: 'PLOS ONE', category: 'Academic' },
    { id: 'researchgate', name: 'ResearchGate', category: 'Academic' },
    { id: 'mendeley', name: 'Mendeley', category: 'Academic' },
    { id: 'zotero', name: 'Zotero', category: 'Academic' },
    
    // Development
    { id: 'stackoverflow', name: 'Stack Overflow', category: 'Development' },
    { id: 'github', name: 'GitHub', category: 'Development' }
  ];

  const categories = [...new Set(engines.map(e => e.category))];

  return (
    <div className="search-engines">
      <select 
        value={selectedEngine} 
        onChange={(e) => onEngineChange(e.target.value)}
        className="engine-select"
      >
        {categories.map(category => (
          <optgroup key={category} label={category}>
            {engines
              .filter(engine => engine.category === category)
              .map(engine => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))
            }
          </optgroup>
        ))}
      </select>
    </div>
  );
};