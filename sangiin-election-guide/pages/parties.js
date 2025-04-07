import { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Layout from '../components/Layout';
import { parties, partyPolicyScores } from '../data/parties';
import { policyIssues } from '../data/issues';

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

const PartySelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const PartyButton = styled.button`
  background-color: ${props => props.active ? props.color : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#555'};
  border: 2px solid ${props => props.color};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? props.color : props.hoverColor || '#e9eef2'};
  }
`;

const PartyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const PartyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const PartyHeader = styled.div`
  padding: 1.5rem;
  background-color: ${props => props.color};
  color: white;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0.5rem 0 0;
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

const PartyBody = styled.div`
  padding: 1.5rem;
`;

const PartyDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.6;
`;

const ScoreBar = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
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

const PartyInfoBox = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  h4 {
    margin-top: 0;
    font-size: 1rem;
  }
  
  ul {
    margin: 0;
    padding-left: 1rem;
  }
`;

const CustomLegend = ({ payload }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: entry.color, 
            marginRight: '5px',
            borderRadius: '50%'
          }} />
          <span style={{ fontSize: '0.9rem', color: '#555' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        padding: '10px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ margin: '0', color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DetailsLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid ${props => props.color || '#3498db'};
  border-radius: 4px;
  color: ${props => props.color || '#3498db'};
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
`;

// スコアデータを形成する関数
const formatChartData = (selectedParties) => {
  // 政策分野ごとのデータを作成
  return policyIssues.map(issue => {
    const data = {
      subject: issue.name,
      fullMark: 10,
    };
    
    // 選択された政党のスコアを追加
    selectedParties.forEach(partyId => {
      const party = parties.find(p => p.id === partyId);
      if (party) {
        data[party.shortName] = partyPolicyScores[partyId][issue.id] || 0;
      }
    });
    
    return data;
  });
};

export default function PartiesPage() {
  const [selectedParties, setSelectedParties] = useState([parties[0].id, parties[1].id]);
  
  const toggleParty = (partyId) => {
    if (selectedParties.includes(partyId)) {
      // 少なくとも1つの政党は選択されている状態を維持
      if (selectedParties.length > 1) {
        setSelectedParties(selectedParties.filter(id => id !== partyId));
      }
    } else {
      // 最大3つまで選択可能
      if (selectedParties.length < 3) {
        setSelectedParties([...selectedParties, partyId]);
      } else {
        // 3つ以上選択する場合は最初の選択を削除して新しいものを追加
        setSelectedParties([...selectedParties.slice(1), partyId]);
      }
    }
  };
  
  const chartData = formatChartData(selectedParties);
  
  return (
    <Layout>
      <PageTitle>政党比較</PageTitle>
      <PageDescription>
        各政党の政策スコアを比較できます。最大3つの政党を選択して、政策分野ごとのスコアをレーダーチャートで確認しましょう。
        また、各政党の詳細情報も確認できます。
      </PageDescription>
      
      <PartySelector>
        {parties.map(party => (
          <PartyButton
            key={party.id}
            color={party.color}
            hoverColor={`${party.color}33`} // 透明度を追加
            active={selectedParties.includes(party.id)}
            onClick={() => toggleParty(party.id)}
          >
            {party.shortName}
          </PartyButton>
        ))}
      </PartySelector>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            {selectedParties.map(partyId => {
              const party = parties.find(p => p.id === partyId);
              return (
                <Radar
                  key={party.id}
                  name={party.shortName}
                  dataKey={party.shortName}
                  stroke={party.color}
                  fill={party.color}
                  fillOpacity={0.3}
                />
              );
            })}
            <Legend content={<CustomLegend />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <PartyGrid>
        {parties.map(party => {
          // 平均スコアを計算
          const scores = Object.values(partyPolicyScores[party.id]);
          const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
          
          // 上位3つの政策を取得
          const topPolicies = Object.entries(partyPolicyScores[party.id])
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .slice(0, 3)
            .map(([issueId, score]) => {
              const issue = policyIssues.find(i => i.id === issueId);
              return { 
                name: issue ? issue.name : issueId, // issueがない場合はissueIdをそのまま表示
                score 
              };
            });
          
          return (
            <PartyCard key={party.id} id={party.id}>
              <PartyHeader color={party.color}>
                <h2>{party.name}</h2>
                <p>{party.shortName}</p>
              </PartyHeader>
              <PartyBody>
                <PartyDescription>
                  {party.description.substring(0, 150)}...
                </PartyDescription>
                
                <ScoreBar color={party.color} score={avgScore}>
                  <h4>
                    総合評価 <span>{avgScore.toFixed(1)}</span>
                  </h4>
                  <div className="bar-container">
                    <div className="bar-fill"></div>
                  </div>
                </ScoreBar>
                
                <PartyInfoBox>
                  <h4>得意政策分野</h4>
                  <ul>
                    {topPolicies.map(policy => (
                      <li key={policy.name}>
                        {policy.name}: <strong>{policy.score}</strong>
                      </li>
                    ))}
                  </ul>
                </PartyInfoBox>
                
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <button 
                    style={{ 
                      backgroundColor: party.color,
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      marginRight: '0.5rem'
                    }}
                    onClick={() => toggleParty(party.id)}
                  >
                    {selectedParties.includes(party.id) ? 'チャートから削除' : 'チャートに追加'}
                  </button>
                  <DetailsLink href={`/parties/${party.id}`} color={party.color}>
                    詳細を見る
                  </DetailsLink>
                </div>
              </PartyBody>
            </PartyCard>
          );
        })}
      </PartyGrid>
    </Layout>
  );
} 