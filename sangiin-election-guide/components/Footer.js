import Link from 'next/link';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 1rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 0.75rem;
  }
`;

const FooterLink = styled(Link)`
  color: #ecf0f1;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

const ExternalLink = styled.a`
  color: #ecf0f1;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

const Disclaimer = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
  margin-top: 1rem;
`;

const Copyright = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>サイトマップ</h3>
          <ul>
            <li>
              <FooterLink href="/">
                ホーム
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/issues">
                政策課題
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/parties">
                政党比較
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/glossary">
                用語集
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/about">
                サイトについて
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>参考資料</h3>
          <ul>
            <li>
              <ExternalLink href="https://www.soumu.go.jp/" target="_blank" rel="noopener noreferrer">
                総務省
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.sangiin.go.jp/" target="_blank" rel="noopener noreferrer">
                参議院
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.cao.go.jp/" target="_blank" rel="noopener noreferrer">
                内閣府
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.stat.go.jp/" target="_blank" rel="noopener noreferrer">
                統計局
              </ExternalLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>免責事項</h3>
          <Disclaimer>
            本サイトは、参議院選挙における政策課題と各政党の立場を中立的な立場から解説することを目的としています。
            掲載情報の正確性には細心の注意を払っていますが、内容の完全性・正確性を保証するものではありません。
            ご利用に際しては、公式情報や各政党の公式見解も併せてご参照ください。
          </Disclaimer>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {currentYear} 参議院選挙ガイド - 新社会人のための政治ガイド
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 