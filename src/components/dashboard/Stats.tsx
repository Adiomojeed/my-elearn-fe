export type StatsProps = {
  icon: string;
  title: string;
  value: string;
};

const Stats = ({ stat }: { stat: StatsProps }) => {
  return (
    <div className="border border-[#F3F3F3] h-[71px] bg-white rounded-lg p-[14px] flex items-center gap-3">
      <img src={stat.icon} alt="stat icon" />
      <div>
        <small className="text-xs text-grey-200">{stat.title}</small>
        <h5 className="text-2xl font-medium leading-[29px]">{stat.value}</h5>
      </div>
    </div>
  );
};

export default Stats;
