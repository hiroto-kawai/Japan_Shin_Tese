import Link from 'next/link';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Layout from '../../components/Layout';
import { policyIssues, quadrants, getIssueQuadrant } from '../../data/issues';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
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

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  color: ${props => props.color || '#2c3e50'};
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.color || '#f0f0f0'};
  margin-bottom: 1.5rem;
`;

const PoliciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PolicyCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PolicyHeader = styled.div`
  background-color: ${props => props.color || '#3498db'};
  padding: 1.2rem;
  position: relative;
  min-height: 80px;
`;

const PolicyTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.3rem;
  padding-right: 90px; /* 右側のスタットのためのスペース確保 */
`;

const PolicyStats = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-end;
`;

const PolicyStat = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
`;

const PolicyContent = styled.div`
  padding: 1.5rem;
`;

const PolicyDescription = styled.div`
  color: #555;
  margin: 0 0 1.5rem;
  line-height: 1.5;
  
  p {
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const ViewDetailButton = styled(Link)`
  display: block;
  text-align: center;
  background-color: ${props => props.color || '#3498db'};
  color: white;
  padding: 0.8rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.hoverColor || '#2980b9'};
  }
`;

export default function PoliciesIndex() {
  // 政策を四象限ごとにグループ化
  const policyByQuadrants = Object.keys(quadrants).map(quadrantKey => {
    const quadrant = {
      id: quadrantKey,
      ...quadrants[quadrantKey]
    };
    
    const policies = policyIssues.filter(issue => {
      const issueQuadrant = getIssueQuadrant(issue.importance, issue.urgency);
      return issueQuadrant.id === quadrantKey;
    });
    
    // 重要度×緊急度でソート
    return {
      ...quadrant,
      policies: policies.sort((a, b) => (b.importance * b.urgency) - (a.importance * a.urgency))
    };
  });
  
  return (
    <Layout>
      <PageContainer>
        <PageTitle>政策別比較</PageTitle>
        <PageDescription>
          日本が直面する主要な政策課題について、各政党のアプローチや対応策を横断的に比較できます。
          重要度と緊急度に基づいてカテゴリー分けした政策から、気になるものを選んでください。
        </PageDescription>
        
        {policyByQuadrants.map(quadrant => (
          <CategorySection key={quadrant.id}>
            <CategoryTitle color={quadrant.color}>
              {quadrant.name} - {quadrant.description}
            </CategoryTitle>
            
            <PoliciesGrid>
              {quadrant.policies.map(policy => (
                <PolicyCard key={policy.id}>
                  <PolicyHeader color={quadrant.color}>
                    <PolicyTitle>{policy.name}</PolicyTitle>
                    <PolicyStats>
                      <PolicyStat>重要度: {policy.importance}</PolicyStat>
                      <PolicyStat>緊急度: {policy.urgency}</PolicyStat>
                    </PolicyStats>
                  </PolicyHeader>
                  
                  <PolicyContent>
                    <PolicyDescription>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {policy.description}
                      </ReactMarkdown>
                    </PolicyDescription>
                    
                    <ViewDetailButton 
                      href={`/policies/${policy.id}`}
                      color={quadrant.color}
                      hoverColor={quadrant.color === '#e74c3c' ? '#c0392b' : 
                                quadrant.color === '#f39c12' ? '#d35400' : 
                                quadrant.color === '#3498db' ? '#2980b9' : 
                                '#27ae60'}
                    >
                      各政党の政策を比較する
                    </ViewDetailButton>
                  </PolicyContent>
                </PolicyCard>
              ))}
            </PoliciesGrid>
          </CategorySection>
        ))}
      </PageContainer>
    </Layout>
  );
} 