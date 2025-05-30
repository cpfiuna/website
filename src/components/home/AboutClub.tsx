
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, Lightbulb, BookOpen } from "lucide-react";

const AboutClub = () => {
  return (
    <section className="py-16 section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Somos <span className="gradient-text">CPF</span>
            </h2>
            
            <p className="text-lg mb-6">
              El <strong>Club de Programación FIUNA</strong> nació en 2017 con el objetivo de crear
              un espacio de aprendizaje colaborativo para estudiantes interesados en el desarrollo de software
              y las tecnologías de la información.
            </p>
            
            <p className="text-lg mb-6"> {/*mb-6*/}
              Buscamos complementar la formación académica con experiencias prácticas,
              fomentando el trabajo en equipo, la resolución de problemas y el uso de
              tecnologías modernas que preparen a nuestros miembros para destacarse
              en el mundo profesional.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-4">
              <img 
                src="/images/home/home-3.jpg"
                alt="Miembros del club en el Tigo Campus Party 2022" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-4">
              <img 
                src="images/timeline/cpf-2019.jpg"
                alt="Hackathon Girls Code Encarnación" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-6">
              <img 
                src="images/timeline/cpf-2020.png"
                alt="Taller de programación" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-6">
              <img 
                src="/images/home/home-2.jpg"
                alt="Miembros del club en el NASA Space Apps Challenge 2022" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
