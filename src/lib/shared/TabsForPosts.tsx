import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stats } from "@/constants";
import { Models } from "appwrite";
import GridPostList from "./GridPostList";
import { useUserContext } from "@/context/AuthProvider";
import UserCard from "./UserCard";

type ProfileStatsProps = {
  data: Models.Document[][];
};

const TabsForPosts = ({ data }: ProfileStatsProps) => {
  const { user } = useUserContext();

  return (
    <div className="mb-5 w-full">
      <Tabs defaultValue="Posts" className="w-full md:mt-9 mt-5">
        <div className="flex justify-center md:justify-start">
          <TabsList>
            {stats.map((userStats: string, index: number) => (
              <TabsTrigger key={index} value={userStats} className="md:text-lg">
                {userStats}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="Posts">
          <div className="w-[100%] flex md:gap-[5%] pb-5 items-center flex-col md:flex-row md:flex-wrap">
            <GridPostList post={data[0]} user={user} />
          </div>
        </TabsContent>

        <TabsContent value="Followers">
          <div className="flex w-full justify-center mt-9">
            <div className="flex w-full pl-[8%] sm:pl-[0%] sm:w-[90%] flex-wrap sm:gap-[5%]">
              {data[1]?.map((userId: any, index: number) => (
                <UserCard key={index} userId={userId} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Following">
          <div className="flex w-full justify-center mt-9">
            <div className="flex w-full pl-[8%] sm:pl-[0%] sm:w-[90%] flex-wrap sm:gap-[5%]">
              {data[2]?.map((userId: any, index: number) => (
                <UserCard key={index} userId={userId} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsForPosts;
