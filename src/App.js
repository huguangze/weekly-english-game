
import React, {useState} from 'react';
import { Button, Flex, FloatButton} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import TongueTwisters from './pages/tongue-twisters';
import WordCraft from './pages/word-craft';
import './App.css';


function App() {

  const [game, setGame] = useState();

  return (
    <div className="App">
      {
        game ? (
          game === 'tongueTwister' ? <TongueTwisters /> : <WordCraft />
        ) : (<Flex gap={10}>
          <Button size='large' type='primary' onClick={() => setGame("tongueTwister")}>Tongue twister</Button>
          <Button size='large' type='primary' onClick={() => setGame("workCraft")} >Word Craft</Button>
        </Flex>)
      }
      {game && <FloatButton icon={<RollbackOutlined />}  onClick={() => setGame(null)} />}

    </div>
  );
}

export default App;
