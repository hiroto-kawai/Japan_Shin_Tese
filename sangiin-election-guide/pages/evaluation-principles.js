import React from 'react';
import { Box, Typography, Container, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Grid, Chip, Card, CardContent } from '@mui/material';
import Layout from '../components/Layout';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BalanceIcon from '@mui/icons-material/Balance';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningIcon from '@mui/icons-material/Warning';
import ScoreIcon from '@mui/icons-material/Score';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  evaluationPrinciples,
  tradeoffExamples,
  partyIntegrationCapacity,
  evaluationCriteriaDetails
} from '../data/evaluation-standards';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function EvaluationPrinciplesPage() {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              政策評価の基本方針
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CompareArrowsIcon sx={{ mr: 1 }} />
                トレードオフの認識と解決こそが政治の本質
              </Typography>
              <Typography paragraph>
                あらゆる政策課題は根本的に「トレードオフ問題」です。相反する複数の価値や要求が衝突する中で、単一の価値だけを追求することは現実的ではありません。「課題」として存在している時点で、そこには何らかのトレードオフが存在し、相反する別の問題が存在していて、矛盾の解消が必要なのです。
              </Typography>
              
              <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
                <Typography variant="h6" gutterBottom>
                  弁証法的思考による政策評価
                </Typography>
                <Typography paragraph>
                  当サイトの評価軸は、ヘーゲル弁証法の枠組みに基づいています：
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>1.</ListItemIcon>
                    <ListItemText 
                      primary="テーゼ（正）" 
                      secondary="最初の価値や主張（例：経済成長、脱炭素化、平和主義など）" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>2.</ListItemIcon>
                    <ListItemText 
                      primary="アンチテーゼ（反）" 
                      secondary="テーゼと対立する価値や主張（例：財政健全化、エネルギー安全保障、現実的防衛政策など）" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>3.</ListItemIcon>
                    <ListItemText 
                      primary="ジンテーゼ（合）" 
                      secondary="対立する二つの価値を高い次元で統合する解決策。これを提示することこそが政治の本質的役割です。" 
                    />
                  </ListItem>
                </List>
                <Typography>
                  単一の価値（テーゼのみ、またはアンチテーゼのみ）を追求する政策は低評価となり、
                  相反する価値の両方を認識しつつ、それらを統合する道筋（ジンテーゼ）を示す政策が高評価となります。
                </Typography>
              </Paper>
              
              <Box sx={{ my: 2, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  主な政策トレードオフの例
                </Typography>
                <List>
                  {Object.entries(tradeoffExamples).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemIcon>
                        <BalanceIcon />
                      </ListItemIcon>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
              <Typography paragraph>
                これらの矛盾する価値の対立を解消し、両立させる道筋を示すことこそが、政治の本質的役割です。
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TimelineIcon sx={{ mr: 1 }} />
                評価の3つの柱
              </Typography>
              <Typography paragraph>
                優れた政策は以下の3つの要素をバランス良く備えています：
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>1.</ListItemIcon>
                  <ListItemText 
                    primary="理念の統合性" 
                    secondary="相反する価値の両立を目指す統合的ビジョンがあるか" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>2.</ListItemIcon>
                  <ListItemText 
                    primary="目標設定の妥当性" 
                    secondary="課題の本質を理解し、適切な目標を設定しているか" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>3.</ListItemIcon>
                  <ListItemText 
                    primary="マイルストーンの具体性" 
                    secondary="理念と目標を実現するための具体的な道筋と時間軸があるか" 
                  />
                </ListItem>
              </List>
              <Typography paragraph>
                どれか一つが欠けても、実効性のある政策とは言えません。
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ mr: 1 }} />
                単一価値追求の限界
              </Typography>
              <Typography paragraph>
                単一の価値や理念のみを追求する政策は、一面的で現実性に欠け、社会的課題の解決に至りません。以下のような一面的なアプローチは高く評価できません：
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="「理想のみ」で現実を無視" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="「現実のみ」で理想を放棄" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="「分配のみ」で成長を軽視" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="「成長のみ」で分配を軽視" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="「脱炭素のみ」でエネルギー安全保障を無視" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="「安全保障のみ」で平和主義の理念を放棄" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Typography paragraph>
                相反する価値のバランスを取りながら総合的な解決策を提示する政策を高く評価します。
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ScoreIcon sx={{ mr: 1 }} />
                基準と評価点の関係
              </Typography>
              <Typography paragraph>
                10点満点の評価点は、概ね以下の基準に基づいています：
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="8-10点：相反する価値の統合的ビジョンがあり、具体的な目標とマイルストーンが示されている" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="6-7点：相反する価値のバランスを意識し、一定の具体性がある" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="4-5点：理念や目標はあるが、価値の統合性または実現可能性に不安がある" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="2-3点：単一価値の追求に偏り、相反する価値との統合を図る視点が欠如している" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="0-1点：理念も目標も具体性もなく、課題の本質を理解していない" 
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagCircleIcon sx={{ mr: 1 }} />
                マイルストーンの重要性
              </Typography>
              <Typography paragraph>
                単なる理念や抽象的な目標だけでは不十分です。「いつまでに」「どのような手段で」「どのような段階を経て」目標を達成するかという具体的なプロセスと時間軸が明示されている政策を高く評価します。口先だけの政策ではなく、実現可能な工程表を持った政策が真に優れた政策です。
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1 }} />
                評価基準の詳細
              </Typography>
              <Typography paragraph>
                政策評価では以下の7つの基準を用いています：
              </Typography>
              
              <Grid container spacing={3}>
                {Object.values(evaluationCriteriaDetails).map((criteria) => (
                  <Grid item xs={12} key={criteria.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            label={criteria.id} 
                            size="small" 
                            sx={{ mr: 1, bgcolor: '#f0e9fe', color: '#9b59b6' }} 
                          />
                          <Typography variant="h6">
                            {criteria.name}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {criteria.description}
                        </Typography>
                        <Typography variant="body2">
                          {criteria.details}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                各政党の価値統合能力評価
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(partyIntegrationCapacity).map(([partyId, evaluation]) => (
                  <Grid item xs={12} sm={6} key={partyId}>
                    <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        {getPartyName(partyId)}
                      </Typography>
                      <Typography variant="body2">
                        {evaluation}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

function getPartyName(partyId) {
  const partyNames = {
    ldp: '自由民主党',
    komeito: '公明党',
    cdp: '立憲民主党',
    ishin: '日本維新の会',
    dpfp: '国民民主党',
    jcp: '日本共産党',
    reiwa: 'れいわ新選組'
  };
  return partyNames[partyId] || partyId;
} 