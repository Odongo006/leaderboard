class Scores {
  constructor() {
    this.gameURL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/";
    this.id = JSON.parse(localStorage.getItem("game-id")) || "";

    if (this.id === "") {
      this.getGameId();
    }
  }

  parseId(str) {
    const myArray = str.split(" ");
    return myArray[3];
  }

  async getGameId() {
    await fetch(this.gameURL, {
      method: "POST",
      body: JSON.stringify({ name: "Leaderboard Service Game" }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const retrievedId = this.parseId(json.result);
        localStorage.setItem("game-id", JSON.stringify(retrievedId));
        this.id = JSON.parse(localStorage.getItem("game-id"));
      });
  }

  async submitNewScore(name, score) {
    const scoresURL = `${this.gameURL}${this.id}/scores/`;
    await fetch(scoresURL, {
      method: "POST",
      body: JSON.stringify({ user: name, score: score }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  }

  async showScores(scores) {
    let scoresHtml = "";
    scoresHtml += '<table class="table table-hover table-sm table-striped\"><tbody>';
    scoresHtml += scores.reduce((total, current) => {
      total += `<tr><td>${current.user}: <span class="points">${current.score}</span></td></tr>`;
      return total;
    }, "");
    scoresHtml += "</tbody></table>";
    document.getElementById("score-table-container").innerHTML = scoresHtml;
  }

  async retrieveScores() {
    const scoresURL = `${this.gameURL}${this.id}/scores/`;
    await fetch(scoresURL)
      .then((response) => response.json())
      .then((json) => {
        this.showScores(json.result);
      });
  }
}

export default Scores;