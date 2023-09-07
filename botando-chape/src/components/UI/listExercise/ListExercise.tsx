import { useSession } from "next-auth/react";
import { api } from "next/utils/api";

interface Iexercise {
  type: String;
}

export default function ListExercises({ type }: Iexercise) {
  const { data: sessionData } = useSession();
  const exercises = api.exercise.getExercises.useQuery();
  const userExercises = exercises.data?.filter(exercise => exercise.userId === sessionData?.user.id);

  let listContent;

  if (type === "BCreatedBy") {
    listContent = (
      <>
        <div className="flex flex-col flex-wrap gap-4">
          {userExercises?.map((exercise) => (
            <div>
              {exercise.name}
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
            {exercises.data?.map((exercise) => (
              <div>
                {exercise.name}
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



