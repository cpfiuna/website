
import { Code, Users, Lightbulb, GraduationCap, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Desarrollo de Software",
      description:
        "Aprende las mejores prácticas de desarrollo y trabaja en proyectos reales con mentores experimentados.",
    },
    {
      icon: Users,
      title: "Comunidad Colaborativa",
      description:
        "Forma parte de una comunidad apasionada por la tecnología donde compartir conocimientos es la prioridad.",
    },
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description:
        "Mantente al día con las últimas tecnologías y tendencias en el mundo del desarrollo de software.",
    },
    {
      icon: GraduationCap,
      title: "Capacitación Continua",
      description:
        "Talleres, charlas y eventos educativos diseñados para potenciar tus habilidades técnicas.",
    },
    {
      icon: Github,
      title: "Open Source",
      description:
        "Contribuye a proyectos de código abierto y construye un portafolio de desarrollo impresionante.",
    },
    {
      icon: Globe,
      title: "Networking",
      description:
        "Conecta con profesionales y empresas del sector tecnológico nacional e internacional.",
    },
  ];

  return (
    <section className="py-20 section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-primary/5 to-transparent opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Por qué unirte a <span className="gradient-text">cpf</span>?
          </h2>
          <p className="text-muted-foreground">
            Somos más que un club, somos una comunidad que impulsa el crecimiento
            de estudiantes y profesionales en el campo de la programación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 hover:translate-y-[-5px] hover:shadow-neon-blue"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-6">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Conoce nuestra historia
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
