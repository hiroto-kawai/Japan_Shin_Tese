import styled from '@emotion/styled';
import Layout from '../components/Layout';

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
`;

const SectionContent = styled.div`
  color: #555;
  line-height: 1.7;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    border-bottom: 1px dotted #3498db;
    
    &:hover {
      border-bottom: 1px solid #3498db;
    }
  }
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  
  h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

export default function About() {
  return (
    <Layout>
      <PageTitle>サイトについて</PageTitle>
      
      <ContentSection>
        <SectionTitle>サイトの目的</SectionTitle>
        <SectionContent>
          <p>
            「参議院選挙ガイド」は、特に新社会人の方々が初めて参加する参議院選挙に向けて、
            日本が直面する政策課題や各政党の立場を理解し、自分の価値観に合った選択ができるよう支援することを目的としています。
          </p>
          <p>
            政治や選挙は難しいと思われがちですが、私たちの生活に直結する重要な問題です。
            このサイトでは、複雑な政治的議論をできるだけ分かりやすく、
            かつ中立的な立場から解説することを心がけています。
          </p>
        </SectionContent>
        
        <SectionTitle>サイトの使い方</SectionTitle>
        <SectionContent>
          <h3>政策課題を知る</h3>
          <p>
            「政策課題」ページでは、現在の日本が直面している主要な課題を重要性と緊急性に基づいてマッピングしています。
            それぞれの課題について詳しい解説も提供していますので、まずは日本の課題について理解を深めましょう。
          </p>
          
          <h3>政党を比較する</h3>
          <p>
            「政党比較」ページでは、各政党の政策スコアをレーダーチャートで比較できます。
            最大3つの政党を選択して、政策分野ごとの違いを確認しましょう。
            あなたが重視する政策分野で高いスコアを持つ政党を見つけることができます。
          </p>
          
          <h3>用語を調べる</h3>
          <p>
            「用語集」ページでは、政治や経済に関する重要な用語を解説しています。
            分からない用語があれば、カテゴリー別に閲覧したり、検索したりすることができます。
          </p>
        </SectionContent>
        
        <SectionTitle>データについて</SectionTitle>
        <SectionContent>
          <p>
            当サイトで提供している政策課題の評価や政党のスコアは、以下の情報源に基づいて作成しています：
          </p>
          <ul>
            <li>各政党の公式ウェブサイトや選挙公約</li>
            <li>国会での発言や投票行動</li>
            <li>政府機関による統計データや白書</li>
            <li>独立した政策研究機関のレポート</li>
            <li>有識者の分析や論評</li>
          </ul>
          <p>
            評価方法としては、政策の実現可能性、具体性、持続可能性、社会的影響などの観点から、
            複数の視点を組み合わせて総合的に判断しています。
          </p>
          
          <InfoBox>
            <h3>免責事項</h3>
            <p>
              当サイトは特定の政党や政治的立場を支持・推奨するものではありません。
              掲載情報の正確性には細心の注意を払っていますが、完全性・正確性を保証するものではありません。
              最終的な投票判断は、このサイトだけでなく、各政党の公式情報や選挙公報なども参考にして、
              ご自身の責任で行ってください。
            </p>
          </InfoBox>
        </SectionContent>
        
        <SectionTitle>サイト運営者について</SectionTitle>
        <SectionContent>
          <p>
            当サイトは、新社会人の政治参加を促進したいと考える有志によって運営されています。
            特定の政党や団体からの支援は受けておらず、中立的な立場から情報提供を行っています。
          </p>
          <p>
            ご意見やお問い合わせ、また誤りを見つけた場合は、お手数ですがサイト内のフッターにある
            連絡先までご連絡ください。
          </p>
        </SectionContent>
      </ContentSection>
    </Layout>
  );
} 