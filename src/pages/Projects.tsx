import { useNavigate } from "react-router-dom";
import { projects, bottomFeatureProject } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { Grid } from "@/components/ui/Grid";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const allProjects = [...projects, bottomFeatureProject];

  return (
    <PageLayout
      title="Work Pieces"
      subtitle="Back to Home"
      description="A comprehensive collection of my work across education, healthcare, and public service. Each project represents a unique challenge and learning opportunity."
      badge="Projects"
      onBack={() => navigate('/')}
    >
      <Grid columns={{ default: 1, md: 2 }}>
        {allProjects.map((project, index) => (
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