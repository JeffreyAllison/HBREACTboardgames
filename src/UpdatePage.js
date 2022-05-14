import React from 'react';
import { getGameById, updateGame } from './services/fetch-utils';
import { withRouter } from 'react-router-dom';

export default function UpdatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const { push } = useHistory();
  const { id } = useParams();
  const [gameInTheForm, setGameInTheForm] = useState({
    title: '',
    genre: '',
    designer: '',
    description: '',
    min_players: 0,
    max_players: 0,
  });

  useEffect(() => {
    async function load() {
      const game = await getGameById(id);

      setGameInTheForm(game);
    }
    load();
  }, [id]);

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    await updateGame(id, gameInTheForm);

    // use history.push to send the user to the list page
    push('/board-games');
  }

  return (
    <div className="update">
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleUpdateSubmit}>
        <h2>Add board game</h2>
        <label>
          Title
          {/* on change, set the title in state */}
          <input
            value={gameInTheForm.title}
            type="text"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                title: e.target.value,
              })
            }
            name="title"
          />
        </label>
        <label>
          Genre
          {/* on change, set the genre in state */}
          <select
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                genre: e.target.value,
              })
            }
            value={gameInTheForm.genre}
            name="genre"
          >
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
          Designer
          {/* on change, set the designer in state */}
          <input
            value={gameInTheForm.designer}
            type="text"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                designer: e.target.value,
              })
            }
            name="designer"
          />
        </label>
        <label>
          Min Players
          {/* on change, set the min players in state */}
          <input
            value={gameInTheForm.min_players}
            type="number"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                min_players: e.target.value,
              })
            }
            name="min_players"
          />
        </label>
        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            value={gameInTheForm.max_players}
            type="number"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                max_players: e.target.value,
              })
            }
            name="max_players"
          />
        </label>
        <label>
          Description
          {/* on change, set the description in state */}
          <input
            value={gameInTheForm.description}
            type="text"
            onChange={(e) =>
              setGameInTheForm({
                ...gameInTheForm,
                description: e.target.value,
              })
            }
            name="description"
          />
        </label>
        <button>Update game</button>
      </form>
    </div>
  );
}
