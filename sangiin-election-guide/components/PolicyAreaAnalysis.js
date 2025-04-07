import React from 'react';
import styled from '@emotion/styled';
import { policyAreaEvaluations } from '../data/party-evaluations';

const AnalysisContainer = styled.div`
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px dashed #e0e0e0;
`;

const AreaAnalysisText = styled.p`
  margin-top: 0.2rem;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
`;

const BestBadge = styled.span`
  display: inline-block;
  margin-top: 0.3rem;
  background-color: #e8f5e9;
  color: #388e3c;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const CommonInfoHeader = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: #777;
  font-style: italic;
`;

/**
 * 政策分野の横断評価を表示するコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.policyId - 政策ID
 * @param {string} props.areaAnalysis - 政策分野の横断評価の説明文（指定された場合はこちらを優先）
 * @param {boolean} props.partyIsBest - この政党がこの政策分野で最高評価かどうか
 */
const PolicyAreaAnalysis = ({ policyId, areaAnalysis: propAreaAnalysis, partyIsBest }) => {
  // 政策IDから共通情報を取得する
  const policyEvalInfo = policyAreaEvaluations[policyId] || {};
  
  // propが指定されている場合はそちらを優先、なければ共通情報を使用
  const areaAnalysis = propAreaAnalysis || policyEvalInfo.analysis;
  
  if (!areaAnalysis) return null;
  
  return (
    <AnalysisContainer>
      <strong>政策分野の横断評価:</strong>
      <AreaAnalysisText>{areaAnalysis}</AreaAnalysisText>
      {partyIsBest && (
        <BestBadge>この政策分野での最高評価</BestBadge>
      )}
    </AnalysisContainer>
  );
};

export default PolicyAreaAnalysis; 