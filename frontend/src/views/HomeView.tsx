import Header from "@/components/Header";

export default function HomeView() {
    return (
        <>
            <Header />

            <main className="py-10 min-h-screen">
                <div className="max-w-5xl mx-auto mt-10 ">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            All your <span className="text-brand-4">social media</span> in one link
                        </h1>

                        <p className="text-slate-800 text-xl">
                            Join more than 300 thousand developers sharing your social media, share your accounts on TikTok, Facebook, Instagram, YouTube, Github and more!
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}