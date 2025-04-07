import { useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import { glossaryTerms, glossaryCategories } from '../data/glossary';

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const PageDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const CategoryButton = styled.button`
  background-color: ${props => props.active ? props.color : 'white'};
  color: ${props => props.active ? 'white' : props.color};
  border: 2px solid ${props => props.color};
  padding: 0.4rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? props.color : `${props.color}22`};
  }
`;

const TermsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TermCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const TermHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${props => props.color || '#f8f9fa'};
  color: white;
  cursor: pointer;
`;

const TermTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  flex-grow: 1;
`;

const CategoryBadge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-left: 1rem;
`;

const TermContent = styled.div`
  padding: ${props => props.isOpen ? '1.5rem' : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

const TermDescription = styled.p`
  margin: 0 0 1rem;
  color: #555;
  line-height: 1.6;
`;

const RelatedTerms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const RelatedTerm = styled.span`
  background-color: #f1f1f1;
  color: #555;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #777;
`;

export default function Glossary() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openTerms, setOpenTerms] = useState({});
  
  const toggleTerm = (termId) => {
    setOpenTerms(prev => ({
      ...prev,
      [termId]: !prev[termId]
    }));
  };
  
  const handleRelatedTermClick = (termId) => {
    // 関連用語をクリックしたら、その用語を開く
    setOpenTerms(prev => ({
      ...prev,
      [termId]: true
    }));
    
    // 該当の要素までスクロール
    const element = document.getElementById(termId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  // フィルタリングとソート
  const filteredTerms = glossaryTerms.filter(term => {
    // カテゴリーフィルター
    const categoryMatch = activeCategory === 'all' || term.category === activeCategory;
    
    // 検索クエリフィルター
    const searchLower = searchQuery.toLowerCase();
    const termMatch = term.term.toLowerCase().includes(searchLower);
    const descriptionMatch = term.description.toLowerCase().includes(searchLower);
    const searchMatch = !searchQuery || termMatch || descriptionMatch;
    
    return categoryMatch && searchMatch;
  }).sort((a, b) => a.term.localeCompare(b.term, 'ja'));
  
  return (
    <Layout>
      <PageTitle>政治・経済用語集</PageTitle>
      <PageDescription>
        政治や経済に関する重要な用語を解説しています。
        カテゴリー別に閲覧したり、検索したりすることができます。
      </PageDescription>
      
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="用語を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      <CategoryFilter>
        <CategoryButton 
          active={activeCategory === 'all'} 
          color="#7f8c8d"
          onClick={() => setActiveCategory('all')}
        >
          すべて
        </CategoryButton>
        
        {glossaryCategories.map(category => (
          <CategoryButton 
            key={category.id}
            active={activeCategory === category.id}
            color={category.color}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      <TermsContainer>
        {filteredTerms.length > 0 ? (
          filteredTerms.map(term => {
            const category = glossaryCategories.find(cat => cat.id === term.category);
            const isOpen = openTerms[term.id] || false;
            
            return (
              <TermCard key={term.id} id={term.id}>
                <TermHeader 
                  color={category?.color} 
                  onClick={() => toggleTerm(term.id)}
                >
                  <TermTitle>{term.term}</TermTitle>
                  <CategoryBadge>{category?.name}</CategoryBadge>
                  <span>{isOpen ? '▲' : '▼'}</span>
                </TermHeader>
                
                <TermContent isOpen={isOpen}>
                  <TermDescription>{term.description}</TermDescription>
                  
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <>
                      <h4>関連用語</h4>
                      <RelatedTerms>
                        {term.relatedTerms.map(relatedId => {
                          const relatedTerm = glossaryTerms.find(t => t.id === relatedId);
                          if (!relatedTerm) return null;
                          
                          return (
                            <RelatedTerm 
                              key={relatedId}
                              onClick={() => handleRelatedTermClick(relatedId)}
                            >
                              {relatedTerm.term}
                            </RelatedTerm>
                          );
                        })}
                      </RelatedTerms>
                    </>
                  )}
                </TermContent>
              </TermCard>
            );
          })
        ) : (
          <NoResults>
            <h3>検索結果がありません</h3>
            <p>別のキーワードまたはカテゴリーで検索してください。</p>
          </NoResults>
        )}
      </TermsContainer>
    </Layout>
  );
} 