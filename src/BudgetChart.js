import { Pie } from "react-chartjs-2";

export function BudgetChart({ totalBudget, acquisitions = [] }) {
  const amountSpent = acquisitions.reduce((amountSpent,{totalCost})=>{
    return amountSpent+totalCost;
  },0)
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
      {
        amountSpent>totalBudget
        ?<h3 style={{color:'var(--red)', padding:'1rem', textShadow:'var(--text-shadow)'}}>${amountSpent-totalBudget} over budget</h3>
        :<Pie data={data} options={options}/>
      }
    </section>
  );
}
