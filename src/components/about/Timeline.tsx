import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Users, BookOpen, Star, Award, 
  Code, GraduationCap, Heart, Lightbulb, Handshake, 
  MessageSquare, Trophy, Globe 
} from "lucide-react";

const timelineEvents = [
  {
    year: "2016",
    title: "Preparación del Club",
    description: "Un grupo de estudiantes apasionados comienza a planificar la creación de un club para fomentar la cultura de programación en la facultad, estableciendo las bases de lo que se convertiría en el Club de Programación FIUNA.",
    icon: Users,
    image: "/images/timeline/preparation.jpg"
  },
  {
    year: "2017",
    title: "Fundación del Club",
    description: "El Club de Programación FIUNA es oficialmente fundado, comenzando su misión de fomentar la cultura de desarrollo de software en la facultad.",
    icon: Users,
    image: "/images/timeline/foundation.jpg"
  },
  {
    year: "2018",
    title: "Primer Hackathon FIUNA",
    description: "Organizamos nuestro primer hackathon con más de 50 participantes, estableciendo las bases para una tradición anual que continúa hasta hoy.",
    icon: Code,
    image: "/images/timeline/hackathon.jpg"
  },
  {
    year: "2019",
    title: "Expansión y Crecimiento",
    description: "El club creció significativamente, alcanzando más de 100 miembros activos y estableciendo alianzas con empresas tecnológicas locales.",
    icon: GraduationCap,
    image: "/images/timeline/growth.jpg"
  },
  {
    year: "2020",
    title: "Adaptación Virtual",
    description: "Ante la pandemia global, transformamos todas nuestras actividades a formato virtual, alcanzando a más estudiantes que nunca con webinars y hackatones en línea.",
    icon: BookOpen,
    image: "/images/timeline/cpf-2020.jpg"
  },
  {
    year: "2021",
    title: "Primeros Proyectos Open Source",
    description: "Lanzamos nuestras primeras contribuciones a proyectos de código abierto, estableciendo la cultura de colaboración en el desarrollo de software.",
    icon: Star,
    image: "/images/timeline/cpf-2021.png"
  },
  {
    year: "2022",
    title: "Renovación y Expansión",
    description: "Bajo la presidencia de Mathias Barrios, el CPF vive una etapa de transformación. Se moderniza su identidad con un nuevo logo y una presencia digital más fuerte a través de redes sociales. Se forma un equipo de marketing y se amplían las oportunidades para los miembros con cursos como Git y GitHub, el mantenimiento de las salas R de FIUNA y la participación en eventos clave como el TIGO Campus Party y el IEEExtreme. Además, el club fortalece su rol en la comunidad IEEE, coorganizando el IEEExtreme junto a IEEE RAS y IEEE CS de la UNA.",
    icon: Award,
    image: "/images/timeline/cpf-2022.jpg"
  },
  {
    year: "2023",
    title: "Consolidación y Representación",
    description: "El CPF continúa siendo un referente en la facultad, manteniendo su participación en el Campus Party y en la hackathon del año. Aunque la organización interna atraviesa una fase de transición, el impacto de los esfuerzos realizados sigue presente. La comunidad formada sigue creciendo y los conocimientos compartidos en la gestión anterior continúan beneficiando a los miembros.",
    icon: Users,
    image: "/images/timeline/cpf-2023.jpg"
  },
  {
    year: "2024",
    title: "Una Pausa para el Futuro",
    description: "El club entra en un período de pausa estratégica, permitiendo que la comunidad reflexione sobre nuevos caminos a seguir. El legado de la modernización y las experiencias acumuladas servirán como base para futuras generaciones que deseen revitalizar el CPF con nuevos proyectos y desafíos.",
    icon: Lightbulb,
    image: "/images/timeline/cpf-2024.jpg"
  },
  {
    year: "2025",
    title: "Visión de Futuro",
    description: "Planeamos expandir nuestra influencia más allá de la universidad, creando un ecosistema tecnológico que beneficie a toda la comunidad paraguaya.",
    icon: Star,
    image: "/images/timeline/cpf-2025.jpg"
  }
];

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const scrollToEvent = useCallback((index: number, userInitiated = false) => {
    if (index >= 0 && index < timelineEvents.length) {
      setActiveIndex(index);
      
      const eventElements = timelineRef.current?.querySelectorAll('.timeline-event');
      if (eventElements && eventElements[index]) {
        eventElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
      
      // If user initiated, pause auto-scrolling
      if (userInitiated) {
        setAutoScrollPaused(true);
        
        // Clear any existing timer
        if (autoScrollTimerRef.current) {
          clearTimeout(autoScrollTimerRef.current);
        }
        
        // Resume auto-scrolling after 10 seconds
        autoScrollTimerRef.current = setTimeout(() => {
          setAutoScrollPaused(false);
        }, 10000);
      }
    }
  }, []); // Removed timelineEvents.length as it's a constant

  const nextEvent = useCallback(() => {
    if (activeIndex < timelineEvents.length - 1) {
      scrollToEvent(activeIndex + 1, true);
    } else {
      // Loop back to the first event
      scrollToEvent(0, true);
    }
  }, [activeIndex, scrollToEvent]); // Removed timelineEvents.length

  const prevEvent = useCallback(() => {
    if (activeIndex > 0) {
      scrollToEvent(activeIndex - 1, true);
    } else {
      // Loop to the last event
      scrollToEvent(timelineEvents.length - 1, true);
    }
  }, [activeIndex, scrollToEvent]); // Removed timelineEvents.length

  // Auto-scroll effect
  useEffect(() => {
    let autoScrollInterval: NodeJS.Timeout;
    
    if (!autoScrollPaused) {
      autoScrollInterval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % timelineEvents.length;
        scrollToEvent(nextIndex);
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [activeIndex, autoScrollPaused, scrollToEvent]); // Added scrollToEvent

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextEvent();
      } else if (e.key === 'ArrowLeft') {
        prevEvent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, nextEvent, prevEvent]);

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-transparent z-0"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Nuestra <span className="gradient-text">Historia</span>
        </h2>
        
        <div className="flex justify-center items-center gap-4 mb-6 sm:mb-12">
          <button 
            onClick={prevEvent}
            disabled={activeIndex === 0}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Evento anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <span className="text-xl font-medium">
            {timelineEvents[activeIndex].year}
          </span>
          
          <button 
            onClick={nextEvent}
            disabled={activeIndex === timelineEvents.length - 1}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Siguiente evento"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Timeline Line with Year Indicators - Hidden on small screens */}
        <div className="hidden sm:block relative h-1 bg-muted/50 dark:bg-muted/30 rounded-full mb-16">
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
          ></div>
          
          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ 
                left: `${(index / (timelineEvents.length - 1)) * 100}%`, 
                transform: 'translateX(-50%)', 
                top: '-6px' 
              }}
              onClick={() => scrollToEvent(index, true)}
            >
              <div
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  index <= activeIndex ? 'bg-primary' : 'bg-muted'
                } ${index === activeIndex ? 'scale-150' : 'scale-100'}`}
                aria-label={`Ver evento de ${event.year}`}
              ></div>
              <span 
                className={`text-xs font-medium mt-4 transition-all ${
                  index === activeIndex 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {event.year}
              </span>
            </div>
          ))}
        </div>
        
        {/* Special mobile-only spacer - Visible only on small screens */}
        <div className="block sm:hidden h-8"></div>
        
        {/* Timeline Events */}
        <div 
          ref={timelineRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="order-2 md:order-1">
            <div className="glass-card p-8 timeline-event">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {React.createElement(timelineEvents[activeIndex].icon, { className: "h-5 w-5" })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{timelineEvents[activeIndex].title}</h3>
                  <p className="text-muted-foreground text-sm">{timelineEvents[activeIndex].year}</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {timelineEvents[activeIndex].description}
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="glass-card overflow-hidden">
              <div className="bg-muted/20 dark:bg-black/30 aspect-video relative">
                {timelineEvents[activeIndex].image ? (
                  <img
                    src={timelineEvents[activeIndex].image}
                    alt={timelineEvents[activeIndex].title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Code className="h-16 w-16 text-muted-foreground/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
