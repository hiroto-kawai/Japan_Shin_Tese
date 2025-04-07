import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Layout from '../../components/Layout';
import { parties, partyPolicies } from '../../data/parties';
import { partyPolicyScores } from '../../data/party-policy-scores';
import { policyIssues } from '../../data/issues';
import { getPolicyEvaluation, getPartyCharacteristics } from '../../data/party-evaluations';
import PartyIntegrationCapacityCard from '../../components/PartyIntegrationCapacityCard';
import TradeoffAnalysisSection from '../../components/TradeoffAnalysisSection';
import PolicyAreaAnalysis from '../../components/PolicyAreaAnalysis';

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #3498db;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const PartyHeader = styled.div`
  padding: 2rem;
  background-color: ${props => props.color};
  color: white;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h1 {
    margin-top: 0;
    font-size: 2rem;
  }
  
  .party-name-reading {
    opacity: 0.9;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0;
    line-height: 1.6;
  }
`;

const SidebarSection = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  background-color: ${props => props.color || '#3498db'};
  color: white;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
`;

const ScoreBar = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    
    span {
      color: ${props => props.color};
      font-weight: 700;
    }
  }
  
  .bar-container {
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    background-color: ${props => props.color};
    width: ${props => (props.score / 10) * 100}%;
    transition: width 0.3s;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  margin: 1rem 0;
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 4px;
  }
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? props.color : 'transparent'};
  color: ${props => props.active ? props.color : '#555'};
  font-weight: ${props => props.active ? '700' : '500'};
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.color};
  }
`;

const PolicyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    span {
      font-size: 0.9rem;
      color: white;
      background-color: ${props => props.color};
      padding: 0.3rem 0.6rem;
      border-radius: 20px;
    }
  }
`;

const PolicyPoints = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
`;

const EvaluationSection = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  
  h4 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  p {
    color: #555;
    margin-bottom: 0;
  }
`;

// 開閉可能なコンポーネントのスタイル
const CollapsibleSection = styled.div`
  margin: 1rem 0;
`;

