const projects = [
  {
    title: "Project One",
    description: "Minimal design exploration",
    category: "Design",
  },
  {
    title: "Project Two",
    description: "Digital experience",
    category: "Development",
  },
  {
    title: "Project Three",
    description: "Brand identity",
    category: "Branding",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <span className="text-sm uppercase tracking-widest mb-4 inline-block">
          Projects
        </span>
        <h2 className="text-3xl md:text-4xl font-medium mb-12">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white p-8 hover:bg-neutral-50 transition-colors duration-300"
            >
              <span className="text-xs text-neutral-500 mb-2 block">
                {project.category}
              </span>
              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p className="text-neutral-600">{project.description}</p>
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm">View Project →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}