import { NotFound, Illustration } from "@/components/ui/not-found"

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-20 dark:opacity-10 text-foreground" />
        <NotFound
          title="Страница не найдена"
          description="Похоже, вы заблудились. Страница, которую вы ищете, не существует."
        />
      </div>
    </div>
  )
} 