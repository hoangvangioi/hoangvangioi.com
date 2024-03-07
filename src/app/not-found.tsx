export default function NotFound() {
	return (
		<div className="container w-full flex-auto content-center items-center justify-center self-center p-10">
			<div className="h-full text-center">
				<h1 className="mt-5 text-6xl font-black tracking-widest text-slate-800 dark:text-gray-100 lg:text-8xl">
					404
				</h1>
				<h2 className="mt-5 text-4xl font-bold text-slate-800 dark:text-gray-100 lg:text-5xl">
					Page not found
				</h2>
				<p className="mt-5 text-slate-600 lg:text-lg">
					The page you are looking for doesn&apos;t exist or <br />
					has been removed.
				</p>
				<a
					className="mb-4 mt-8 inline-flex flex-row items-center justify-center gap-3 rounded-xl bg-sky-300 px-4 py-2 text-base font-semibold text-slate-900 transition-colors hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
					href="/"
					target="_parent"
				>
					Go back home
				</a>
			</div>
		</div>
	)
}
