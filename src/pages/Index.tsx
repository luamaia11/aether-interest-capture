import BouncingLogo from "@/components/BouncingLogo";
import InterestForm from '@/components/InterestForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BouncingLogo />
      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <InterestForm />
      </div>
      <div className="absolute top-4 left-4">
 
</div>

      
      {/* Rodapé */}
      <footer className="py-8">
        <div className="text-center">
          <p className="text-black text-sm">
            CNPJ: 57.765.974/0001-83 | Aether Inteligência Artificial | Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};



export default Index;
