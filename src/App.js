

import { useEffect, useState } from 'react';
import './App.css';
import app from './game.json';
function App() {
  const [currentScene, setCurrentScene] = useState({})
  const [game, setgame] = useState(app)
  const [currentVariant, setCurrentVariant] = useState([])
  const [currentOptions, setCurrentOptions] = useState([])
  const [discription, setdiscription] = useState(true)
  useEffect(() => {
    setCurrentScene(game.scenes.scene_1);
    setCurrentVariant(game.scenes.scene_1.variants[Math.floor(Math.random() * game.scenes.scene_1.variants.length)])
    const option1 = game.scenes.scene_1.choices[Math.floor(Math.random() * game.scenes.scene_1.choices.length)]
    const remain = game.scenes.scene_1.choices.filter(c => c.id !== option1.id);
    const option2 = remain[Math.floor(Math.random() * remain.length)];
    setCurrentOptions([option1, option2])
  }, [])

  console.log(game);

  const [selected, setSelected] = useState(false);
  const clickHandler = id => {
    setSelected(true)
    setTimeout(() => {
      setSelected(false)
      const selectedoption = currentOptions.find(opt => { return opt.id === id })

      if (selectedoption.next.includes('scene')) {
        const nextscense = game.scenes[selectedoption.next]
        setCurrentScene(nextscense);
        setCurrentVariant(nextscense.variants[Math.floor(Math.random() * nextscense.variants.length)]);
        const option1 = nextscense.choices[Math.floor(Math.random() * nextscense.choices.length)]
        const remain = nextscense.choices.filter(choise => choise.id !== option1.id)
        const option2 = remain[Math.floor(Math.random() * remain.length)]
        setCurrentOptions([option1, option2])
        return;
      }
      if (selectedoption.next.includes('ending')) {
        const ending = game.endings[selectedoption.next]
        setCurrentVariant(ending.variants[0])
        setgame(prev => ({
          ...prev,
          state: {
            ...prev.state,
            flags: {
              ...prev.state.flags,
              "game-ended": true
            }
          }
        }
        ))
      }
    }, 1000);
  }
  return (
    <div className="App">
      <header className='header'>
        <h1>{app.meta.title}</h1>
      </header>

      {discription ? (
        <div className='discription'>
          <p className='discription-text'>{game.meta.description}</p>
          <button className='start' onClick={() => setdiscription(false)}>START</button>
          <footer className='footer'>
            <p className='logo'>T</p>
            <h3>© T3ZZAR , ALL RIGHT RESERVED</h3>
          </footer> </div>) : (
        <>
          <main className='main'>
            <h1>{currentVariant.text}</h1>

            {!game.state.flags['game-ended'] ? (
              <div className='actions'>
                <button
                  className={selected === true ? 'selected' : ''}
                  onClick={() => clickHandler(currentOptions[0]?.id)}>
                  {currentOptions[0]?.text}
                </button>
                <button
                  className={selected === true ? 'selected' : ''}
                  onClick={() => clickHandler(currentOptions[1]?.id)}>
                  {currentOptions[1]?.text}
                </button>
              </div>
            ) : (
              <h1>GAME OVER</h1>
            )}
          </main>

          <footer className='footer'>
            <p className='logo'>T</p>
            <h3>© T3ZZAR , ALL RIGHT RESERVED</h3>
          </footer>
        </>
      )}

    </div>
  );
}

export default App;
