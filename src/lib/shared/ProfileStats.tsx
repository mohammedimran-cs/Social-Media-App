import { stats } from "@/constants"
import { Models } from "appwrite"

type ProfileStatsProps = {
    data : Models.Document[][]
}

const ProfileStats = ({data}: ProfileStatsProps) => {

  return (
    <div className="flex items-center justify-center md:justify-start gap-5 mt-4">{data.map((models , index) => {
      return (
        <div key={index} className="flex items-center gap-2">
          <p className="text-light-3 md:text-lg text">{models?.length}</p>
          <h2 className="text-primary-500 md:text-lg">{stats[index]}</h2>
        </div>
      )
    })}
    </div>
  )
}

export default ProfileStats