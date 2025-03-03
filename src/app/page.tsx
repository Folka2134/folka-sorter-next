import AlgorithmVisualizer from "~/components/algorithm-visualizer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">

      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Folka
          <span className="text-[hsl(280,100%,70%)]">Sorter</span> Visualizer
        </h1>

        <div>

          <AlgorithmVisualizer />
        </div>
      </div>
    </main>
  );
}
