import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Layout from '../../components/Layout';
import { policyIssues } from '../../data/issues';
import { parties, partyPolicies } from '../../data/parties';
import { partyPolicyScores } from '../../data/party-policy-scores';
import { getPolicyEvaluation, getEvaluationCriteria } from '../../data/party-evaluations';

// 共通コンポーネントの追加
import TradeoffAnalysisSection from '../../components/TradeoffAnalysisSection';
import PolicyAreaAnalysis from '../../components/PolicyAreaAnalysis';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const PolicyHeader = styled.div`
  margin-bottom: 3rem;
`;

const PolicyTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PolicyStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const PolicyStat = styled.div`
  background-color: ${props => props.bg || '#f8f9fa'};
  color: ${props => props.color || '#333'};
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  white-space: nowrap;
  margin-bottom: 0.3rem;
  line-height: 1.2;
  height: auto;
`;

const PolicyDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
`;

const PolicyDetails = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  
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

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 3rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const PartiesSection = styled.div`
  margin-top: 2rem;
`;

const PartyCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PartyCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PartyHeader = styled.div`
  background-color: ${props => props.color};
  color: white;
  padding: 1.2rem;
  position: relative;
`;

const PartyName = styled.h3`
  margin: 0;
  font-size: 1.3rem;
`;

const PartyScore = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const PartyContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  p {
    margin-bottom: 1rem;
  }
`;

const PartyApproaches = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    color: #555;
  }
`;

// カスタムプロパティを持つリンクでshouldForwardPropを使用して特定のプロパティのみを渡す
const ViewDetailButton = styled(Link, {
  shouldForwardProp: (prop) => !['bg', 'color', '$hoverBg'].includes(prop)
})`
  display: block;
  width: 100%;
  text-align: center;
  background-color: ${props => props.bg || '#f8f9fa'};
  color: ${props => props.color || '#555'};
  padding: 0.8rem;
  text-decoration: none;
  border-top: 1px solid #eee;
  margin-top: 1rem;
  transition: background-color 0.3s;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.$hoverBg || '#eee'};
  }
`;

const ScoreDetails = styled.div`
  background-color: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
  
  h4 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    color: #555;
  }
  
  p {
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }
`;

const ScoreReason = styled.div`
  margin-top: 0.5rem;
  line-height: 1.4;
  font-size: 0.85rem;
  color: #555;
  
  strong {
    color: #333;
  }
`;

const EvaluationCriteria = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  background-color: ${props => props.bg || '#e9f2fc'};
  color: ${props => props.color || '#3498db'};
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ViewEvaluationLink = styled(Link)`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  text-decoration: underline;
  text-align: right;
  
  &:hover {
    color: #333;
  }
`;

// 開閉式コンテナのスタイル
const CollapsibleContainer = styled.div`
  margin: 2rem 0 3rem;
