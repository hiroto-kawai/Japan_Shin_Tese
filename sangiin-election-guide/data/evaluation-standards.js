// 政策評価の基本原則と評価基準
export const evaluationPrinciples = {
  title: '政策評価の基本原則',
  introduction: `
    政策課題の本質は、相反する価値や要求の間に生じるトレードオフにあります。経済成長と財政健全化、社会保障の充実と持続可能性、脱炭素とエネルギー安全保障、平和主義と安全保障など、どの政策課題も単一の価値だけでは解決できません。政治の本質的役割は、こうした相反する価値のバランスを取り、社会的矛盾を解決する道筋を示すことにあります。単一の価値だけを追求する政治は、社会の複雑な課題に対処できません。
    
    本サイトでは、各政党の政策を「相反する価値の統合」という観点から評価します。理想と現実のバランスを取り、具体的な実現プロセスを示す政策を高く評価します。
  `,
  evaluationPillars: [
    {
      title: '理念の統合性',
      description: '相反する価値のバランスを取る統合的ビジョンを持っているか。単一価値の追求ではなく、複数の重要な価値を両立させる視点があるか。'
    },
    {
      title: '目標設定の適切さ',
      description: '理想と現実のバランスが取れた目標になっているか。野心的でありながらも実現可能性を考慮した目標設定がなされているか。'
    },
    {
      title: 'マイルストーンの具体性',
      description: '目標達成のための具体的なプロセスと時間軸が示されているか。「いつまでに」「どのような段階を経て」実現するかが明確か。'
    }
  ],
  singleValueLimitation: `
    単一の価値だけを追求する政策には限界があります。例えば、「環境保護のみ」を追求すれば経済成長や雇用に影響が出る可能性があり、「安全保障のみ」を追求すれば財政負担や国際関係に影響します。政治の役割は、こうした相反する価値の間に最適なバランスを見出し、具体的な実現プロセスを示すことにあります。理想を掲げるだけでなく、その実現に至る道筋を現実的に示すことが重要です。
  `,
  idealAndReality: `
    政策評価において、「理想と現実のバランス」は極めて重要です。高い理想を掲げることは大切ですが、それが実現可能なプロセスを伴わなければ単なる願望で終わってしまいます。逆に、現実への対応だけを重視すれば、社会を前進させる理念やビジョンが欠如してしまいます。優れた政策とは、理想的な目標と現実的な実現プロセスを兼ね備えたものです。
  `
};

