import { useState } from "react";
import questionsSet from "../components/questions.json";
import "../AppQuestions.css";

export function Question() {
  const [answersMap, setAnswersMap] = useState(new Map());
  const [name, setName] = useState("");

  console.log(answersMap);

  const selectAnswer = (questionIndex: number, answer: number) => {
    setAnswersMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(questionIndex, answer);
      return newMap;
    });
  };

  const resetAnswer = (questionIndex: number) => {
    setAnswersMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(questionIndex);
      return newMap;
    });
  };

  const totalQuestions = questionsSet.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-yellow-700 flex flex-col items-center py-10">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-4xl border-2 border-teal-500">
        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-2 drop-shadow-lg">
          🎉 Rounding Off to Nearest 10 🎉
        </h1>

        <section className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex gap-3 items-center mb-3 md:mb-0">
            <span className="font-semibold text-lg text-teal-300">Name:</span>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-1 rounded-lg border-2 border-yellow-400 focus:border-teal-400 outline-none transition duration-200 bg-gray-700 text-yellow-200 placeholder-teal-300"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-lg text-yellow-300">
              Score:
            </span>
            <div className="w-40 bg-gray-700 rounded-full h-4 border border-teal-500">
              <div
                className="bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-700 h-4 rounded-full transition-all duration-300"
                style={{
                  width: `${(answersMap.size / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-teal-200">
              {answersMap.size}/{totalQuestions}
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {questionsSet.map((item, index) => {
            const answered = answersMap.get(index + 1);
            return (
              <div
                key={index}
                className={`question-card ${
                  answered ? "answered" : "unanswered"
                } bg-teal-900 p-1 rounded-2xl`}
              >
                <div className="rounded-lg shadow p-4">
                  <p className="font-semibold text-md text-yellow-300 mb-2">
                    {item.question} rounded off to the nearest 10 is:
                  </p>
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
                    <button
                      onClick={() => resetAnswer(index + 1)}
                      className="ml-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg shadow hover:bg-yellow-500 transition font-bold"
                    >
                      reset
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
//