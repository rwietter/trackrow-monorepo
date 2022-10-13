import { styled } from '@/features/ui/theme';

export const HeaderDashboard = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Title = styled('h1', {
  fontSize: '2rem',
  fontFamily: 'Raleway',
  fontWeight: 700,
  color: '#303778',
});

export const Description = styled('p', {
  fontSize: '1.5rem',
  fontFamily: 'Prompt',
  fontWeight: 700,
  color: '#303778',
});