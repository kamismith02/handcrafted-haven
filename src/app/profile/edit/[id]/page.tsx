
import { getUser} from "@/app/lib/data";
import EditForm from "@/app/ui/profile/editform";
import { notFound } from "next/navigation";

export default async function Page (props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await getUser(id).catch(error => {console.log('error fetching user: '+ error)})  
 
  if (!user){
    notFound()
  }

      return ( 
          <main>
              <section className='m-5  p-8 ml-auto flex items-center justify-center flex-col'>

              <div className="relative flex flex-col rounded-xl bg-transparent p-4">
            <h4 className="block text-xl font-medium text-slate-800 p-2">
              Edit Profile
            </h4>
                <img  
                      src={user.avatar}
                      alt="avatar"
                      className="relative inline-block h-[110px] w-[110px] !rounded-full object-cover object-center"
                    />
                </div>
              <div>
                <EditForm user={user} />
              </div>
          </section>
          </main>
)

}