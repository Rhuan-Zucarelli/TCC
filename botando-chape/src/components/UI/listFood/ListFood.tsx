import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { useState } from "react";

interface IcreatedBy {
  type: string;
}

type bCreatedBy = {
  type: 'BCreatedBy';
  label: string;
}


export default function ListFood({ type }: IcreatedBy) {
  const { data: sessionData } = useSession();
  const foods = api.food.getFoods.useQuery();
  const userFoods = foods.data?.filter(food => food.userId === sessionData?.user.id)

  let listContent;

  if (type === "BCreatedBy") {
    listContent = (
      <>
        <div className="flex flex-col flex-wrap gap-4">
          {userFoods?.map((food) => (
            <div>
              {food.name}
            </div>
          ))}
        </div>
      </>
    )
  }
  if (type === "") {
    listContent = (
      <>
        <div className="flex flex-col flex-wrap gap-4">
          <div>
            {foods.data?.map((food) => (
              <div>
                {food.name}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {listContent}
    </>
  )

}