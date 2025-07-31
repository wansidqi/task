import { useMutation, useQuery } from "@tanstack/react-query";

interface LeaderboardEntry {
  name: string;
  score: number;
}

async function fetchLeaderboard() {
  const response = await fetch("http://localhost:3000/leaderboard");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return (await data) as LeaderboardEntry[];
}

async function postLeaderboardEntry(entry: LeaderboardEntry) {
  const response = await fetch("http://localhost:3000/leaderboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return await response.json();
}

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
  });
};

export const usePostLeaderboard = () => {
  return useMutation({
    mutationFn: async (data: LeaderboardEntry) => {
      return await postLeaderboardEntry({
        name: data.name,
        score: data.score,
      });
    },
  });
};
