import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { Grid } from "@/components/ui/Grid";

export default function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Work Pieces"
      subtitle="Back to Home"
      description="My career felt like a blur until I started documenting the things I did. Not everything of course, else it would take many webpages to write them all down. But I focus on what I think are highlights in my work - the things that bring me joy and give me energy. Very often, these things tend to revolve around people, data analytics and story-telling. I hope you find some inspiration from what a simple teacher picked up over the course of his career."
      badge="Projects"
      onBack={() => navigate('/')}
    >
      <Grid columns={{ default: 1, md: 2 }}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.title}
            project={project} 
            index={index}
            variant={index === 0 ? 'featured' : 'default'}
          />
        ))}
      </Grid>
    </PageLayout>
  );
} 