const CollapsibleHeader = styled.div`
  background-color: #f0f4f8;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #444;
  }
  
  .toggle-icon {
    font-size: 0.9rem;
    transition: transform 0.3s;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const CollapsibleContent = styled.div`
  background-color: #f3f9ff;
  padding: 1rem;
  border-radius: 0 0 6px 6px;
  margin-top: ${props => props.isOpen ? '0.5rem' : '0'};
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export default function PartyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('policies');
  // 各政策IDの開閉状態を管理するオブジェクト
  const [openEvaluations, setOpenEvaluations] = useState({});
  
  if (!id) return null;
  
  const party = parties.find(p => p.id === id);
  if (!party) return <Layout><div>政党が見つかりません</div></Layout>;
  
  const avgScore = calculateAvgScore(party.id);
  const chartData = formatChartData(party.id);
  const partyCharacteristics = getPartyCharacteristics(party.id);
  
  // 評価ポイントの開閉状態を切り替える関数
  const toggleEvaluation = (policyId) => {
    setOpenEvaluations(prev => ({
      ...prev,
      [policyId]: !prev[policyId]
    }));
  };
  
  // 評価対象となっている政策のみをフィルタリング
  const evaluatedPolicyIssues = policyIssues.filter(issue => {
    return partyPolicyScores[party.id] && partyPolicyScores[party.id][issue.id] !== undefined;
  });
  
  return (
    <Layout>
      <BackLink href="/parties">政党一覧に戻る</BackLink>
      
      <Container>
        <div>
          <SidebarSection>
            <SidebarHeader color={party.color}>
              <h3>政党概要</h3>
            </SidebarHeader>
            <SidebarContent>
              <p>{party.description}</p>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} />
                    <Radar
                      name={party.name}
                      dataKey="score"
                      stroke={party.color}
                      fill={party.color}
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <h4 style={{ marginBottom: '0.8rem' }}>平均スコア: {avgScore}/10</h4>
              
              {/* 上位3つの政策を表示 */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>得意政策</h4>
                {getTopPolicies(party.id, 3).map((policy, index) => (
                  <ScoreBar key={index} color={party.color} score={policy.score}>
                    <h4>
                      {policy.name} <span>{policy.score}</span>
                    </h4>
                    <div className="bar-container">
                      <div className="bar-fill"></div>
                    </div>
                  </ScoreBar>
                ))}
              </div>
              
              {/* 下位3つの政策を表示 */}
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>改善余地のある政策</h4>
                {getBottomPolicies(party.id, 3).map((policy, index) => (
                  <ScoreBar key={index} color={party.color} score={policy.score}>
                    <h4>
                      {policy.name} <span>{policy.score}</span>
                    </h4>
                    <div className="bar-container">
                      <div className="bar-fill"></div>
                    </div>
                  </ScoreBar>
                ))}
              </div>
            </SidebarContent>
          </SidebarSection>
          
          {/* 政党の価値統合能力評価を追加 */}
          <PartyIntegrationCapacityCard partyId={id} partyColor={party.color} />
          
          <SidebarSection>
            <SidebarHeader color={party.color}>
              <h3>特徴</h3>
            </SidebarHeader>
            <SidebarContent>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>強み</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: '0' }}>
                  {partyCharacteristics.strengths.map((strength, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>弱み</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: '0' }}>
                  {partyCharacteristics.weaknesses.map((weakness, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{weakness}</li>
                  ))}
                </ul>
              </div>
              
              {party.officialWebsite && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <a 
                    href={party.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: party.color,
                      color: 'white',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    公式サイトを見る
                  </a>
                </div>
              )}
            </SidebarContent>
          </SidebarSection>
        </div>
        
        <div>
          <PartyHeader color={party.color}>
            <h1>{party.name}</h1>
            {party.shortName && <div className="party-name-reading">{party.shortName}</div>}
            <p>{party.description}</p>
          </PartyHeader>
          
          <TabContainer>
            <TabButtons>
              <TabButton
                active={activeTab === 'policies'}
                color={party.color}
                onClick={() => setActiveTab('policies')}
              >
                政策
              </TabButton>
              <TabButton
                active={activeTab === 'history'}
                color={party.color}
                onClick={() => setActiveTab('history')}
              >
                沿革
              </TabButton>
            </TabButtons>
            
            {activeTab === 'policies' && (
              <div>
                {evaluatedPolicyIssues.map(issue => {
                  const evaluation = getPolicyEvaluation(party.id, issue.id);
                  const policies = partyPolicies[party.id]?.filter(p => p.issueId === issue.id) || [];
                  
                  return (
                    <PolicyCard key={issue.id} color={party.color}>
                      <h3>
                        {issue.name}
                        <span>{evaluation.score}</span>
                      </h3>
                      
                      {/* 開閉可能な評価ポイントセクション */}
                      <CollapsibleSection>
                        <CollapsibleHeader 
                          onClick={() => toggleEvaluation(issue.id)}
                          isOpen={openEvaluations[issue.id]}
                        >
                          <h4>評価ポイント</h4>
                          <div className="toggle-icon">{openEvaluations[issue.id] ? '▲' : '▼'}</div>
                        </CollapsibleHeader>
                        
                        <CollapsibleContent isOpen={openEvaluations[issue.id]}>
                          <TradeoffAnalysisSection policyId={issue.id} />
                          <PolicyAreaAnalysis 
                            policyId={issue.id}
                            partyIsBest={evaluation.partyIsBest}
                          />
                          <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', textAlign: 'right' }}>
                            <Link href={`/policies/${issue.id}`} style={{ color: party.color, textDecoration: 'none' }}>
                              この政策課題の詳細を見る →
                            </Link>
                          </div>
                        </CollapsibleContent>
                      </CollapsibleSection>
                      
                      {policies.length > 0 ? (
                        <div>
                          <h4>主な政策:</h4>
                          <PolicyPoints>
                            {policies.flatMap(policy => policy.points).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </PolicyPoints>
                        </div>
                      ) : (
                        <p>この分野の詳細な政策は提供されていません。</p>
                      )}
                      
                      <EvaluationSection>
                        <h4>評価:</h4>
                        <p>{evaluation.explanation}</p>
                        
                        {evaluation.valueIntegration && (
                          <div style={{ marginTop: '1rem' }}>
                            <strong>価値統合の視点:</strong>
                            <p style={{ marginTop: '0.2rem' }}>{evaluation.valueIntegration}</p>
                          </div>
                        )}
                        
                        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                          <Link 
                            href={`/policies/${issue.id}`}
                            style={{ color: party.color, textDecoration: 'none', fontSize: '0.9rem' }}
                          >
                            この政策課題の詳細を見る →
                          </Link>
                        </div>
                      </EvaluationSection>
                    </PolicyCard>
                  );
                })}
              </div>
            )}
            
            {activeTab === 'history' && (
              <div style={{ padding: '1rem' }}>
                {party.history ? (
                  <div dangerouslySetInnerHTML={{ __html: party.history }} />
                ) : (
                  <p>この政党の沿革情報は現在提供されていません。</p>
                )}
              </div>
            )}
          </TabContainer>
        </div>
      </Container>
    </Layout>
  );
}

// 政党の平均スコアを計算する関数
function calculateAvgScore(partyId) {
  const scores = Object.values(partyPolicyScores[partyId]);
  return (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
}

// チャート用のデータをフォーマットする関数
function formatChartData(partyId) {
  return policyIssues.map(issue => ({
    subject: issue.name,
    score: partyPolicyScores[partyId][issue.id] || 0,
    fullMark: 10
  }));
}

// トップNの政策を取得する関数
function getTopPolicies(partyId, n) {
  return Object.entries(partyPolicyScores[partyId])
    .map(([issueId, score]) => {
      const issue = policyIssues.find(i => i.id === issueId);
      return {
        id: issueId,
        name: issue ? issue.name : issueId,
        score
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

// 下位Nの政策を取得する関数
function getBottomPolicies(partyId, n) {
  return Object.entries(partyPolicyScores[partyId])
    .map(([issueId, score]) => {
      const issue = policyIssues.find(i => i.id === issueId);
      return {
        id: issueId,
        name: issue ? issue.name : issueId,
        score
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
} 