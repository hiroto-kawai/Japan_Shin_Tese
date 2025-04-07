import Link from 'next/link';
import styled from '@emotion/styled';
import Layout from '../components/Layout';
import { policyIssues } from '../data/issues';
import { parties } from '../data/parties';

const Hero = styled.section`
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: white;
  padding: 4rem 2rem;
  margin: -2rem -1rem 2rem;
  text-align: center;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background-color: ${props => props.primary === "true" ? 'white' : 'transparent'};
  color: ${props => props.primary === "true" ? '#3498db' : 'white'};
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.primary === "true" ? '#f8f9fa' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 4px;
    background-color: #3498db;
    margin: 1rem auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
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

const CardHeader = styled.div`
  padding: 1rem;
  background-color: ${props => props.color || '#3498db'};
  color: white;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardText = styled.p`
  margin-bottom: 1.5rem;
  color: #555;
`;

const CardButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
`;

const InfoTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
`;

const InfoText = styled.p`
  margin-bottom: 0;
  color: #555;
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #2980b9;
  }
`;

export default function Home() {
  // 重要度の高い課題を抽出（上位3つ）
  const topIssues = [...policyIssues]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 3);
  
  // 表示用に政党を3つ選択
  const featuredParties = parties.slice(0, 3);
  
  return (
    <Layout>
      <Hero>
        <HeroTitle>参議院選挙ガイド</HeroTitle>
        <HeroSubtitle>
          新社会人のための政治ガイド。参議院選挙の争点と各政党の立場を理解し、
          あなたの価値観に合った一票を投じるための情報サイトです。
        </HeroSubtitle>
        <ButtonGroup>
          <ButtonLink href="/issues" primary="true">
            政策課題を見る
          </ButtonLink>
          <ButtonLink href="/parties">
            政党を比較する
          </ButtonLink>
        </ButtonGroup>
      </Hero>

      <Section>
        <SectionTitle>日本の重要課題</SectionTitle>
        <Grid>
          {topIssues.map(issue => (
            <Card key={issue.id}>
              <CardHeader>
                <CardTitle>{issue.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>{issue.description}</CardText>
                <CardButtonLink href={`/issues#${issue.id}`}>
                  詳しく見る
                </CardButtonLink>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Section>

      <InfoBox>
        <InfoTitle>投票日を確認しましょう</InfoTitle>
        <InfoText>
          参議院議員選挙は3年ごとに行われ、議員の任期は6年です。
          投票日や期日前投票の情報は、お住まいの市区町村の選挙管理委員会のウェブサイトや広報で確認できます。
        </InfoText>
      </InfoBox>

      <InfoBox>
        <InfoTitle>政策評価の基本方針</InfoTitle>
        <InfoText>
          当サイトの政策評価は「トレードオフの認識と解決」を基本方針としています。
          政治とは相反する価値の対立を解消し、両立させる道筋を示すことにあると考えています。
          評価方針の詳細については、評価方針ページをご覧ください。
        </InfoText>
        <ButtonGroup style={{ marginTop: '1rem' }}>
          <CardButtonLink href="/evaluation-principles">
            評価方針について
          </CardButtonLink>
        </ButtonGroup>
      </InfoBox>

      <Section>
        <SectionTitle>政党を知る</SectionTitle>
        <Grid>
          {featuredParties.map(party => (
            <Card key={party.id}>
              <CardHeader color={party.color}>
                <CardTitle>{party.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>{party.description.substring(0, 100)}...</CardText>
                <CardButtonLink href={`/parties#${party.id}`}>
                  政策を見る
                </CardButtonLink>
              </CardBody>
            </Card>
          ))}
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <ViewAllButton href="/parties">
            すべての政党を見る
          </ViewAllButton>
        </div>
      </Section>
    </Layout>
  );
} 