import React, { Component } from "react";
import { getQuizQuestions } from "./getQuizQuestions";

class Game extends Component {
  state = {
    Players: [
      { name: "Julia", score: 0, hasBuzzed: false },
      { name: "Steve", score: 0, hasBuzzed: false },
      { name: "James", score: 0, hasBuzzed: false },
      { name: "Martha", score: 0, hasBuzzed: false },
    ],
    questions: getQuizQuestions(),
    currentQuestionIndex: 0,
    playerBuzzer: null,
  };

  handleBuzzerClick = (index) => {
    const { Players } = this.state;
    const updatedPlayers = [...Players];
    updatedPlayers[index].hasBuzzed = true;
    this.setState({ Players: updatedPlayers });
  };

  selectParticipantAnswer = (optionIndex) => {
    const { Players, currentQuestionIndex, questions } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.answer - 1;

    const updatedPlayers = Players.map((player) => {
      if (player.hasBuzzed && !player.hasSubmitted) {
        player.hasSubmitted = true;
        if (optionIndex === correctAnswerIndex) {
          player.score += 3;
          alert("Correct answer, You got 3 points");
        } else {
          player.score -= 1;
          alert("Wrong answer, You lose 1 point");
        }
      }
      return player;
    });

    const nextQuestionIndex = currentQuestionIndex + 1;

    this.setState({
      Players: updatedPlayers,
      currentQuestionIndex: nextQuestionIndex,
    });
    this.resetBuzzerColors();
  };

  resetBuzzerColors = () => {
    const { Players } = this.state;
    const resetPlayers = Players.map((player) => {
      player.hasBuzzed = false;
      player.hasSubmitted = false;
      return player;
    });
    this.setState({ Players: resetPlayers });
  };

  render() {
    const { Players, questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const isQuizOver = currentQuestionIndex >= questions.length;
    const anyPlayerBuzzed = Players.map((player) => player.hasBuzzed).reduce(
      (acc, hasBuzzed) => acc || hasBuzzed,
      false
    );

    const highestScore = Players.reduce(
      (maxScore, player) => {
        return player.score > maxScore ? player.score : maxScore;
      },
      Players.length > 0 ? Players[0].score : 0
    );

    const winners = Players.filter((player) => player.score === highestScore);

    return (
      <div className="container">
        <h1 className="text-center">Welcome to the Quiz Contest</h1>
        <h5 className="text-center">Participants</h5>
        <div className="row">
          {Players.map((participant, index) => (
            <div
              key={index}
              className={`col-2 mx-auto m-2 text-center ${
                participant.hasBuzzed ? "bg-success" : "bg-warning"
              }`}
            >
              <div>Name: {participant.name}</div>
              <div>Score: {participant.score}</div>
              <button
                className={`bg-light ${
                  participant.hasBuzzed ? "disabled" : ""
                }`}
                onClick={() => this.handleBuzzerClick(index)}
                disabled={participant.hasBuzzed}
              >
                Buzzer
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          {isQuizOver ? (
            <div>
              <h2>Quiz Over</h2>
              {winners.length === 1 ? (
                <h2>The Winner is {winners[0].name}</h2>
              ) : (
                <div>
                  <h2>
                    There is a Tie:{" "}
                    {winners.map((winner, index) => winner.name).join(", ")}
                  </h2>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2>Question {currentQuestionIndex + 1}</h2>
              <p>{currentQuestion.text}</p>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`btn btn-primary m-2 ${
                    anyPlayerBuzzed ? "" : "disabled"
                  }`}
                  onClick={() => this.selectParticipantAnswer(index)}
                  disabled={!anyPlayerBuzzed}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Game;

// import React, { Component } from "react";
// import { getQuizQuestions } from "./getQuizQuestions";

// class Game extends Component {
//   state = {
//     Players: [
//       { name: "Julia", score: 0, hasBuzzed: false },
//       { name: "Steve", score: 0, hasBuzzed: false },
//       { name: "James", score: 0, hasBuzzed: false },
//       { name: "Martha", score: 0, hasBuzzed: false },
//     ],
//     questions: getQuizQuestions(),
//     currentQuestionIndex: 0,
//     playerBuzzer: null,
//   };

//   handleBuzzerClick = (index) => {
//     const updatedPlayers = [...this.state.Players];
//     updatedPlayers[index].hasBuzzed = true;
//     this.setState({ Players: updatedPlayers });
//   };

//   render() {
//     const { Players, questions, currentQuestionIndex } = this.state;
//     const currentQuestion = questions[currentQuestionIndex];

//     return (
//       <div className="container">
//         <h1 className="text-center">Welcome to the Quiz Contest</h1>
//         <h5 className="text-center">Participants</h5>
//         <div className="row">
//           {Players.map((participant, index) => (
//             <div
//               key={index}
//               className={`col-2 mx-auto m-2 text-center ${
//                 participant.hasBuzzed ? "bg-success" : "bg-warning"
//               }`}
//             >
//               <div>Name: {participant.name}</div>
//               <div>Score: {participant.score}</div>
//               <button
//                 className="bg-light"
//                 onClick={() => this.handleBuzzerClick(index)}
//               >
//                 Buzzer
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="text-center">
//           {currentQuestionIndex < questions.length ? (
//             <div>
//               <h2>Question {currentQuestionIndex + 1}</h2>
//               <p>{currentQuestion.text}</p>
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   key={index}
//                   className="btn btn-primary m-2"
//                   onClick={() => this.SelectParticipant()}
//                 >
//                   {" "}
//                   {option}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <h2>Quiz Over</h2>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default Game;

// import React, { Component } from "react";
// import { getQuizQuestions } from "./getQuizQuestions";
// class Game extends Component {
//   state = {
//     Players: [
//       { name: "Julia", score: 0 },
//       { name: "Steve", score: 0 },
//       { name: "James", score: 0 },
//       { name: "Martha", score: 0 },
//     ],
//     questions: getQuizQuestions(),
//     currentQuestionIndex: 0,
//     playerBuzzer: null,
//   };

//   ChangeCOlor = ()=> {

//   }
//   render() {
//     const { Players, questions, currentQuestionIndex } = this.state;
//     const currentQuestion = questions[currentQuestionIndex];

//     return (
//       <div className="container">
//         <h1 className="text-center">Welcome to the Quiz Contest</h1>
//         <h5 className="text-center">Participants</h5>
//         <div className="row">
//           {Players.map((participant) => (
//             <div className="col-2 mx-auto m-2 text-center bg-warning">
//               <div>Name: {participant.name}</div>
//               <div>Score: {participant.score}</div>
//               <button className="btn btn-light" onClick={()=> this.ChangeC0lor()}>Buzzer</button>
//             </div>
//           ))}
//         </div>
//         <div className="text-center">
//           {currentQuestionIndex < questions.length ? (
//             <div>
//               <h2>Question {currentQuestionIndex + 1}</h2>
//               <p>{currentQuestion.text}</p>
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   className="btn btn-primary m-2"
//                   onClick={() => this.SelectParticipant()}
//                 >
//                   {" "}
//                   {option}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <h2>Quiz Over</h2>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default Game;
