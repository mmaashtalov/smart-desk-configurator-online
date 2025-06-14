import { Layout } from '@/components/Layout'
import { useParams, Link } from 'react-router-dom'
import { projects, Project } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Users, ChevronLeft } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Button } from '@/components/ui/button'

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const project: Project | undefined = projects.find(p => p.id === Number(id))

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl">Проект не найден.</p>
          <Link to="/projects" className="text-accent underline mt-4 inline-block">
            ← Все проекты
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <Button asChild variant="link" className="mb-6">
          <Link to="/projects" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Назад к проектам
          </Link>
        </Button>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-playfair">
          {project.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-600 mb-6 flex-wrap text-sm">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {project.date}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> {project.employees}
          </span>
        </div>

        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full aspect-video object-cover rounded-lg mb-8"
        />

        <p className="text-lg mb-6 max-w-3xl">{project.description}</p>

        <h2 className="text-2xl font-semibold mb-4">Ключевые особенности</h2>
        <ul className="list-disc pl-5 space-y-2 mb-12">
          {project.features.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA: invite user to create their own project */}
        <div className="bg-accent/10 rounded-lg p-8 text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">Создайте свой уникальный Smart-проект</h2>
          <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
            Хотите стол, созданный специально под ваши задачи? Мы готовы бесплатно сделать 3D-визуализацию или вы можете сконфигурировать модель самостоятельно в&nbsp;онлайн-конфигураторе.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/visualization">Заказать визуализацию</Link>
            </Button>
            <Button asChild size="lg" variant="accent">
              <Link to="/configurator">Сконфигурировать самостоятельно</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
} 