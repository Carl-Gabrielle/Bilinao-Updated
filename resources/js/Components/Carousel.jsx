export default function Carousel() {
    return (
        <div className="relative w-full min-h-[310px] flex flex-col items-center justify-end sm:h-full shadow-inner order-1 lg:order-2 space-x-3 bg-slate-300 rounded-b-3xl sm:rounded-none ">
            <p className="bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight bg-clip-text text-transparent text-1xl sm:text-3xl pb-6">
                Discover Unique, Handcrafted Treasures
            </p>
            <div className="absolute size-52 rounded-full border opacity-30 right-0  top-0 p-10"></div>
            <div className="absolute size-52 rounded-full border opacity-30 left-0  bottom-0 p-10"></div>
        </div>
    );
}
