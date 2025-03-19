
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogrosCallToAction = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Únete a nuestro legado de éxitos</h2>
          <p className="text-muted-foreground mb-8">
            Sé parte de nuestro club y contribuye a seguir construyendo una historia de logros y reconocimientos en el mundo de la programación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="inline-flex items-center justify-center px-6 py-3 rounded-full text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue">
              <Link to="/contact">
                Contáctanos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue">
              <Link to="/events">
                Ver eventos próximos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogrosCallToAction;
