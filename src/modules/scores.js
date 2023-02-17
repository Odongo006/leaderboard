class Scores {
  constructor() {
    this.gameURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.id = JSON.parse(localStorage.getItem('game-id')) || [];
    if (this.id.length < 1) {
      this.getGameId();
    }
  }

    parseId = (str) => {
      const myArray = str.split(' ');
      return myArray[3];
    }

    getGameId = async () => {
      await fetch(this.gameURL, {
        method: 'POST',
        body: JSON.stringify({ name: 'Leaderboard Service Game' }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const retrievedId = this.parseId(json.result);
          localStorage.setItem('game-id', JSON.stringify(retrievedId));
          this.id = JSON.parse(localStorage.getItem('game-id')) || [];
        });
    }

    submitNewScore = async (name, score) => {
      const scoresURL = `${this.gameURL + this.id}/scores/`;
      await fetch(scoresURL, {
        method: 'POST',
        body: JSON.stringify({ user: name, score }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json());
    }

    showScores = async (scores) => {
      let scoresHtml = '';
      scoresHtml += '<table class="table table-hover table-sm table-striped"><tbody>';
      scoresHtml += scores.reduce((total, current) => {
        total += `<tr><td>${current.user}: <span class="points">${current.score}</span></td></tr>`;
        return total;
      }, '');
      scoresHtml += '</tbody></table>';
      document.getElementById('score-table-container').innerHTML = scoresHtml;
    };

    retrieveScores = async () => {
      const scoresURL = `${this.gameURL + this.id}/scores/`;
      await fetch(scoresURL).then((response) => response.json())
        .then((json) => {
          this.showScores(json.result);
        });
    }
}

export default Scores;