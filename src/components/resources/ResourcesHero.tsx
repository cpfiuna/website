
import React from "react";

const ResourcesHero = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-black to-background/90 dark:from-black dark:to-background/70">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          <span className="gradient-text">Recursos</span> para Programadores
        </h1>
        
        <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
          Aprende con los recursos creados por nuestra comunidad o explora nuestra colección
          de herramientas, tutoriales y materiales recomendados.
        </p>
      </div>
    </section>
  );
};

export default ResourcesHero;
