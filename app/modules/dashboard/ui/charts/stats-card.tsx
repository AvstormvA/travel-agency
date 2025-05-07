import { calculateTrendPercentage, cn } from "lib/utils";

const StatsCard = ({ headerTitle, total, currentMonthCount, lastMonthCount }: StatsCardProps) => {
  const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);
  const isDrement = trend === "decrement";

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img src={`/assets/icons/${isDrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`} alt="Arrow" className="size-5" />
              <figcaption className={cn("text-sm font-medium", isDrement ? "text-red-500" : "text-success-700")}>{Math.round(percentage)}%</figcaption>
            </figure>
            <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
          </div>
        </div>
        <img src={`/assets/icons/${isDrement ? "decrement.svg" : "increment.svg"}`} alt="Chart" className="xl:w-32 size-full md:h-32 xl:h-full" />
      </div>
    </article>
  )
}

export default StatsCard