type RepositoryPageProps = {
	params: {
		id: string;
	};
};

export default function RepositoryPage({ params }: RepositoryPageProps) {
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Repository</h1>
			<div className="bg-card p-6 rounded-lg border">
				<p className="text-lg">
					Repository ID:{" "}
					<span className="font-mono bg-muted px-2 py-1 rounded">
						{params.id}
					</span>
				</p>
			</div>
		</div>
	);
}