// 主要なトレードオフ関係の整理と評価基準
export const tradeoffAnalysis = {
  economic_growth: {
    tradeoffs: ['経済成長 vs 財政健全化', '成長 vs 分配', '規制緩和 vs 格差是正'],
    bestApproach: '成長戦略の具体性と財政規律への配慮を両立させ、明確なマイルストーンを設定している政党が評価される。成長と分配のバランスも重要な評価ポイント。',
    successFactors: '短期的な景気対策と中長期的な成長戦略の両立、財政健全化への具体的工程表、国際環境変化への対応力'
  },
  social_security: {
    tradeoffs: ['給付水準 vs 財政持続可能性', '現役世代 vs 高齢世代', '公的負担 vs 自己責任'],
    bestApproach: '給付の重点化と効率化を図りつつ、世代間格差是正と制度の持続可能性を両立させる統合的アプローチが評価される。',
    successFactors: '50年先を見据えた制度設計、世代間公平性への配慮、給付と負担のバランス調整の具体性'
  },
  energy_policy: {
    tradeoffs: ['脱炭素化 vs エネルギー安全保障', '環境性 vs 経済性', '理想 vs 現実'],
    bestApproach: '脱炭素化とエネルギー安全保障の両立を目指し、現実的な移行プロセスと具体的マイルストーンを示す統合的アプローチが評価される。',
    successFactors: '安定供給確保と脱炭素化の両立、コスト増への対策、産業競争力維持への配慮、段階的な移行プロセスの具体性'
  },
  security: {
    tradeoffs: ['平和主義 vs 現実的安全保障', '抑止力 vs 対話外交', '同盟強化 vs 自主防衛'],
    bestApproach: '平和主義の理念を尊重しつつ、現実の安保環境に対応する防衛力整備と外交努力を両立させる統合的アプローチが評価される。',
    successFactors: '現実的な安保環境認識、具体的な防衛政策、多角的な安保体制構築、危機管理能力'
  },
  declining_birthrate: {
    tradeoffs: ['経済支援 vs 環境整備', '家族支援 vs 個人支援', '短期対策 vs 長期対策'],
    bestApproach: '経済的支援と環境整備のバランスを取り、若者の経済基盤強化から子育て支援まで総合的アプローチを示す政策が評価される。',
    successFactors: '経済支援と環境整備の両立、若者の経済基盤強化、育児と仕事の両立支援、地域全体での子育て支援'
  },
  education: {
    tradeoffs: ['機会均等 vs 質の向上', '公教育 vs 家庭負担', '伝統的教育 vs 革新的教育'],
    bestApproach: '教育の機会均等と質的向上を両立させ、公教育の充実と家庭負担軽減のバランスを取る政策が評価される。',
    successFactors: '教育の無償化と質的向上の両立、多様性と基礎学力の両立、デジタル化と人間的成長の両立'
  },
  administrative_reform: {
    tradeoffs: ['デジタル化・効率化 vs プライバシー保護', '規制改革 vs 格差是正', '集中管理 vs 分散自治'],
    bestApproach: 'デジタル化の推進と個人情報保護・公平性を両立させ、効率化と行政サービスの質確保のバランスを取る統合的アプローチが評価される。',
    successFactors: '縦割り打破とデータ連携の実現、規制改革の推進力と既得権益への対抗力、デジタルデバイド対策と利便性向上の両立'
  },
  regional_revitalization: {
    tradeoffs: ['地方の自律性 vs 国全体の効率性', '多様性尊重 vs 財政的持続可能性', '伝統維持 vs 革新的発展'],
    bestApproach: '地方の多様性と自律性を尊重しながらも国全体の効率性を確保し、地域特性に応じた差別化と持続可能な支援を組み合わせる政策が評価される。',
    successFactors: '一極集中是正の具体策、地域資源を活かした産業育成、デジタル技術による地理的制約の克服、選択と集中の現実的アプローチ'
  },
  constitutional_amendment: {
    tradeoffs: ['伝統・国柄重視 vs 普遍的価値', '改革推進 vs 基本原理堅持', '統治機構効率化 vs 権力抑制'],
    bestApproach: '憲法の基本原理を尊重しつつ現代的課題に対応する統治機構改革を行い、イデオロギー対立を超えた建設的議論を展開する政策が評価される。',
    successFactors: '理念偏重でない現実的な憲法論議、統治機構の実効性向上と権力抑制のバランス、多様な政治参画促進と国民的議論の深化'
  },
  us_relations: {
    tradeoffs: ['対米協調 vs 自立性確保', '同盟強化 vs 国益優先', '二国間関係 vs 多角的外交'],
    bestApproach: '対米同盟関係の維持強化と日本の国益・自立性確保を両立させ、戦略的互恵関係の構築と多角的外交を展開する統合的アプローチが評価される。',
    successFactors: '現実的な対米交渉戦略、通商・安全保障面での具体的対応策、過度な対米依存からのリスクヘッジ、国際環境変化への柔軟な対応力'
  },
  disaster_prevention: {
    tradeoffs: ['事前防災 vs 復旧・復興', 'ハード対策 vs ソフト対策', '公助 vs 共助・自助'],
    bestApproach: '事前防災と事後対応、ハード対策とソフト対策、公助と共助・自助のバランスを取る総合的な防災政策が評価される。',
    successFactors: '防災インフラ整備と避難計画の両立、予算確保の具体性、災害弱者への配慮、地域防災力強化'
  }
};

