import { useState } from "react";
import { Plus, Target } from "lucide-react";

import { useGoals } from "../context/GoalContext";

import GoalCard from "../components/goals/GoalCard";
import GoalModal from "../components/forms/GoalModal";

function Goals() {
  const { goals } = useGoals();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <div className="pb-12">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-ink-50">
            Savings Goals
          </h1>

          <p className="mt-2 text-ink-400">
            Turn your plans into achievable goals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
        >
          <Plus size={20} />
          Create Goal
        </button>

      </div>

      {goals.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface/50 py-20 text-center">

          <div className="rounded-full bg-hairline p-5 text-ink-400">
            <Target size={34} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-ink-50">
            No savings goals yet
          </h2>

          <p className="mt-2 max-w-md text-ink-400">
            Create a goal and start tracking your
            progress.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded-xl bg-gold px-5 py-3 text-ink font-semibold transition hover:bg-gold-dim"
          >
            Create Your First Goal
          </button>

        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
            />
          ))}

        </div>
      )}

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}

export default Goals;