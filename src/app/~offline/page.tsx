import Image from 'next/image'

export default function Offline() {
	return (
		<main className="flex flex-auto flex-col items-center pt-24">
			<Image src="/icon.png" alt="Logo" width={100} height={24} priority />
			<div className="my-5 text-center">
				<h2 className="text-4xl font-semibold">You are offline.</h2>
				<p className="mt-3">Please connect to the internet.</p>
			</div>
		</main>
	)
}
