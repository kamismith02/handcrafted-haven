import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const shopSchema = z.object({
  shop_name: z.string().min(1, 'Shop name is required'),
  description: z.string().min(1, 'Description is required'),
  avatar_url: z.string().url('Invalid URL format'),
});

type ShopFormData = z.infer<typeof shopSchema>;

export default function EditShopForm({
  seller
}: {
  seller: { shop_name: string; description: string; avatar: string };
}) {
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      shop_name: seller.shop_name,
      description: seller.description,
      avatar_url: seller.avatar,
    },
  });

  const onSubmit = (data: ShopFormData) => {
    // Call your update function here with the updated data
    console.log('Updated shop data:', data);
  };

  return (
    <div className="relative flex flex-col rounded-sm bg-*-pearl-extralight p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">Shop Name</label>
            <input
              {...register('shop_name')}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            {errors.shop_name && (
              <p className="mt-2 text-sm text-red-500">{errors.shop_name.message}</p>
            )}
          </div>

          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">Description</label>
            <input
              {...register('description')}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">Avatar URL</label>
            <input
              {...register('avatar_url')}
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            {errors.avatar_url && (
              <p className="mt-2 text-sm text-red-500">{errors.avatar_url.message}</p>
            )}
          </div>
        </div>

        <button
          className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit">
          Submit Changes
        </button>
      </form>
    </div>
  );
}
