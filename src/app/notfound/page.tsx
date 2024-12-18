'use client';

export default function Page() {
    return (
        <>
            <div className="relative min-h-80 flex flex-col justify-center items-center m-6 bg-white shadow-sm border border-slate-200 rounded-lg p-2">
                <div className="p-3 text-center">
                    <div className="flex justify-center mb-4">
                        <img className="w-20 object-center" src=".\4501552.png" alt="Lost?" />
                    </div>
                    <div className="flex justify-center mb-2">
                        <h5 className="text-slate-700 text-2xl font-bold">
                            Looks Like You're a Little Lost....
                        </h5>
                    </div>
                    <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                        Try logging in again in order to view your profile!
                    </p>
                    <div className="text-center">
                        <button
                            className="min-w-32 rounded-lg bg-slate-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-800 active:bg-slate-800"
                            type="button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
