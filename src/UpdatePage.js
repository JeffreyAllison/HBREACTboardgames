import React from 'react';
import { getGameById, updateGame } from './services/fetch-utils';
import { withRouter } from 'react-router-dom';

// you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
export default withRouter(
  class UpdatePage extends React.Component {
    constructor() {
      super();
      this.state = {
        title: '',
        genre: 'Tile-laying',
        designer: '',
        description: '',
        min_players: 0,
        max_players: 0,
      };
    }

    /*useEffect(() => {
    async function load() {
      const game = await getGameById(id);

      setGameInTheForm(game);
    }
    load();
  }, [id]);*/

    async componentDidMount() {
      const game = await getGameById(this.props.match.params.id);
      this.setState({ ...game });
    }

    handleUpdateSubmit = async (e) => {
      e.preventDefault();

      await updateGame(this.props.match.params.id, this.state);

      // use history.push to send the user to the list page
      this.props.history.push('/board-games');
    };

    render() {
      return (
        <div className="update">
          {/* on submit, call your handleSubmit function */}
          <form onSubmit={this.handleUpdateSubmit}>
            <h2>Add board game</h2>
            <label>
              Title
              {/* on change, set the title in state */}
              <input
                value={this.state.title}
                type="text"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
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
                  this.setState({
                    ...this.state,
                    genre: e.target.value,
                  })
                }
                value={this.state.genre}
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
                value={this.state.designer}
                type="text"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
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
                value={this.state.min_players}
                type="number"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
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
                value={this.state.max_players}
                type="number"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
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
                value={this.state.description}
                type="text"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
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
  }
);
