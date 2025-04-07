import { partyPolicyScores } from './party-policy-scores';
import { policyIssues } from './issues';
import { parties } from './parties';
import { tradeoffAnalysis } from './evaluation-standards';

// 政策分野ごとの各政党比較データ
export const policyAreaComparisons = {
  economic_growth: {
    title: '経済成長・財政健全化',
    description: '経済成長戦略と財政健全化の両立をどう図るか、成長と分配のバランスをどう取るかを評価',
    tradeoffs: tradeoffAnalysis.economic_growth.tradeoffs,
    bestApproach: tradeoffAnalysis.economic_growth.bestApproach,
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.economic_growth, summary: '成長戦略は具体的だが財政健全化の道筋がやや不明確' },
      { id: 'ishin', score: partyPolicyScores.ishin.economic_growth, summary: '成長重視の路線は明確、規制改革や構造改革への提案が具体的' },
      { id: 'komeito', score: partyPolicyScores.komeito.economic_growth, summary: '分配重視の政策は具体的だが成長戦略の独自色が弱い' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.economic_growth, summary: '現実的な成長戦略を提示、財政規律への意識もある' },
      { id: 'cdp', score: partyPolicyScores.cdp.economic_growth, summary: '分配重視だが成長戦略が不明確、財政健全化への具体策に乏しい' },
      { id: 'jcp', score: partyPolicyScores.jcp.economic_growth, summary: '分配重視だが成長戦略が不明確、財政規律への意識が弱い' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.economic_growth, summary: 'MMT理論依存の財政政策は持続可能性に大きな疑問' }
    ]
  },
  
  social_security: {
    title: '社会保障',
    description: '社会保障制度の持続可能性と給付水準のバランス、世代間公平性の確保をどう図るかを評価',
    tradeoffs: tradeoffAnalysis.social_security.tradeoffs,
    bestApproach: tradeoffAnalysis.social_security.bestApproach,
    parties: [
      { id: 'ishin', score: partyPolicyScores.ishin.social_security, summary: '給付の重点化・効率化を提案、持続可能性への意識が高い' },
      { id: 'ldp', score: partyPolicyScores.ldp.social_security, summary: '財源確保と給付抑制のバランスを模索、世代間公平性への配慮はある' },
      { id: 'komeito', score: partyPolicyScores.komeito.social_security, summary: '弱者支援重視の姿勢は明確だが財源確保策が不十分' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.social_security, summary: '現役世代支援を重視する姿勢は明確だが具体策にやや乏しい' },
      { id: 'cdp', score: partyPolicyScores.cdp.social_security, summary: '給付拡大に偏重し財源確保策や持続可能性の視点が弱い' },
      { id: 'jcp', score: partyPolicyScores.jcp.social_security, summary: '給付拡大を最優先し持続可能性への配慮が著しく不足' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.social_security, summary: '給付拡大を極端に重視し財源確保・持続可能性への配慮が決定的に不足' }
    ]
  },
  
  energy_policy: {
    title: 'エネルギー政策',
    description: '脱炭素化とエネルギー安全保障の両立、環境性と経済性のバランスをどう図るかを評価',
    tradeoffs: tradeoffAnalysis.energy_policy.tradeoffs,
    bestApproach: tradeoffAnalysis.energy_policy.bestApproach,
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.energy_policy, summary: '原発再稼働と再エネ推進のバランスを模索、エネルギー安全保障への配慮あり' },
      { id: 'komeito', score: partyPolicyScores.komeito.energy_policy, summary: '再エネ重視だが現実的な移行過程も考慮' },
      { id: 'ishin', score: partyPolicyScores.ishin.energy_policy, summary: '現実的なエネルギーミックスを志向、コスト意識が高い' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.energy_policy, summary: '原発活用も視野に入れた現実的路線、エネルギー安全保障への配慮あり' },
      { id: 'cdp', score: partyPolicyScores.cdp.energy_policy, summary: '脱炭素・再エネ推進は明確だが、エネルギー安全保障への配慮が不足' },
      { id: 'jcp', score: partyPolicyScores.jcp.energy_policy, summary: '脱原発・再エネ100%の目標は明確だが、エネルギー安全保障視点の欠如' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.energy_policy, summary: '脱原発・再エネ推進の方向性は明確だが、即時全廃の現実性に疑問' }
    ]
  },
  
  security: {
    title: '安全保障',
    description: '平和主義の理念と現実的な安全保障対応、抑止力と対話外交のバランスをどう図るかを評価',
    tradeoffs: tradeoffAnalysis.security.tradeoffs,
    bestApproach: tradeoffAnalysis.security.bestApproach,
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.security, summary: '防衛力強化と日米同盟維持の方針が明確で具体的、台湾有事対応も意識' },
      { id: 'ishin', score: partyPolicyScores.ishin.security, summary: '現実的な防衛力強化路線、日米同盟と自主防衛力のバランス良好' },
      { id: 'komeito', score: partyPolicyScores.komeito.security, summary: '現実的な安保政策だが防衛力強化への姿勢はやや曖昧' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.security, summary: '現実的な安全保障政策を志向するが具体性にやや欠ける' },
      { id: 'cdp', score: partyPolicyScores.cdp.security, summary: '集団的自衛権に慎重で防衛力強化にも消極的、現実の安保環境認識に課題' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.security, summary: '防衛費削減・日米安保見直しは現実の安保環境認識と大きく乖離' },
      { id: 'jcp', score: partyPolicyScores.jcp.security, summary: '日米安保廃棄・専守防衛強化の立場は現実の安保環境と乖離' }
    ]
  },
  
  declining_birthrate: {
    title: '少子化対策',
    description: '経済支援と環境整備のバランス、若者の経済基盤強化と子育て支援の両立をどう図るかを評価',
    tradeoffs: tradeoffAnalysis.declining_birthrate.tradeoffs,
    bestApproach: tradeoffAnalysis.declining_birthrate.bestApproach,
    parties: [
      { id: 'komeito', score: partyPolicyScores.komeito.declining_birthrate, summary: '子育て支援が手厚く具体的、教育無償化など実績あり' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.declining_birthrate, summary: '子育て支援策は手厚く具体的だが財源の現実性に疑問' },
      { id: 'ldp', score: partyPolicyScores.ldp.declining_birthrate, summary: '子育て支援策は充実しているが若者の経済基盤強化策が弱い' },
      { id: 'cdp', score: partyPolicyScores.cdp.declining_birthrate, summary: '子育て支援策は具体的だが若者の所得・雇用環境改善策がやや弱い' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.declining_birthrate, summary: '経済支援と環境整備のバランスは良いが特徴的政策に欠ける' },
      { id: 'ishin', score: partyPolicyScores.ishin.declining_birthrate, summary: '教育支援など具体策はあるが総合的アプローチがやや弱い' },
      { id: 'jcp', score: partyPolicyScores.jcp.declining_birthrate, summary: '子育て・教育支援策は具体的だが財源確保策に疑問' }
    ]
  },
  
  education: {
    title: '教育政策',
    description: '教育の機会均等と質的向上、伝統的教育と革新的教育のバランスをどう図るかを評価',
    tradeoffs: tradeoffAnalysis.education.tradeoffs,
    bestApproach: tradeoffAnalysis.education.bestApproach,
    parties: [
      { id: 'jcp', score: partyPolicyScores.jcp.education, summary: '教育の無償化・機会均等化の提案は具体的で一貫' },
      { id: 'komeito', score: partyPolicyScores.komeito.education, summary: '教育無償化など支援策が具体的、家庭の教育費負担軽減に注力' },
      { id: 'cdp', score: partyPolicyScores.cdp.education, summary: '教育機会均等化を重視、高等教育無償化など具体策あり' },
      { id: 'ishin', score: partyPolicyScores.ishin.education, summary: '教育改革に積極的、特に教育行政改革の提案が具体的' },
      { id: 'ldp', score: partyPolicyScores.ldp.education, summary: 'デジタル人材育成など一定の方向性はあるが抜本改革には至らず' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.education, summary: '教育無償化など支援策は具体的だが財源確保策に疑問' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.education, summary: '教育政策は総花的で特徴的提案に乏しい' }
    ]
  },
  
  disaster_prevention: {
    title: '防災・減災',
    description: '事前防災と事後対応、ハード対策とソフト対策のバランスをどう図るかを評価',
    tradeoffs: tradeoffAnalysis.disaster_prevention.tradeoffs,
    bestApproach: tradeoffAnalysis.disaster_prevention.bestApproach,
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.disaster_prevention, summary: '国土強靭化推進で具体策あり、予算確保の姿勢も明確' },
      { id: 'komeito', score: partyPolicyScores.komeito.disaster_prevention, summary: '防災・減災対策は具体的、特に弱者支援の視点が強い' },
      { id: 'cdp', score: partyPolicyScores.cdp.disaster_prevention, summary: '被災者支援策は具体的だが予算確保策がやや不明確' },
      { id: 'ishin', score: partyPolicyScores.ishin.disaster_prevention, summary: '効率的・効果的な防災対策を志向、広域連携の視点あり' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.disaster_prevention, summary: '防災・減災対策は現実的だが独自性に欠ける' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.disaster_prevention, summary: '被災者支援策は評価できるがインフラ整備など総合的視点に欠ける' },
      { id: 'jcp', score: partyPolicyScores.jcp.disaster_prevention, summary: '被災者中心の政策は評価できるがハード対策が軽視されがち' }
    ]
  },
  
  constitutional_amendment: {
    title: '憲法改正',
    description: '憲法の基本原理維持と現代的課題への対応、国民的議論の喚起と合意形成プロセスをどう図るかを評価',
    tradeoffs: ['憲法の基本原理 vs 現実対応', '国民的合意 vs 政治的リーダーシップ', '9条改正 vs 統治機構改革'],
    bestApproach: '憲法の基本原理を尊重しつつ、現代的課題に対応するための憲法改正議論を進め、国民的合意形成プロセスを明示する政策が評価される。',
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.constitutional_amendment, summary: '改憲議論を積極的に推進、具体的項目を提示' },
      { id: 'ishin', score: partyPolicyScores.ishin.constitutional_amendment, summary: '統治機構改革など具体的な改憲項目を提示' },
      { id: 'komeito', score: partyPolicyScores.komeito.constitutional_amendment, summary: '改憲に慎重だが建設的議論には参加' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.constitutional_amendment, summary: '現実的な憲法論議に参加する姿勢' },
      { id: 'cdp', score: partyPolicyScores.cdp.constitutional_amendment, summary: '改憲に慎重だが建設的議論には一定の参加' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.constitutional_amendment, summary: '憲法9条擁護の立場は明確だが現実適応への柔軟性に欠ける' },
      { id: 'jcp', score: partyPolicyScores.jcp.constitutional_amendment, summary: '憲法9条堅持の立場は明確だが建設的議論に消極的' }
    ]
  },
  
  us_relations: {
    title: '対米関係',
    description: '日米同盟の維持・強化と自主性確保、経済と安全保障両面でのバランスをどう図るかを評価',
    tradeoffs: ['同盟協力 vs 自主性確保', '安全保障 vs 経済利益', '対抗 vs 協調'],
    bestApproach: '日米同盟を基軸としつつ対米自主性も確保し、安全保障と経済のバランスを取りながら現実的な国際関係を構築する政策が評価される。',
    parties: [
      { id: 'ldp', score: partyPolicyScores.ldp.us_relations, summary: '日米同盟重視で対応実績あり、経済・安保両面での現実的アプローチ' },
      { id: 'komeito', score: partyPolicyScores.komeito.us_relations, summary: '日米同盟を重視しつつ自主性も確保、現実的なバランス感覚あり' },
      { id: 'ishin', score: partyPolicyScores.ishin.us_relations, summary: '日米同盟を基軸に据えつつ対米交渉力強化も主張、現実的バランス' },
      { id: 'dpfp', score: partyPolicyScores.dpfp.us_relations, summary: '現実的な対米関係構築を志向するが具体的戦略はやや不明確' },
      { id: 'cdp', score: partyPolicyScores.cdp.us_relations, summary: '対等な日米関係を主張するが現実的な交渉戦略に乏しい' },
      { id: 'jcp', score: partyPolicyScores.jcp.us_relations, summary: '対米自立の姿勢は明確だが現実の相互依存と乖離、代替策も不明確' },
      { id: 'reiwa', score: partyPolicyScores.reiwa.us_relations, summary: '対米関係の抜本見直しを主張するが現実的な移行過程や代替策が不明確' }
    ]
  }
};

// 政策分野ごとの政党比較を取得する関数
export function getPolicyAreaComparison(policyId) {
  return policyAreaComparisons[policyId] || null;
}

// 政策分野リストを取得する関数
export function getPolicyAreaList() {
  return Object.keys(policyAreaComparisons).map(id => ({
    id,
    title: policyAreaComparisons[id].title,
    description: policyAreaComparisons[id].description
  }));
}

// トレードオフに基づく政策比較情報を取得する関数
export function getTradeoffAnalysis(policyId) {
  const policy = policyAreaComparisons[policyId];
  if (!policy) return null;
  
  return {
    tradeoffs: policy.tradeoffs,
    bestApproach: policy.bestApproach,
    parties: policy.parties.sort((a, b) => b.score - a.score).map(p => ({
      id: p.id,
      name: parties.find(party => party.id === p.id)?.name || p.id,
      score: p.score,
      summary: p.summary
    }))
  };
} 