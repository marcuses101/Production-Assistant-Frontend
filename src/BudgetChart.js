import { Pie } from "react-chartjs-2";

export function BudgetChart({ totalBudget, items }) {
  console.log(totalBudget);
  const amountSpent = items.reduce((total, { actualCost, acquired }) => {
    console.log(actualCost);
    return acquired ? total + (actualCost || 0) : total;
  }, 0);
  const data = {
    datasets: [
      {
        data: [amountSpent, totalBudget - amountSpent],
        backgroundColor: ["hsla(279, 68%, 75%, 0.87)", "hsla(0, 0%, 75%, 0.6)"],
      },
    ],

    labels: ["used", "remaining"],
  };
  const options= {
       animation: {
          duration: 0
      }
  }
  return (
    <section style={{ minWidth: 0 }}>
      <h2>Budget</h2>
      <Pie data={data} options={options}/>
    </section>
  );
}