`;

const CollapsibleHeader = styled.div`
  background-color: #f0f4f8;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin: 0;
    font-size: 1.4rem;
    color: #2c3e50;
  }
  
  .toggle-icon {
    font-size: 1.2rem;
    transition: transform 0.3s;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const CollapsibleContent = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0 0 8px 8px;
  margin-top: ${props => props.isOpen ? '0.5rem' : '0'};
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

// スタイル拡張したCollapsibleContent
const PolicyDetailsContent = styled(CollapsibleContent)`
  padding: 1.5rem 2rem;

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

export default function PolicyDetail() {
  const router = useRouter();
  const { id } = router.query;
  // 評価ポイントの開閉状態を管理
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  // 政策詳細の開閉状態を管理
  const [isPolicyDetailsOpen, setIsPolicyDetailsOpen] = useState(false);
  
  if (!id) return null;
  
  const policy = policyIssues.find(p => p.id === id);
  if (!policy) return <Layout><div>政策が見つかりません</div></Layout>;
  
  // 各政党の政策アプローチを取得（検索）
  const getPartyApproach = (partyId) => {
    if (!partyPolicies[partyId]) return [];
    
    const relatedPolicies = partyPolicies[partyId].filter(p => 
      p.issueId === policy.id || policy.keywords.some(kw => p.title.includes(kw))
    );
    
    return relatedPolicies.length ? relatedPolicies : [];
  };
  
  // 政党を評価スコア順にソート
  const sortedParties = [...parties].sort((a, b) => {
    const scoreA = partyPolicyScores[a.id][policy.id] || 0;
    const scoreB = partyPolicyScores[b.id][policy.id] || 0;
    return scoreB - scoreA;
  });
  
  // 評価対象の政策を持つ政党のみをフィルタリング
  const evaluatedParties = sortedParties.filter(party => {
    return partyPolicyScores[party.id][policy.id] !== undefined;
  });
  
  return (
    <Layout>
      <PageContainer>
        <BackLink href="/issues">政策課題一覧に戻る</BackLink>
        
        <PolicyHeader>
          <PolicyTitle>{policy.name}</PolicyTitle>
          
          <PolicyStats>
            <PolicyStat bg="#e9f7fe" color="#3498db">
              重要度: {policy.importance}/10
            </PolicyStat>
            <PolicyStat bg="#fef4e9" color="#e67e22">
              緊急度: {policy.urgency}/10
            </PolicyStat>
            <PolicyStat bg="#f0e9fe" color="#9b59b6">
              配分比重: {policy.weight}%
            </PolicyStat>
          </PolicyStats>
          
          <PolicyDescription>{policy.description}</PolicyDescription>
          
          {/* 開閉可能な政策詳細セクション */}
          <CollapsibleContainer>
            <CollapsibleHeader 
              onClick={() => setIsPolicyDetailsOpen(!isPolicyDetailsOpen)}
              isOpen={isPolicyDetailsOpen}
            >
              <h3>政策詳細</h3>
              <div className="toggle-icon">{isPolicyDetailsOpen ? '▲' : '▼'}</div>
            </CollapsibleHeader>
            
            <PolicyDetailsContent isOpen={isPolicyDetailsOpen}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {policy.details}
              </ReactMarkdown>
              <KeywordsList>
                {policy.keywords && policy.keywords.map(keyword => (
                  <Keyword key={keyword}>{keyword}</Keyword>
                ))}
              </KeywordsList>
            </PolicyDetailsContent>
          </CollapsibleContainer>
        </PolicyHeader>
        
        {/* 開閉可能な評価ポイントセクション */}
        <CollapsibleContainer>
          <CollapsibleHeader 
            onClick={() => setIsEvaluationOpen(!isEvaluationOpen)}
            isOpen={isEvaluationOpen}
          >
            <h3>評価ポイント</h3>
            <div className="toggle-icon">{isEvaluationOpen ? '▲' : '▼'}</div>
          </CollapsibleHeader>
          
          <CollapsibleContent isOpen={isEvaluationOpen}>
            {/* policy.idを明示的に渡してトレードオフ分析を表示 */}
            <TradeoffAnalysisSection policyId={policy.id} />
            
            <PolicyAreaAnalysis 
              policyId={policy.id}
              partyIsBest={false} 
            />
            
            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
              <Link href="/evaluation-principles" style={{ color: '#3498db', textDecoration: 'none' }}>
                評価基準について詳しく見る →
              </Link>
            </div>
          </CollapsibleContent>
        </CollapsibleContainer>
        
        <SectionTitle>各政党のアプローチ</SectionTitle>
        <PartiesSection>
          <PartyCards>
            {evaluatedParties.map(party => {
              const score = partyPolicyScores[party.id][policy.id] || 0;
              const approaches = getPartyApproach(party.id);
              const evaluation = getPolicyEvaluation(party.id, policy.id);
              console.log(evaluation);
              
              return (
                <PartyCard key={party.id}>
                  <PartyHeader color={party.color}>
                    <PartyName>{party.name}</PartyName>
                    <PartyScore>{score}</PartyScore>
                  </PartyHeader>
                  
                  <PartyContent>
                    {approaches.length > 0 ? (
                      <PartyApproaches>
                        {approaches.flatMap(approach => 
                          approach.points.slice(0, 3).map((point, i) => (
                            <li key={i}>{point}</li>
                          ))
                        )}
                      </PartyApproaches>
                    ) : (
                      <p>この政策に関する詳細な情報は提供されていません。</p>
                    )}
                    
                    <ScoreDetails>
                      <h4>評価点: {score}/10</h4>
                      <ScoreReason>
                        <p>{evaluation.explanation}</p>
                        
                        {evaluation.valueIntegration && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <strong>価値統合の視点:</strong>
                            <p style={{ marginTop: '0.2rem' }}>{evaluation.valueIntegration}</p>
                          </div>
                        )}
                      </ScoreReason>
                      <ViewEvaluationLink href="/evaluation-principles">
                        評価基準について詳しく見る →
                      </ViewEvaluationLink>
                    </ScoreDetails>
                  </PartyContent>
                  
                  <ViewDetailButton 
                    href={`/parties/${party.id}`}
                    bg={party.color}
                    color="white"
                    $hoverBg={`${party.color}dd`}
                  >
                    政党詳細を見る
                  </ViewDetailButton>
                </PartyCard>
              );
            })}
          </PartyCards>
        </PartiesSection>
      </PageContainer>
    </Layout>
  );
} 