// 政策評価の採点基準（10点満点）
export const scoringCriteria = {
  9_10: {
    description: '極めて優れた政策（9-10点）',
    criteria: [
      '相反する価値の統合を目指す明確なビジョンがある',
      '理想と現実のバランスが取れた具体的目標設定がある',
      '段階的な実施プロセスと明確な時間軸（マイルストーン）が示されている',
      '財源確保策や実現可能性への配慮が十分である',
      '国際環境の変化や緊急事態への対応策も含まれている'
    ]
  },
  7_8: {
    description: '優れた政策（7-8点）',
    criteria: [
      '相反する価値のバランスを考慮した政策アプローチがある',
      '現実的な目標設定がなされている',
      '実施プロセスがある程度示されている',
      '財源や実現可能性への一定の配慮がある',
      '環境変化への対応可能性がある'
    ]
  },
  5_6: {
    description: '標準的な政策（5-6点）',
    criteria: [
      '複数の価値への配慮はあるが統合的ビジョンがやや弱い',
      '目標設定は明確だが実現可能性にやや疑問がある',
      '実施プロセスの具体性が不足している',
      '財源確保策が不明確である',
      '環境変化への対応力に不安がある'
    ]
  },
  3_4: {
    description: '不十分な政策（3-4点）',
    criteria: [
      '単一価値の追求に偏り、相反する価値の統合視点が弱い',
      '理想と現実のバランスが取れていない目標設定',
      '実施プロセスやマイルストーンが示されていない',
      '財源確保策や実現可能性への配慮が著しく不足',
      '環境変化への対応策がない'
    ]
  },
  1_2: {
    description: '著しく不十分な政策（1-2点）',
    criteria: [
      '単一価値のみを追求し、相反する価値への配慮が全くない',
      '現実性を無視した理想論のみ、または理想のない場当たり的対応のみ',
      '実施プロセスが全く示されていない',
      '財源確保策や実現可能性を完全に無視している',
      '環境変化への対応が全く考慮されていない'
    ]
  }
};

// トレードオフの具体例
export const tradeoffExamples = {
  economic_growth: '経済成長と財政健全化のトレードオフ：歳出拡大で成長を促進すれば財政悪化のリスク、財政健全化を優先すれば成長鈍化のリスク',
  
  social_security: '社会保障の充実と財政的持続可能性のトレードオフ：給付を充実させれば国民負担増加と財政悪化のリスク、給付抑制すれば社会的セーフティネット弱体化のリスク',
  
  energy_policy: '脱炭素化とエネルギー安全保障のトレードオフ：再エネ急拡大は供給不安定化と価格高騰リスク、化石燃料依存は気候変動リスク',
  
  security: '平和主義理念と現実的安全保障のトレードオフ：防衛力強化は軍事的緊張増大リスク、防衛力不足は抑止力低下リスク',
  
  declining_birthrate: '子育て支援充実と財政負担のトレードオフ：支援拡大は財政悪化リスク、支援抑制は少子化加速リスク',
  
  education: '機会均等と教育の質・多様性のトレードオフ：標準化推進は画一化リスク、多様化推進は格差拡大リスク',
  
  administrative_reform: 'デジタル化推進とプライバシー保護のトレードオフ：データ連携強化はプライバシー侵害リスク、過度な保護は行政効率化の阻害リスク',
  
  regional_revitalization: '地方自律性と国全体効率性のトレードオフ：地方分権推進は非効率リスク、中央集権は地域の多様性喪失リスク',
  
  constitutional_amendment: '憲法改正推進と基本原理堅持のトレードオフ：改正推進は基本権侵害リスク、現状維持は時代適応の遅れリスク',
  
  us_relations: '対米協調と自立性確保のトレードオフ：対米追従は国益損失リスク、過度な自立志向は同盟関係悪化リスク',
  
  disaster_prevention: '事前防災投資と財政負担のトレードオフ：過剰投資は財政悪化リスク、投資不足は被害拡大リスク'
};

