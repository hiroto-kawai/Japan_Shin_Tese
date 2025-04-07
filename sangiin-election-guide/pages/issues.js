import { useState } from 'react';
import styled from '@emotion/styled';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Layout from '../components/Layout';
import { policyIssues, matrixCoordinates, quadrants, getIssueQuadrant, policyEvaluationPrinciples } from '../data/issues';
import { partyPolicyScores } from '../data/party-policy-scores';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import dynamic from 'next/dynamic';

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

const ChartContainer = styled.div`
  margin: 3rem 0;
  height: 500px;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const QuadrantLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const QuadrantBox = styled.div`
  background-color: ${props => props.color};
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuadrantTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const QuadrantDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const IssuesList = styled.div`
  margin-top: 4rem;
`;

const IssueCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${props => props.color || '#3498db'};
  }
`;

const IssueHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IssueTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
  flex: 1;
  min-width: 200px;
  padding-right: 1rem;
`;

const IssueRatings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const IssueRating = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.color || '#f8f9fa'};
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.textColor || '#333'};
  white-space: nowrap;
  margin-bottom: 0.3rem;
  line-height: 1.2;
  height: auto;
`;

const IssueDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.6;
`;

const IssueDetails = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  h2 {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-top: 0;
  }
  
  p {
    line-height: 1.8;
    color: #444;
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
  
  blockquote {
    border-left: 4px solid #e0e0e0;
    padding-left: 1rem;
    margin-left: 0;
    color: #666;
    font-style: italic;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    
    th, td {
      border: 1px solid #ddd;
      padding: 0.7rem;
      text-align: left;
    }
    
    th {
      background-color: #f0f0f0;
      font-weight: 600;
    }
    
    tr:nth-of-type(even) {
      background-color: #f9f9f9;
    }
  }
  
  code {
    font-family: monospace;
    background-color: #f0f0f0;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  pre {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 1rem;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Keyword = styled.span`
  background-color: #e9f2fc;
  color: #3498db;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
`;

const FilterOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#555'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#e9eef2'};
  }
`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const issue = policyIssues.find(i => i.id === payload[0].payload.id);
    const quadrant = getIssueQuadrant(issue.importance, issue.urgency);
    
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>{issue.name}</p>
        <p style={{ margin: '0 0 5px' }}>重要度: {issue.importance}</p>
        <p style={{ margin: '0 0 5px' }}>緊急度: {issue.urgency}</p>
        <p style={{ margin: '0', fontWeight: '500', color: quadrant.color }}>{quadrant.name}</p>
      </div>
    );
  }

  return null;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ActionLink = styled(Link)`
  display: inline-block;
  background: ${props => props.bg};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
`;

const PrinciplesSection = styled.div`
  margin-bottom: 3rem;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  
  h1 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  h2 {
    font-size: 1.4rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #34495e;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  p {
    line-height: 1.8;
    color: #444;
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
`;

// 評価対象の政策を判定する関数
const isEvaluatedPolicy = (policyId) => {
  // いずれかの政党で評価されているか確認
  return Object.values(partyPolicyScores).some(partyScores => 
    partyScores[policyId] !== undefined
  );
};

// 評価対象の政策のみを抽出
const evaluatedPolicyIssues = policyIssues.filter(issue => isEvaluatedPolicy(issue.id));

// 評価対象の政策のみの座標を抽出
const evaluatedMatrixCoordinates = matrixCoordinates.filter(coord => 
  isEvaluatedPolicy(coord.id)
);

export default function Issues() {
  const [filter, setFilter] = useState('all');
  
  const filteredIssues = filter === 'all' 
    ? evaluatedPolicyIssues 
    : evaluatedPolicyIssues.filter(issue => {
        const quadrant = getIssueQuadrant(issue.importance, issue.urgency);
        return quadrant.id === filter;
      });
  
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    // 重要度 x 緊急度で計算した優先度でソート
    const priorityA = a.importance * a.urgency;
    const priorityB = b.importance * b.urgency;
    return priorityB - priorityA;
  });
  
  return (
    <Layout>
      <PageTitle>日本の政策課題</PageTitle>
      <PageDescription>
        現在の日本が直面する主要な政策課題を、重要性と緊急性に基づいてマッピングしました。
        このマトリックスを通じて、課題の優先度と各政党の対応方針を比較することができます。
      </PageDescription>
      
      <PrinciplesSection>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {policyEvaluationPrinciples}
        </ReactMarkdown>
      </PrinciplesSection>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="緊急度" 
              domain={[0, 10]}
              label={{ value: '緊急度', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="重要度" 
              domain={[0, 10]}
              label={{ value: '重要度', angle: -90, position: 'left' }}
            />
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[60, 200]} 
              name="重み" 
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="政策課題" data={evaluatedMatrixCoordinates}>
              {evaluatedMatrixCoordinates.map((entry, index) => {
                const issue = evaluatedPolicyIssues.find(i => i.id === entry.id);
                const quadrant = getIssueQuadrant(issue.importance, issue.urgency);
                return <Cell key={`cell-${index}`} fill={quadrant.color} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <QuadrantLegend>
        {Object.keys(quadrants).map(key => (
          <QuadrantBox key={key} color={quadrants[key].color}>
            <QuadrantTitle>{quadrants[key].name}</QuadrantTitle>
            <QuadrantDescription>{quadrants[key].description}</QuadrantDescription>
          </QuadrantBox>
        ))}
      </QuadrantLegend>
      
      <FilterOptions>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          すべての課題
        </FilterButton>
        {Object.keys(quadrants).map(key => (
          <FilterButton 
            key={key}
            active={filter === key}
            onClick={() => setFilter(key)}
            style={{ backgroundColor: filter === key ? quadrants[key].color : undefined }}
          >
            {quadrants[key].name}
          </FilterButton>
        ))}
      </FilterOptions>
      
      <IssuesList>
        {sortedIssues.map(issue => {
          const quadrant = getIssueQuadrant(issue.importance, issue.urgency);
          return (
            <IssueCard key={issue.id} id={issue.id} color={quadrant.color}>
              <StyledLink href={`/policies/${issue.id}`}>
                <IssueHeader>
                  <IssueTitle>{issue.name}</IssueTitle>
                  <IssueRatings>
                    <IssueRating color="#e9f7fe" textColor="#3498db">
                      重要度: {issue.importance}
                    </IssueRating>
                    <IssueRating color="#fef4e9" textColor="#e67e22">
                      緊急度: {issue.urgency}
                    </IssueRating>
                  </IssueRatings>
                </IssueHeader>
                
                <IssueDescription>{issue.description}</IssueDescription>
              </StyledLink>
              
              <IssueDetails>
                <h3>詳細</h3>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {issue.details}
                </ReactMarkdown>
                
                <KeywordsList>
                  {issue.keywords.map(keyword => (
                    <Keyword key={keyword}>{keyword}</Keyword>
                  ))}
                </KeywordsList>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <ActionLink href={`/policies/${issue.id}`} bg={quadrant.color}>
                    各政党の政策を比較 →
                  </ActionLink>
                </div>
              </IssueDetails>
            </IssueCard>
          );
        })}
      </IssuesList>
    </Layout>
  );
} 