import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questionsSet from "../data/questions.json";
import reset from "../../src/assets/reset.png";
import "../AppQuestions.css";
import { usePostLeaderboard } from "../services/leaderboard";

export function Question() {
  const [answersMap, setAnswersMap] = useState(new Map());
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState({ name: false, question: false });
  const [toastFading, setToastFading] = useState({
    name: false,
    question: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mutateAsync } = usePostLeaderboard();

  const totalQuestions = questionsSet.length;

  const roundNearest10 = (num: number) => {
    return Math.round(num / 10) * 10;
  };

  const selectAnswer = (i: number, answer: number) => {
    setAnswersMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(i, answer);
      return newMap;
    });
  };

  const resetAnswer = (i: number) => {
    setAnswersMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(i);
      return newMap;
    });
  };

  const submitAnswers = async () => {
    let hasErrors = false;

    if (name.trim() === "") {
      setError((prev) => ({ ...prev, name: true }));
      nameInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      nameInputRef.current?.focus();
      hasErrors = true;
    }

    if (answersMap.size !== totalQuestions) {
      setError((prev) => ({ ...prev, question: true }));
      hasErrors = true;
    }

    if (hasErrors) return;

    // Calculate score
    let newScore = 0;
    questionsSet.forEach((_, index) => {
      const answered = answersMap.get(index + 1);
      const answer = roundNearest10(questionsSet[index].question);
      if (answered === answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowPopup(true);
    console.log("Quiz submitted! Score:", newScore);
    mutateAsync({
      name,
      score: newScore,
    });
  };

  const handleTryAgain = () => {
    setAnswersMap(new Map());
    setName("");
    setScore(0);
    setShowPopup(false);
    setError({ name: false, question: false });
    setToastFading({ name: false, question: false });
  };

  const handleGoLeaderboard = () => {
    setShowPopup(false);
    navigate("/leaderboard");
  };

  useEffect(() => {
    if (error.name) {
      const fadeTimer = setTimeout(() => {
        setToastFading((prev) => ({ ...prev, name: true }));
      }, 2500);

      const removeTimer = setTimeout(() => {
        setError((prev) => ({ ...prev, name: false }));
        setToastFading((prev) => ({ ...prev, name: false }));
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [error.name]);

  useEffect(() => {
    if (error.question) {
      const timer = setTimeout(() => {
        setError((prev) => ({ ...prev, question: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error.question]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-yellow-700 flex flex-col items-center py-6 md:py-10 relative">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 px-2">
          <div className="bg-gradient-to-br from-gray-800 via-teal-900 to-yellow-700 rounded-3xl shadow-2xl p-6 md:p-10 max-w-lg w-full flex flex-col items-center border-4 border-yellow-400">
            <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg flex items-center gap-2">
              🎉 Quiz Submitted! 🎉
            </h2>
            <p className="text-base md:text-lg text-teal-200 mb-6 font-semibold text-center">
              Your score is{" "}
              <span className="font-bold text-yellow-300">
                {score}/{totalQuestions}
              </span>
              . Well done!
            </p>
            {/* Score Bar */}
            <div className="w-40 md:w-48 bg-gray-700 rounded-full h-4 md:h-5 border-2 border-teal-400 mb-4">
              <div
                className="bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-700 h-4 md:h-5 rounded-full transition-all duration-300"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm md:text-md text-teal-200 mb-6">
              {score}/{totalQuestions}
            </span>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-2 w-full justify-center">
              <button
                onClick={handleTryAgain}
                className="w-full md:w-auto px-5 md:px-7 py-2.5 md:py-3 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-yellow-100 rounded-xl font-bold shadow-lg hover:from-teal-300 hover:via-teal-400 hover:to-teal-500 active:scale-95 transition-all duration-300 text-base md:text-lg"
              >
                Try Again
              </button>
              <button
                onClick={handleGoLeaderboard}
                className="w-full md:w-auto px-5 md:px-7 py-2.5 md:py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-teal-900 rounded-xl font-bold shadow-lg hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 active:scale-95 transition-all duration-300 text-base md:text-lg"
              >
                Go to Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 md:p-8 w-full max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 text-center mb-2 drop-shadow-lg">
          🎉 Rounding Off to Nearest 10 🎉
        </h1>
        {/* Navigation Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/leaderboard")}
            className="group relative px-6 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-teal-900 rounded-lg shadow-md hover:shadow-lg hover:from-teal-300 hover:via-teal-400 hover:to-teal-500 active:scale-95 transition-all duration-300 font-semibold text-lg transform hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              🏆 View Leaderboard
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
        <section className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6 md:gap-0">
          <div className="flex flex-col gap-2 mb-3 md:mb-0 w-full md:w-auto">
            <div className="flex gap-2 md:gap-3 items-center w-full">
              <span className="font-semibold text-lg text-teal-300">Name:</span>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full md:w-auto px-3 py-1 rounded-lg border-2 ${
                  error.name
                    ? "border-red-500 name-input-error"
                    : "border-yellow-400"
                } focus:border-teal-400 outline-none transition duration-200 bg-gray-700 text-yellow-200 placeholder-teal-300`}
              />
            </div>
            {error.name && (
              <span
                className={`text-red-400 text-xs md:text-sm ml-0 md:ml-16 error-message transition-all duration-500 ${
                  toastFading.name
                    ? "opacity-0 transform translate-y-2"
                    : "opacity-100 animate-pulse"
                }`}
              >
                ⚠️ Please enter your name
              </span>
            )}
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {questionsSet.map((item, index) => {
            const answered = answersMap.get(index + 1);
            return (
              <div
                key={index}
                className={`question-card
                   ${!answered && error.question ? "unanswered" : "answered"} 
                  bg-gradient-to-r from-teal-800/40 to-teal-700/40 p-1 rounded-2xl w-full`}
              >
                <div className="rounded-lg shadow p-3 md:p-4 flex flex-col gap-2">
                  <p className="font-semibold text-base md:text-md text-yellow-300 mb-2 text-center md:text-left">
                    {item.question} rounded off to the nearest 10 is:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center justify-between w-full">
                    <div className="flex gap-2 md:gap-4 items-center">
                      {item.options.map((option, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center w-full"
                        >
                          <input
                            value={option}
                            checked={answered === option}
                            type="radio"
                            onChange={() => selectAnswer(index + 1, option)}
                            className="accent-yellow-400 w-4 md:w-5 h-4 md:h-5 focus:outline-none"
                            id={`q${index + 1}-${idx}`}
                          />
                          <label
                            htmlFor={`q${index + 1}-${idx}`}
                            className="text-teal-200 font-medium cursor-pointer hover:text-yellow-400 transition text-xs md:text-base"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    <img
                      width={24}
                      height={24}
                      onClick={() => resetAnswer(index + 1)}
                      src={reset}
                      alt="Reset"
                      className="cursor-pointer hover:opacity-80 transition mx-auto md:mx-0"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <div className="flex justify-end mt-6 md:mt-8">
          <button
            onClick={() => submitAnswers()}
            className="group relative px-5 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 active:scale-95 transition-all duration-300 font-bold text-base md:text-xl transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Submit Quiz
              <svg
                className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div className="sticky bottom-4 w-full flex justify-center z-40">
        <span className="text-xs md:text-sm text-teal-100 bg-gray-700 bg-opacity-80 rounded-lg px-3 py-1 shadow border border-teal-500 text-center opacity-80">
          copyright:{" "}
          <a
            href="https://www.mathinenglish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-300 hover:text-yellow-400 pointer-events-auto"
          >
            www.mathinenglish.com
          </a>
        </span>
      </div>
    </div>
  );
}
