'use client'

import { DashboardItems } from "@/assets/data/dashboard";
import MyTable from "@/components/general/table/table";
import useStatistic from "@/hooks/statistic/useStatistic";
import { StatisticGeneralColumnData } from "@/models/tables/statisticGeneralTable";
import { Collapse, Image, Select } from "antd";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  return <div>
    <div className="text-lg font-semibold text-dark mb-5">Navigation to items:</div>
    <div className="grid grid-cols-4 lg:grid-cols-6 gap-3 mb-5">
      {
        DashboardItems.map((item, index) => {
          return <DashboardItem key={index} label={item.label} img={item.img} link={item.link} />;
        })
      }
    </div>
    <div className="mt-[2em] mb-[0.5em] font-semibold text-lg">Statistic</div>
    <Collapse
      items={[{ key: '1', label: 'General Statistic Table', children: <GeneralStatistic /> }]}
    />

  </div>;
}

const GeneralStatistic = () => {
  const {
    generalStatisticData,
    setGeneralMonth, monthData
  } = useStatistic();

  return <div className={`flex flex-row w-full gap-5 my-2`}>
    <div className={`w-full flex flex-col xl:flex-row gap-5`}>
      {/* <div className={`w-[80%] max-h-[50vh]`}>
        <CustomBarChart chartData={revenueX} labels={revenueY} title={"Revenue in week"} />
      </div> */}
      <div className={`w-full`}>
        <div className="flex flex-row gap-3 mb-5">
          <Select
            placeholder="Select year"
            optionFilterProp="label"
            defaultValue={2024}
            onChange={(e) => { }}
            options={monthData}
            disabled={true}
          />
          <Select
            placeholder="Select month"
            optionFilterProp="label"
            onChange={(e) => setGeneralMonth(e)}
            options={monthData}
          />
        </div>
        {generalStatisticData !== undefined ? <MyTable
          data={[generalStatisticData]}
          columnData={StatisticGeneralColumnData()}
          onPagingChange={function (index: number): void {

          }} /> :
          <div
            className={`w-full min-h-[20vh] flex justify-center mt-2 items-center`}>
            No data
          </div>}
      </div>
    </div>
  </div>
}

interface DashboardItemProps {
  label: string,
  img: string,
  link: string,
}

function DashboardItem(props: DashboardItemProps) {
  const { label, img, link } = props;
  const router = useRouter();


  return (
    <div className={`grid-rows-1 py-6 px-5 gap-3 rounded shadow-lg cursor-pointer duration-75 transition-all 
      flex flex-row items-center text-slate-800 font-semibold hover:shadow-sm`}
      onClick={() => router.push(link)}
    >
      <Image
        alt="Icon"
        className="max-w-[30%] me-2 overflow-hidden"
        src={img}
      />
      <div>{label}</div>
    </div>
  )
}