import { useNavigate } from "react-router-dom";
import "../AppQuestions.css";
import { useGetLeaderboard } from "../services/leaderboard";
// import lbData from "../data/leaderboard.json";

export function Leaderboard() {
  const navigate = useNavigate();
  const { data } = useGetLeaderboard();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className="fixed inset-0 sm:relative sm:inset-auto min-h-[100dvh] w-full bg-gradient-to-br from-gray-900 via-teal-900 to-yellow-700 flex flex-col items-center py-4 md:py-10 overflow-auto sm:overflow-visible">
      <div className="p-2 sm:p-4 md:p-8 w-full max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-400 text-center mb-2 drop-shadow-lg">
          🏆 Quiz Leaderboard 🏆
        </h1>

        {/* Leaderboard Container with scrollable content */}
        <div className="mt-6 sm:mt-10 md:mt-20 bg-gradient-to-r from-teal-900/50 via-teal-800/50 to-teal-900/50 sm:bg-teal-900/50 rounded-2xl p-2 sm:p-4 md:p-6 backdrop-blur-sm border border-teal-700">
          <div className="max-h-[500px] sm:max-h-[400px] md:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-teal-800">
            <div className="space-y-2 sm:space-y-4">
              {data?.map((entry, index) => (
                <div
                  key={index}
                  className={`group relative p-2 sm:p-3 md:p-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-600/30 via-yellow-500/20 to-yellow-400/30 sm:from-yellow-600/20 sm:via-yellow-500/20 sm:to-yellow-400/20 border-2 border-yellow-400/30"
                      : "bg-gradient-to-r from-teal-800/50 via-teal-700/40 to-teal-800/50 sm:from-teal-800/40 sm:to-teal-700/40 border-2 border-teal-600/30"
                  }`}
                >
                  {/* Inline Layout for all screen sizes */}
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1">
                      <div className="text-lg sm:text-lg md:text-2xl font-bold min-w-[32px] sm:min-w-[40px] md:min-w-[60px] text-center">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-xl font-bold text-yellow-300 truncate">
                          {entry.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right min-w-[50px] sm:min-w-[60px] md:min-w-[100px]">
                      <div className="text-base sm:text-lg md:text-2xl font-bold text-yellow-400">
                        {entry.score}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-300/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Quiz Button */}
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
          <button
            onClick={() => navigate("/")}
            className="group relative px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 active:scale-95 transition-all duration-300 font-bold text-sm sm:text-base md:text-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              <svg
                className="w-4 sm:w-4 md:w-5 h-4 sm:h-4 md:h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Back to Quiz
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
