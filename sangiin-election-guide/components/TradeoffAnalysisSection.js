import React from 'react';
import styled from '@emotion/styled';
import { tradeoffAnalysis } from '../data/evaluation-standards';

const TradeoffSectionContainer = styled.div`
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px dashed #e0e0e0;
`;

const TradeoffList = styled.ul`
  margin: 0.5rem 0 0.5rem 1.2rem;
  padding: 0;
  
  li {
    margin-bottom: 0.4rem;
    font-size: 0.85rem;
    color: #555;
  }
`;

const BestApproach = styled.div`
  background-color: #e9f7fe;
  padding: 0.7rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #333;
`;

const CommonInfoHeader = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: #777;
  font-style: italic;
`;

/**
 * トレードオフ分析を表示するコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.policyId - 政策ID
 * @param {Array} props.tradeoffs - トレードオフの分析ポイントの配列（指定された場合はこちらを優先）
 * @param {string} props.bestApproach - 最適なアプローチの説明（指定された場合はこちらを優先）
 */
const TradeoffAnalysisSection = ({ policyId, tradeoffs: propTradeoffs, bestApproach: propBestApproach }) => {
  // 政策IDから共通情報を取得する
  const commonTradeoffInfo = tradeoffAnalysis[policyId] || {};
  
  // propが指定されている場合はそちらを優先、なければ共通情報を使用
  const tradeoffs = propTradeoffs || commonTradeoffInfo.tradeoffs;
  const bestApproach = propBestApproach || commonTradeoffInfo.bestApproach;
  
  if (!tradeoffs || tradeoffs.length === 0) return null;
  
  return (
    <TradeoffSectionContainer>
      <strong>トレードオフ分析:</strong>
      <TradeoffList>
        {tradeoffs.map((tradeoff, i) => (
          <li key={i}>{tradeoff}</li>
        ))}
      </TradeoffList>
      
      {bestApproach && (
        <BestApproach>
          <strong>最適アプローチ: </strong>
          {bestApproach}
        </BestApproach>
      )}
    </TradeoffSectionContainer>
  );
};

export default TradeoffAnalysisSection; 