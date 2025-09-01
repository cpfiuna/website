import React, { useState } from "react";
import { AlertCircle, Check, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Google Forms configuration
const GOOGLE_FORMS_CONFIG = {
  enabled: false, // Set to true when you have your Google Form ready
  actionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
  fieldMapping: {
    // Map your form fields to Google Forms entry IDs
    // Example: nombres: "entry.123456789",
    nombres: "entry.000000001",
    apellidos: "entry.000000002", 
    cedula: "entry.000000003",
    email: "entry.000000004",
    telefono: "entry.000000005",
    universidad: "entry.000000006",
    carrera: "entry.000000007",
    experienciaProgramacion: "entry.000000008",
    areasInteres: "entry.000000009",
    herramientasLenguajes: "entry.000000010",
    actividadesInteres: "entry.000000011",
    colaboracionActiva: "entry.000000012",
    tiempoDisponible: "entry.000000013",
    nivelCompromiso: "entry.000000014",
    proyectosPrevios: "entry.000000015",
    liderazgoExperiencia: "entry.000000016",
    objetivosPlazo: "entry.000000017",
    fortalezasPrincipales: "entry.000000018",
    desafiosInteres: "entry.000000019",
    aprendizajePreferido: "entry.000000020",
    contribucionEsperada: "entry.000000021",
    comentarios: "entry.000000022",
    comoSeEntero: "entry.000000023",
  }
};

const AdmissionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Datos Personales
    nombres: "",
    apellidos: "",
    cedula: "",
    email: "",
    telefono: "",
    universidad: "",
    universidadOtra: "",
    carrera: "",
    carreraOtra: "",
    
    // Experiencia y Expectativas
    experienciaProgramacion: "",
    areasInteres: [] as string[],
    areasInteresOtra: "",
    herramientasLenguajes: [] as string[],
    herramientasLenguajesOtro: "",
    actividadesInteres: [] as string[],
    actividadesInteresOtra: "",
    colaboracionActiva: "",
    comentarios: "",
    comoSeEntero: "",
    
    // New assessment questions
    tiempoDisponible: "",
    nivelCompromiso: "",
    proyectosPrevios: "",
    liderazgoExperiencia: "",
    objetivosPlazo: "",
    fortalezasPrincipales: [] as string[],
    fortalezasPrincipalesOtra: "",
    desafiosInteres: [] as string[],
    desafiosInteresOtro: "",
    aprendizajePreferido: "",
    contribucionEsperada: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const carreras = [
    "Ingeniería Civil",
    "Ingeniería Electromecánica", 
    "Ingeniería Electrónica",
    "Ingeniería Geográfica y Ambiental",
    "Ingeniería Industrial",
    "Ingeniería Mecánica",
    "Ingeniería Mecatrónica",
    "Otro"
  ];

  const experienciaOpciones = [
    { value: "bastante", label: "Sí, bastante experiencia" },
    { value: "algo", label: "Sí, algo de experiencia" },
    { value: "aprendiendo", label: "Estoy aprendiendo recién" },
    { value: "quiero-aprender", label: "No, pero quiero aprender" }
  ];

  const areasInteres = [
    "Desarrollo Web Frontend (React, Vue, Angular)",
    "Desarrollo Web Backend (APIs, Bases de Datos)",
    "Desarrollo Mobile (React Native, Flutter)",
    "DevOps e Infraestructura (CI/CD, Cloud)",
    "Inteligencia Artificial / Machine Learning",
    "Ciencia de Datos / Analytics",
    "Programación Competitiva / Algoritmos",
    "Desarrollo de Videojuegos",
    "Ciberseguridad",
    "Blockchain / Web3",
    "Robótica / IoT",
    "Otro"
  ];

  const herramientas = [
    "HTML/CSS", "JavaScript/TypeScript", "React/Vue/Angular", 
    "Node.js", "Python", "Java", "C/C++", "C#", 
    "PHP", "SQL/Bases de Datos", "Git/GitHub", 
    "Docker", "AWS/Azure/GCP", "Otro"
  ];

  const actividades = [
    "Desarrollo de proyectos colaborativos",
    "Participar en hackathons y competencias",
    "Crear y facilitar cursos/talleres",
    "Organización de eventos técnicos",
    "Mentorear a otros estudiantes",
    "Contribuir a proyectos open source",
    "Investigación y desarrollo de nuevas tecnologías",
    "Crear contenido educativo (blogs, videos)",
    "Gestión de redes sociales y marketing",
    "Establecer partnerships con empresas",
    "Participar en competencias de algoritmos",
    "Desarrollar soluciones de IA/ML",
    "No estoy seguro aún, quiero explorar",
    "Otro"
  ];

  const colaboracionOpciones = [
    { value: "si-organizador", label: "Sí, me interesa ser parte del equipo organizador" },
    { value: "tal-vez", label: "Tal vez, dependiendo del tiempo que requiera" },
    { value: "solo-participar", label: "Prefiero participar como miembro en actividades" },
    { value: "no-se", label: "Aún no sé" }
  ];

  const comoSeEnteroOpciones = [
    "Puertas Abiertas",
    "Redes sociales", 
    "Amigo/a o conocido/a",
    "Docente",
    "Sitio web de la FIUNA",
    "Cartel en la facultad"
  ];

  const tiempoDisponibleOpciones = [
    { value: "2-4-horas", label: "2-4 horas por semana" },
    { value: "5-8-horas", label: "5-8 horas por semana" },
    { value: "9-15-horas", label: "9-15 horas por semana" },
    { value: "mas-15-horas", label: "Más de 15 horas por semana" },
    { value: "variable", label: "Variable según la época del año" }
  ];

  const nivelCompromisoOpciones = [
    { value: "casual", label: "Participación casual - asistir a eventos ocasionalmente" },
    { value: "regular", label: "Participación regular - asistir a la mayoría de actividades" },
    { value: "activo", label: "Miembro activo - participar y contribuir regularmente" },
    { value: "lider", label: "Liderazgo - organizar actividades y guiar equipos" }
  ];

  const fortalezasPrincipales = [
    "Resolución de problemas complejos",
    "Trabajo en equipo y colaboración",
    "Liderazgo y gestión de proyectos", 
    "Comunicación y presentaciones",
    "Creatividad e innovación",
    "Análisis y pensamiento crítico",
    "Aprendizaje rápido de nuevas tecnologías",
    "Diseño y experiencia de usuario",
    "Enseñanza y mentoring",
    "Networking y relaciones interpersonales",
    "Otro"
  ];

  const desafiosInteres = [
    "Proyectos de impacto social",
    "Competencias técnicas de alto nivel",
    "Investigación y desarrollo de nuevas tecnologías",
    "Startup y emprendimiento tecnológico",
    "Contribución a proyectos open source importantes",
    "Soluciones empresariales complejas",
    "Educación y democratización de la tecnología",
    "Innovación en IA y automatización",
    "Otro"
  ];

  const aprendizajePreferidoOpciones = [
    { value: "hands-on", label: "Aprendizaje práctico - trabajando en proyectos reales" },
    { value: "teoria-practica", label: "Combinación de teoría y práctica estructurada" },
    { value: "mentoring", label: "Mentoring 1-on-1 con miembros experimentados" },
    { value: "autodidacta", label: "Autoaprendizaje con recursos y orientación" },
    { value: "grupos", label: "Aprendizaje en grupos pequeños y colaborativo" }
  ];

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (GOOGLE_FORMS_CONFIG.enabled) {
        // Submit to Google Forms
        await submitToGoogleForms();
      } else {
        // Simulate form submission for testing
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu solicitud. Te contactaremos en las próximas 48-72 horas.",
        variant: "default",
      });
      
      setIsSubmitted(true);
      resetForm();
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitToGoogleForms = async () => {
    const formDataToSubmit = new FormData();
    
    // Map form data to Google Forms entries
    Object.entries(GOOGLE_FORMS_CONFIG.fieldMapping).forEach(([key, entryId]) => {
      const value = formData[key as keyof typeof formData];
      if (Array.isArray(value)) {
        // For checkbox arrays, join with commas
        formDataToSubmit.append(entryId, value.join(", "));
      } else if (value) {
        formDataToSubmit.append(entryId, value.toString());
      }
    });

    // Submit to Google Forms
    const response = await fetch(GOOGLE_FORMS_CONFIG.actionUrl, {
      method: "POST",
      body: formDataToSubmit,
      mode: "no-cors", // Required for Google Forms
    });

    // Note: Google Forms returns an opaque response when using no-cors
    // We assume success if no error is thrown
    return response;
  };

  const resetForm = () => {
    setFormData({
      nombres: "",
      apellidos: "",
      cedula: "",
      email: "",
      telefono: "",
      universidad: "",
      universidadOtra: "",
      carrera: "",
      carreraOtra: "",
      experienciaProgramacion: "",
      areasInteres: [],
      areasInteresOtra: "",
      herramientasLenguajes: [],
      herramientasLenguajesOtro: "",
      actividadesInteres: [],
      actividadesInteresOtra: "",
      colaboracionActiva: "",
      comentarios: "",
      comoSeEntero: "",
      tiempoDisponible: "",
      nivelCompromiso: "",
      proyectosPrevios: "",
      liderazgoExperiencia: "",
      objetivosPlazo: "",
      fortalezasPrincipales: [],
      fortalezasPrincipalesOtra: "",
      desafiosInteres: [],
      desafiosInteresOtro: "",
      aprendizajePreferido: "",
      contribucionEsperada: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="glass-card-static p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold">¡Solicitud Enviada Exitosamente!</h3>
          <p className="text-muted-foreground max-w-md">
            Gracias por tu interés en unirte al Club de Programación FIUNA. 
            Revisaremos tu solicitud y te contactaremos en las próximas 48-72 horas.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Enviar Otra Solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card-static p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Solicitud de Admisión</h2>
        <p className="text-muted-foreground">
          Completa este formulario para unirte al Club de Programación FIUNA. 
          Todos los campos marcados con * son obligatorios.
        </p>
      </div>

      <div className="space-y-8">
        {/* Datos Personales */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            Datos Personales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nombres" className="text-sm font-medium">Nombres *</label>
              <input
                id="nombres"
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => setFormData(prev => ({ ...prev, nombres: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Ej: Juan Carlos"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="apellidos" className="text-sm font-medium">Apellidos *</label>
              <input
                id="apellidos"
                type="text"
                required
                value={formData.apellidos}
                onChange={(e) => setFormData(prev => ({ ...prev, apellidos: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Ej: González Pérez"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cedula" className="text-sm font-medium">Número de Cédula de Identidad *</label>
              <input
                id="cedula"
                type="text"
                required
                value={formData.cedula}
                onChange={(e) => setFormData(prev => ({ ...prev, cedula: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Ej: 1.234.567"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Correo Electrónico *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="nombre@fiuna.edu.py"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium">Número de Teléfono *</label>
              <input
                id="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Ej: 0981 123 456"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="universidad" className="text-sm font-medium">Universidad *</label>
              <select
                id="universidad"
                name="universidad"
                aria-label="Seleccionar universidad"
                required
                value={formData.universidad}
                onChange={(e) => setFormData(prev => ({ ...prev, universidad: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="">Selecciona tu universidad</option>
                <option value="una">Universidad Nacional de Asunción</option>
                <option value="otra">Otra</option>
              </select>
            </div>
          </div>
          
          {formData.universidad === "otra" && (
            <div className="mt-4 space-y-2">
              <label htmlFor="universidadOtra" className="text-sm font-medium">Especifica tu universidad</label>
              <input
                id="universidadOtra"
                type="text"
                value={formData.universidadOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, universidadOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Nombre de tu universidad"
              />
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            <label htmlFor="carrera" className="text-sm font-medium">Carrera *</label>
            <select
              id="carrera"
              name="carrera"
              aria-label="Seleccionar carrera"
              required
              value={formData.carrera}
              onChange={(e) => setFormData(prev => ({ ...prev, carrera: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Selecciona tu carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera} value={carrera.toLowerCase().replace(/ /g, "-")}>
                  {carrera}
                </option>
              ))}
            </select>
          </div>
          
          {formData.carrera === "otro" && (
            <div className="mt-4 space-y-2">
              <label htmlFor="carreraOtra" className="text-sm font-medium">Especifica tu carrera</label>
              <input
                id="carreraOtra"
                type="text"
                value={formData.carreraOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, carreraOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Nombre de tu carrera"
              />
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Experiencia y Expectativas */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            Experiencia y Expectativas
          </h3>
          
          {/* Experiencia en programación */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Tenés experiencia previa en programación? *</label>
            <div className="space-y-2">
              {experienciaOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="experienciaProgramacion"
                    value={opcion.value}
                    checked={formData.experienciaProgramacion === opcion.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienciaProgramacion: e.target.value }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Áreas de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué áreas te interesan más dentro de la programación? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {areasInteres.map((area) => (
                <label key={area} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.areasInteres.includes(area)}
                    onChange={(e) => handleCheckboxChange('areasInteres', area, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{area}</span>
                </label>
              ))}
            </div>
            {formData.areasInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.areasInteresOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, areasInteresOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otras áreas te interesan"
              />
            )}
          </div>
          
          {/* Herramientas y lenguajes */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué herramientas o lenguajes manejás actualmente (si alguno)?</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {herramientas.map((herramienta) => (
                <label key={herramienta} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.herramientasLenguajes.includes(herramienta)}
                    onChange={(e) => handleCheckboxChange('herramientasLenguajes', herramienta, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{herramienta}</span>
                </label>
              ))}
            </div>
            {formData.herramientasLenguajes.includes("Otro") && (
              <input
                type="text"
                value={formData.herramientasLenguajesOtro}
                onChange={(e) => setFormData(prev => ({ ...prev, herramientasLenguajesOtro: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otros lenguajes o herramientas conocés"
              />
            )}
          </div>
          
          {/* Actividades de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿En qué tipo de actividades te gustaría participar en el club? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {actividades.map((actividad) => (
                <label key={actividad} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.actividadesInteres.includes(actividad)}
                    onChange={(e) => handleCheckboxChange('actividadesInteres', actividad, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{actividad}</span>
                </label>
              ))}
            </div>
            {formData.actividadesInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.actividadesInteresOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, actividadesInteresOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otras actividades te interesan"
              />
            )}
          </div>
          
          {/* Colaboración activa */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Te gustaría colaborar activamente en la organización y trabajo del club? *</label>
            <div className="space-y-2">
              {colaboracionOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="colaboracionActiva"
                    value={opcion.value}
                    checked={formData.colaboracionActiva === opcion.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, colaboracionActiva: e.target.value }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Comentarios */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comentarios" className="text-sm font-medium">¿Querés agregar algún comentario, sugerencia o idea para el club?</label>
            <textarea
              id="comentarios"
              value={formData.comentarios}
              onChange={(e) => setFormData(prev => ({ ...prev, comentarios: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Comparte tus ideas, sugerencias o cualquier comentario que consideres relevante..."
            />
          </div>
          
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Assessment and Placement */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            Evaluación y Ubicación en el Club
          </h3>

          {/* Tiempo disponible */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuánto tiempo podrías dedicar al club semanalmente? *</label>
            <div className="space-y-2">
              {tiempoDisponibleOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tiempoDisponible"
                    value={opcion.value}
                    checked={formData.tiempoDisponible === opcion.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, tiempoDisponible: e.target.value }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nivel de compromiso */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué nivel de compromiso buscás con el club? *</label>
            <div className="space-y-2">
              {nivelCompromisoOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="nivelCompromiso"
                    value={opcion.value}
                    checked={formData.nivelCompromiso === opcion.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, nivelCompromiso: e.target.value }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Proyectos previos */}
          <div className="mb-6 space-y-2">
            <label htmlFor="proyectosPrevios" className="text-sm font-medium">Describe brevemente algún proyecto personal o académico de programación del que te sientas orgulloso/a</label>
            <p className="text-xs text-muted-foreground mb-2">Esto nos ayuda a entender tu nivel técnico y tipo de proyectos que te interesan</p>
            <textarea
              id="proyectosPrevios"
              value={formData.proyectosPrevios}
              onChange={(e) => setFormData(prev => ({ ...prev, proyectosPrevios: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Desarrollé una app móvil para organizar tareas usando React Native y Firebase. Me gustó porque aprendí sobre autenticación y bases de datos en tiempo real..."
            />
          </div>

          {/* Experiencia de liderazgo */}
          <div className="mb-6 space-y-2">
            <label htmlFor="liderazgoExperiencia" className="text-sm font-medium">¿Tenés experiencia liderando equipos o proyectos? (académicos, laborales, voluntarios, etc.)</label>
            <textarea
              id="liderazgoExperiencia"
              value={formData.liderazgoExperiencia}
              onChange={(e) => setFormData(prev => ({ ...prev, liderazgoExperiencia: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Coordiné un grupo de estudio para el examen de Algoritmos, organizamos sesiones semanales y creamos material de apoyo..."
            />
          </div>

          {/* Fortalezas principales */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuáles considerás que son tus principales fortalezas? *</label>
            <p className="text-xs text-muted-foreground mb-3">Selecciona las 3-5 que mejor te representen</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fortalezasPrincipales.map((fortaleza) => (
                <label key={fortaleza} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.fortalezasPrincipales.includes(fortaleza)}
                    onChange={(e) => handleCheckboxChange('fortalezasPrincipales', fortaleza, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{fortaleza}</span>
                </label>
              ))}
            </div>
            {formData.fortalezasPrincipales.includes("Otro") && (
              <input
                type="text"
                value={formData.fortalezasPrincipalesOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, fortalezasPrincipalesOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica tu otra fortaleza principal"
              />
            )}
          </div>

          {/* Desafíos de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué tipo de desafíos técnicos te emocionan más? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {desafiosInteres.map((desafio) => (
                <label key={desafio} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.desafiosInteres.includes(desafio)}
                    onChange={(e) => handleCheckboxChange('desafiosInteres', desafio, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{desafio}</span>
                </label>
              ))}
            </div>
            {formData.desafiosInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.desafiosInteresOtro}
                onChange={(e) => setFormData(prev => ({ ...prev, desafiosInteresOtro: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otros desafíos te interesan"
              />
            )}
          </div>

          {/* Objetivos a corto/mediano plazo */}
          <div className="mb-6 space-y-2">
            <label htmlFor="objetivosPlazo" className="text-sm font-medium">¿Cuáles son tus objetivos profesionales/académicos en los próximos 1-2 años? *</label>
            <p className="text-xs text-muted-foreground mb-2">Esto nos ayuda a alinear las oportunidades del club con tus metas</p>
            <textarea
              id="objetivosPlazo"
              required
              value={formData.objetivosPlazo}
              onChange={(e) => setFormData(prev => ({ ...prev, objetivosPlazo: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Quiero especializarme en desarrollo web, conseguir una pasantía en una empresa de tech, y eventualmente trabajar en productos que impacten positivamente..."
            />
          </div>

          {/* Estilo de aprendizaje preferido */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuál es tu estilo de aprendizaje preferido? *</label>
            <div className="space-y-2">
              {aprendizajePreferidoOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="aprendizajePreferido"
                    value={opcion.value}
                    checked={formData.aprendizajePreferido === opcion.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, aprendizajePreferido: e.target.value }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contribución esperada */}
          <div className="mb-6 space-y-2">
            <label htmlFor="contribucionEsperada" className="text-sm font-medium">¿Cómo te gustaría contribuir al crecimiento y éxito del club? *</label>
            <p className="text-xs text-muted-foreground mb-2">Pensá en qué valor único podrías aportar basado en tu experiencia y habilidades</p>
            <textarea
              id="contribucionEsperada"
              required
              value={formData.contribucionEsperada}
              onChange={(e) => setFormData(prev => ({ ...prev, contribucionEsperada: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Me gustaría ayudar a organizar talleres de React para principiantes, contribuir al desarrollo de la página web del club, y ser mentor de nuevos miembros..."
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Información General - Renumbered to 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            Información General
          </h3>
          
          {/* Cómo se enteró */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comoSeEntero" className="text-sm font-medium">¿Cómo te enteraste del club? *</label>
            <select
              id="comoSeEntero"
              name="comoSeEntero"
              aria-label="Seleccionar cómo se enteró del club"
              required
              value={formData.comoSeEntero}
              onChange={(e) => setFormData(prev => ({ ...prev, comoSeEntero: e.target.value }))}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Selecciona una opción</option>
              {comoSeEnteroOpciones.map((opcion) => (
                <option key={opcion} value={opcion.toLowerCase().replace(/ /g, "-")}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>

          {/* Comentarios adicionales */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comentarios" className="text-sm font-medium">¿Querés agregar algún comentario, sugerencia o pregunta adicional?</label>
            <textarea
              id="comentarios"
              value={formData.comentarios}
              onChange={(e) => setFormData(prev => ({ ...prev, comentarios: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Cualquier información adicional que consideres relevante para tu candidatura..."
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Información adicional */}
        <div className="bg-muted/50 dark:bg-black/20 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            Al enviar esta solicitud, acepto que mis datos sean procesados por el Club de Programación FIUNA 
            para evaluar mi candidatura. Los datos serán tratados de forma confidencial y solo se utilizarán 
            para el proceso de admisión y comunicaciones relacionadas con el club.
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all min-w-[200px] ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-neon-blue'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Solicitud
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdmissionForm;
