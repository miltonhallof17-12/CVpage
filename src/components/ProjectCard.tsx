interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Project Image</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
    </div>
  );
}
