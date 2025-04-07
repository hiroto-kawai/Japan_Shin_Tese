import React from 'react';
import { Paper, Typography, Box, Chip, Rating } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import { getPartyCharacteristics } from '../data/party-evaluations';

/**
 * 政党の価値統合能力を表示するカード型コンポーネント
 * @param {Object} props
 * @param {string} props.partyId - 政党ID
 * @param {string} props.partyColor - 政党のテーマカラー
 */
const PartyIntegrationCapacityCard = ({ partyId, partyColor }) => {
  const characteristics = getPartyCharacteristics(partyId);
  
  // 価値統合能力のスコアを算出（テキスト内容から推定）
  const getIntegrationScore = () => {
    const text = characteristics.valueIntegration.toLowerCase();
    if (text.includes('著しく欠如') || text.includes('決定的に欠如')) {
      return 1;
    } else if (text.includes('欠如') || text.includes('弱さがある')) {
      return 2;
    } else if (text.includes('やや弱さ') || text.includes('不十分')) {
      return 3;
    } else if (text.includes('ある程度') || text.includes('一定程度')) {
      return 4;
    } else if (text.includes('意識した') || text.includes('バランスを')) {
      return 4.5;
    }
    return 3; // デフォルト
  };
  
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderTop: `4px solid ${partyColor}`,
        borderRadius: '4px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <BalanceIcon sx={{ mr: 1, color: partyColor }} />
        <Typography variant="h6" component="h3">
          価値統合能力評価
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <Rating
            value={getIntegrationScore()}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`${getIntegrationScore()}/5`}
            size="small"
            sx={{
              bgcolor: partyColor,
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Box>
      </Box>
      
      <Typography variant="body2" paragraph>
        {characteristics.valueIntegration}
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
          政治的立場
        </Typography>
        <Typography variant="body2">
          {characteristics.politicalStance}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PartyIntegrationCapacityCard; 