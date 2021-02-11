import { Pie } from "react-chartjs-2";

export function BudgetChart({ totalBudget, items }) {
  console.log(totalBudget);
  const amountSpent = items.reduce((total, { actualCost, acquired }) => {
    console.log(actualCost)
    return acquired ? total + (actualCost || 0) : total;
  }, 0);
  const data = {
    datasets: [
      {
        data: [amountSpent, totalBudget - amountSpent],
      },
    ],
    labels: ["used", "remaining"],
  };
  return (
    <section>
      <h2>Budget</h2>
      <Pie data={data} />
    </section>
  );
}
