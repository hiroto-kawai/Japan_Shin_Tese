// 用語集データ
export const glossaryTerms = [
  {
    id: 'fiscal_consolidation',
    term: '財政健全化',
    category: 'economy',
    description: '国の収入と支出のバランスを改善し、財政赤字や政府債務を持続可能な水準に抑制する取り組み。日本は国・地方の長期債務残高がGDP比で約260%に達し、先進国で最悪の水準となっている。',
    relatedTerms: ['primary_balance', 'government_bond']
  },
  {
    id: 'primary_balance',
    term: 'プライマリーバランス（基礎的財政収支）',
    category: 'economy',
    description: '国の政策的な収入と支出のバランスを示す指標。税収等の歳入から、国債の元利払い費を除いた歳出を差し引いたもの。これが均衡していれば、過去の借金の元利払いを除けば収支が均衡していることになる。',
    relatedTerms: ['fiscal_consolidation', 'government_bond']
  },
  {
    id: 'government_bond',
    term: '国債',
    category: 'economy',
    description: '国が財源を調達するために発行する債券。日本の国債残高は約1,200兆円に達し、国民一人当たり約950万円の借金を抱えている計算になる。',
    relatedTerms: ['fiscal_consolidation', 'primary_balance']
  },
  {
    id: 'pension_system',
    term: '年金制度',
    category: 'social_security',
    description: '老後の生活を支えるための公的な所得保障制度。日本では国民年金（1階部分）と厚生年金（2階部分）の二階建て構造になっている。少子高齢化により制度の持続可能性が課題となっている。',
    relatedTerms: ['social_security', 'aging_society']
  },
  {
    id: 'social_security',
    term: '社会保障制度',
    category: 'social_security',
    description: '病気・老齢・失業など様々なリスクから国民を守るための制度の総称。年金・医療・介護・雇用・福祉などの各制度から成り、国民の生活を支える重要なセーフティネットとなっている。',
    relatedTerms: ['pension_system', 'medical_insurance', 'nursing_care_insurance']
  },
  {
    id: 'aging_society',
    term: '少子高齢化',
    category: 'social_security',
    description: '出生率の低下による子どもの減少と平均寿命の延伸による高齢者の増加が同時に進行する現象。日本は世界で最も高齢化が進んだ国で、2025年には65歳以上の人口が約30%に達する見込み。',
    relatedTerms: ['birth_rate', 'population_decline']
  },
  {
    id: 'birth_rate',
    term: '出生率',
    category: 'population',
    description: '人口1,000人当たりの出生数。また、合計特殊出生率は一人の女性が生涯に産む子どもの平均数を示す。日本の合計特殊出生率は2022年に1.26となり、人口維持に必要な2.07を大きく下回っている。',
    relatedTerms: ['population_decline', 'aging_society']
  },
  {
    id: 'population_decline',
    term: '人口減少',
    category: 'population',
    description: '死亡数が出生数を上回り、総人口が減少する現象。日本は2008年をピークに人口減少局面に入り、2050年には約1億人、2100年には約6,000万人まで減少すると予測されている。',
    relatedTerms: ['birth_rate', 'aging_society']
  },
  {
    id: 'decarbonization',
    term: '脱炭素',
    category: 'energy',
    description: '温室効果ガス（主に二酸化炭素）の排出を実質ゼロにすることを目指す取り組み。日本は2050年カーボンニュートラル（実質排出ゼロ）を目標に掲げている。',
    relatedTerms: ['renewable_energy', 'energy_security']
  },
  {
    id: 'renewable_energy',
    term: '再生可能エネルギー',
    category: 'energy',
    description: '太陽光、風力、水力、地熱、バイオマスなど、自然界で繰り返し利用できるエネルギー源。化石燃料と異なり、理論上は枯渇せず、二酸化炭素排出量も少ないことが特徴。',
    relatedTerms: ['decarbonization', 'energy_security']
  },
  {
    id: 'energy_security',
    term: 'エネルギー安全保障',
    category: 'energy',
    description: '国民生活や経済活動に必要なエネルギーを安定的に確保すること。日本はエネルギー自給率が約12%と低く、化石燃料の多くを輸入に依存しているため、安全保障上の課題となっている。',
    relatedTerms: ['renewable_energy', 'nuclear_power']
  },
  {
    id: 'nuclear_power',
    term: '原子力発電',
    category: 'energy',
    description: 'ウランなどの核分裂によって発生するエネルギーを利用した発電方式。二酸化炭素をほとんど排出しない一方、事故リスクや放射性廃棄物処理など課題も多い。日本では東日本大震災以降、安全性への懸念から多くの原発が停止している。',
    relatedTerms: ['energy_security', 'renewable_energy']
  },
  {
    id: 'defense_spending',
    term: '防衛費',
    category: 'security',
    description: '国家の安全を守るための軍事的支出。日本は長らくGDP比1%程度を目安としてきたが、安全保障環境の悪化を受け、2027年度までにGDP比2%（NATO基準）程度への引き上げを目指している。',
    relatedTerms: ['japan_us_alliance', 'collective_self_defense']
  },
  {
    id: 'japan_us_alliance',
    term: '日米同盟',
    category: 'security',
    description: '日米安全保障条約に基づく日本とアメリカの同盟関係。日本の安全保障の要石とされ、日本の防衛と東アジアの安定に重要な役割を果たしている。',
    relatedTerms: ['defense_spending', 'collective_self_defense']
  },
  {
    id: 'collective_self_defense',
    term: '集団的自衛権',
    category: 'security',
    description: '同盟国が攻撃された場合に、自国が直接攻撃されていなくても実力をもって阻止する権利。日本は2015年の安全保障関連法で、限定的な行使を認める方向に解釈を変更した。',
    relatedTerms: ['japan_us_alliance', 'defense_spending', 'article_9']
  },
  {
    id: 'digital_transformation',
    term: 'デジタルトランスフォーメーション（DX）',
    category: 'digital',
    description: 'デジタル技術を浸透させることで、組織や社会のあり方を根本から変革すること。日本では行政手続きのオンライン化や、データ活用による社会課題解決などが進められている。',
    relatedTerms: ['digital_agency', 'my_number']
  },
  {
    id: 'digital_agency',
    term: 'デジタル庁',
    category: 'digital',
    description: '2021年9月に発足した行政機関。行政のデジタル化を統括し、縦割り行政の弊害を排除しながらデジタル社会の形成に関する施策を推進することを目的としている。',
    relatedTerms: ['digital_transformation', 'my_number']
  },
  {
    id: 'my_number',
    term: 'マイナンバー制度',
    category: 'digital',
    description: '国民一人ひとりに割り当てられた12桁の個人番号を基盤とした社会保障・税・災害対策の行政手続きを効率化するための制度。マイナンバーカードの普及拡大が課題となっている。',
    relatedTerms: ['digital_transformation', 'digital_agency']
  },
  {
    id: 'local_autonomy',
    term: '地方分権',
    category: 'regional',
    description: '中央政府から地方自治体に権限や財源を移譲し、地方の自主性・自立性を高めること。地域の実情に合った政策を実施するために重要とされている。',
    relatedTerms: ['regional_revitalization', 'local_tax']
  },
  {
    id: 'regional_revitalization',
    term: '地方創生',
    category: 'regional',
    description: '人口減少と東京一極集中の流れを変え、地方の活力を取り戻すための取り組み。2014年に「まち・ひと・しごと創生本部」が設置され、各地域の特色を活かした政策が推進されている。',
    relatedTerms: ['local_autonomy', 'population_decline']
  },
  {
    id: 'article_9',
    term: '憲法9条',
    category: 'politics',
    description: '日本国憲法第9条。国際紛争を解決する手段としての戦争放棄と、戦力の不保持を定めている。自衛隊の存在や役割について解釈が分かれ、改憲論議の中心となっている。',
    relatedTerms: ['constitutional_amendment', 'collective_self_defense']
  },
  {
    id: 'constitutional_amendment',
    term: '憲法改正',
    category: 'politics',
    description: '日本国憲法の内容を変更すること。衆参両院の3分の2以上の賛成で発議し、国民投票で過半数の賛成を得る必要がある。戦後一度も改正されていない。',
    relatedTerms: ['article_9', 'national_referendum']
  },
  {
    id: 'mmt',
    term: '現代貨幣理論（MMT）',
    category: 'economy',
    description: '自国通貨を発行できる政府は財政的な制約を受けず、インフレが起きるまで財政支出を拡大できるとする経済理論。一部の野党が主張するが、主流派経済学からは批判も多い。',
    relatedTerms: ['fiscal_consolidation', 'inflation']
  },
  {
    id: 'economic_security',
    term: '経済安全保障',
    category: 'security',
    description: '国家の安全保障と経済を一体的に捉え、重要技術・物資の確保やサプライチェーンの強靭化を図ること。国際情勢の変化を受け、2022年に経済安全保障推進法が成立した。',
    relatedTerms: ['supply_chain', 'critical_technology']
  }
];

// カテゴリー定義
export const glossaryCategories = [
  { id: 'economy', name: '経済', color: '#2980b9' },
  { id: 'social_security', name: '社会保障', color: '#8e44ad' },
  { id: 'population', name: '人口問題', color: '#c0392b' },
  { id: 'energy', name: 'エネルギー・環境', color: '#27ae60' },
  { id: 'security', name: '安全保障・外交', color: '#d35400' },
  { id: 'digital', name: 'デジタル・行政', color: '#16a085' },
  { id: 'regional', name: '地方創生', color: '#f39c12' },
  { id: 'politics', name: '政治・憲法', color: '#7f8c8d' }
]; 