import Comments from './components/Comments/Comments';
import styled from 'styled-components';

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`

function App() {
  return (
    <AppContainer>
      <Comments currentUserId={'1'} />
    </AppContainer>
  );
}

export default App;
