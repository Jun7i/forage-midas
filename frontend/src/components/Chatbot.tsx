import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useTheme } from '@mui/material/styles';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your dashboard assistant. Ask me anything about the data!", sender: 'bot' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    // Simulate bot response
    setTimeout(() => {
      let response = "I see you're interested in the dashboard data. While I'm just a demo, this interface could help you analyze the transaction patterns and user behavior shown in the charts above.";
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);

    setInput('');
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SmartToyRoundedIcon color="primary" />
          <Typography component="h2" variant="subtitle2" sx={{ fontWeight: '600' }}>
            Dashboard Assistant
          </Typography>
        </Box>
        
        <Stack 
          spacing={1} 
          sx={{ 
            height: '100px',
            overflowY: 'auto',
            mb: 2
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {msg.sender === 'user' ? (
                <PersonRoundedIcon fontSize="small" color="primary" />
              ) : (
                <SmartToyRoundedIcon fontSize="small" color="primary" />
              )}
              <Typography
                sx={{
                  backgroundColor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                  color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                  p: 1,
                  borderRadius: 1,
                  maxWidth: '80%'
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Ask about the dashboard..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSend}
          >
            <SendRoundedIcon fontSize="small" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
