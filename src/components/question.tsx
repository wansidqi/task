import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questionsSet from "../components/questions.json";
import reset from "../../src/assets/reset.png";
import "../AppQuestions.css";

export function Question() {
  const [answersMap, setAnswersMap] = useState(new Map());
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState({ name: false, question: false });
  const [toastFading, setToastFading] = useState({
    name: false,
    question: false,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const submitAnswers = () => {
    let hasErrors = false;

    if (name.trim() === "") {
      setToast((prev) => ({ ...prev, name: true }));
      nameInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      nameInputRef.current?.focus();
      hasErrors = true;
    }

    if (answersMap.size !== totalQuestions) {
      setToast((prev) => ({ ...prev, question: true }));
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
    console.log("Quiz submitted! Score:", newScore);
  };

  useEffect(() => {
    if (toast.name) {
      const fadeTimer = setTimeout(() => {
        setToastFading((prev) => ({ ...prev, name: true }));
      }, 2500); // Start fading 500ms before removal

      const removeTimer = setTimeout(() => {
        setToast((prev) => ({ ...prev, name: false }));
        setToastFading((prev) => ({ ...prev, name: false }));
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [toast.name]);

  useEffect(() => {
    if (toast.question) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, question: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.question]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-yellow-700 flex flex-col items-center py-10">
      <div className="p-8 w-full max-w-4xl">
        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-2 drop-shadow-lg">
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

        <section className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex flex-col gap-2 mb-3 md:mb-0">
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-lg text-teal-300">Name:</span>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`px-3 py-1 rounded-lg border-2 ${
                  toast.name
                    ? "border-red-500 name-input-error"
                    : "border-yellow-400"
                } focus:border-teal-400 outline-none transition duration-200 bg-gray-700 text-yellow-200 placeholder-teal-300`}
              />
            </div>
            {toast.name && (
              <span
                className={`text-red-400 text-sm ml-16 error-message transition-all duration-500 ${
                  toastFading.name
                    ? "opacity-0 transform translate-y-2"
                    : "opacity-100 animate-pulse"
                }`}
              >
                ⚠️ Please enter your name
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-lg text-yellow-300">
              Score:
            </span>
            <div className="w-40 bg-gray-700 rounded-full h-4 border border-teal-500">
              <div
                className="bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-700 h-4 rounded-full transition-all duration-300"
                style={{
                  width: `${(score / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-teal-200">
              {score}/{totalQuestions}
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {questionsSet.map((item, index) => {
            const answered = answersMap.get(index + 1);
            return (
              <div
                key={index}
                className={`question-card
                   ${!answered && toast.question ? "unanswered" : "answered"} 
                  bg-teal-900 p-1 rounded-2xl`}
              >
                <div className="rounded-lg shadow p-4">
                  <p className="font-semibold text-md text-yellow-300 mb-2">
                    {item.question} rounded off to the nearest 10 is:
                  </p>
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      {item.options.map((option, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <input
                            value={option}
                            checked={answered === option}
                            type="radio"
                            onChange={() => selectAnswer(index + 1, option)}
                            className="accent-yellow-400 w-5 h-5 focus:outline-none"
                            id={`q${index + 1}-opt${idx}`}
                          />
                          <label
                            htmlFor={`q${index + 1}-opt${idx}`}
                            className="text-teal-200 font-medium cursor-pointer hover:text-yellow-400 transition"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    <img
                      width={30}
                      height={30}
                      onClick={() => resetAnswer(index + 1)}
                      src={reset}
                      alt="Reset"
                      className="cursor-pointer hover:opacity-80 transition"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => submitAnswers()}
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 active:scale-95 transition-all duration-300 font-bold text-xl transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Submit Quiz
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  );
}
