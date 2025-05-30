import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const InterestForm = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    especialidade: '',
    telefone: '',
    pacientesMes: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomeCompleto || !formData.especialidade || !formData.telefone || !formData.pacientesMes || !formData.email) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('https://primary-production-9bb3.up.railway.app/webhook/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Interesse enviado com sucesso!');
        setFormData({
          nomeCompleto: '',
          especialidade: '',
          telefone: '',
          pacientesMes: '',
          email: ''
        });
      } else {
        toast.error('Erro ao enviar formulário');
      }
    } catch (error) {
      toast.error('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="nomeCompleto" className="block text-black text-sm">
            NOME COMPLETO:
          </label>
          <Input
            id="nomeCompleto"
            name="nomeCompleto"
            type="text"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="especialidade" className="block text-black text-sm">
            ESPECIALIDADE MÉDICA (NUTRIÇÃO E ODONTOLÓGICA INCLUSAS):
          </label>
          <Input
            id="especialidade"
            name="especialidade"
            type="text"
            value={formData.especialidade}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="telefone" className="block text-black text-sm">
            TELEFONE (COM DDD):
          </label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pacientesMes" className="block text-black text-sm">
            QUANTOS PACIENTES ATENDE POR MÊS:
          </label>
          <Input
            id="pacientesMes"
            name="pacientesMes"
            type="number"
            value={formData.pacientesMes}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-black text-sm">
            E-MAIL PARA CONTATO:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
          />
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full bg-transparent text-black border border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-none"
          >
            ENVIAR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterestForm;


