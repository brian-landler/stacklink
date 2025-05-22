import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function HomeView() {
    return (
        <>
            <Header />

            <main className="py-10 min-h-screen md:bg-none lg:bg-[image:var(--bg-home)] lg:bg-size-[50%] bg-no-repeat bg-top-right">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-5 xl:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            All your <span className="text-brand-4">social media</span> in one link
                        </h1>

                        <p className="text-slate-800 text-xl">
                            Join more than 300 thousand developers sharing your social media, share your accounts on TikTok, Facebook, Instagram, YouTube, Github and more!
                        </p>

                        <SearchForm/>
                    </div>
                </div>
            </main>
        </>
    )
}