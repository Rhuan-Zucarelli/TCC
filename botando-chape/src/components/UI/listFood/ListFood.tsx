import { useSession } from "next-auth/react";
import { api } from "next/utils/api";


export default function ListFood() {
  const { data: sessionData } = useSession()
  const foods = api.food.getFoodByUser.useQuery({ userId: sessionData?.user.id });


  return (
    <>
      <div className="flex flex-col flex-wrap gap-4">
        {foods.data?.map((food) => (
          <div>
            {food.name}
          </div>
        ))}

      </div>
    </>

  )

}