// 各評価基準の詳細説明
export const evaluationCriteriaDetails = {
  integration: {
    id: '①',
    name: '理念の統合性',
    description: '相反する価値の両立を目指す統合的ビジョンがあるか',
    details: '例えば「経済成長と財政健全化」「脱炭素とエネルギー安全保障」「平和主義と現実的安全保障」など、対立する価値を高次元で統合する視点があるかを評価します。単一の価値だけを追求する政策より、相反する価値のバランスを取る政策を高く評価します。'
  },
  goal: {
    id: '②',
    name: '目標設定の妥当性',
    description: '課題の本質を理解し、適切な目標を設定しているか',
    details: '目標が現実の課題に対応しているか、過大・過小ではないか、国際標準や科学的知見と整合しているかなどを判断します。また、数値目標の有無も重要な判断材料となります。'
  },
  milestone: {
    id: '③',
    name: 'マイルストーンの具体性',
    description: '理念と目標を実現するための具体的な道筋と時間軸があるか',
    details: '「いつまでに」「どのような手段で」「どのような段階を経て」目標を達成するかという時間軸と工程表の明確さがポイントです。抽象的な理念だけでなく、具体的な実現プロセスを示す政策を高く評価します。'
  },
  feasibility: {
    id: '④',
    name: '実現可能性',
    description: '技術的・経済的・社会的に実現可能な政策であるか',
    details: '財源の裏付け、技術的実現性、国民的合意形成の可能性などを総合的に判断します。理想的な目標でも実現手段が非現実的では意味がありません。'
  },
  international: {
    id: '⑤',
    name: '国際環境への対応力',
    description: '国際情勢の変化やグローバルなリスクに適切に対応できるか',
    details: 'トランプショックや中国の台頭、気候変動など国際環境の変化に対する備えと柔軟性を持った政策を高く評価します。'
  },
  balance: {
    id: '⑥',
    name: '単一価値追求の克服',
    description: '一面的な価値追求ではなく、多面的な視点を持っているか',
    details: '「分配のみ」「成長のみ」「環境のみ」「安全保障のみ」といった一面的なアプローチではなく、複数の価値をバランス良く統合する政策を高く評価します。'
  },
  roadmap: {
    id: '⑦',
    name: '工程表の明確さ',
    description: '政策実現のための具体的な工程表が示されているか',
    details: '短期・中期・長期のアクションプランと達成指標が明示されている政策を高く評価します。口先だけの政策ではなく、実現可能な工程表を持った政策が真に優れた政策です。'
  }
};

// 政党ごとの価値統合能力評価
export const partyIntegrationCapacity = {
  ldp: '経済成長と財政健全化、エネルギー安全保障と脱炭素化など、相反する価値の統合をある程度意識した政策が多い。ただし具体的なマイルストーンの明確さにやや欠ける面がある。',
  
  komeito: '分配と成長、環境と経済のバランスを意識した政策が多く、価値統合の視点はある。実現可能性とのバランスも考慮している。',
  
  cdp: '理念は明確だが、相反する価値の統合よりも特定の価値（分配、環境など）を優先する傾向がある。価値統合の視点にやや弱さがある。',
  
  ishin: '改革と現実のバランス、効率と公平のバランスなど、相反する価値の統合を意識した政策が多い。特に行財政改革分野で顕著。',
  
  dpfp: '現実的なバランス感覚はあるが、価値統合の独自性や具体性にやや欠ける面がある。中道的立場ながら特徴的な統合ビジョンに乏しい。',
  
  jcp: '「分配のみ」「平和主義のみ」「脱原発のみ」など単一価値の追求に偏り、相反する価値との統合を図る視点が著しく欠如している。理念は明確だが一面的で、政治の本質的役割を果たせていない。',
  
  reiwa: '「分配のみ」「脱原発のみ」など、理想を掲げる姿勢は評価できるが、相反する価値との統合や現実的な移行過程を示す視点が決定的に欠如している。単一価値の追求に終始し、政治の本質的役割を果たせていない。'
}; 