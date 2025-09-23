
export default function TermsPage() {
  return (
    <main>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="mb-12">
            <a 
              href="/"
              className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
            >
              ← Voltar ao Site
            </a>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: Setembro 2025
            </p>
          </div>

          <div className="space-y-8">
            
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e usar este site, você aceita e concorda em estar vinculado pelos 
                termos e condições deste acordo. Se você não concordar com qualquer parte 
                destes termos, não deve utilizar nossos serviços.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Descrição dos Serviços</h2>
              <p className="text-gray-600 mb-4">Oferecemos os seguintes serviços:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                <li>Sessões de coaching individual</li>
                <li>Programas de desenvolvimento pessoal</li>
                <li>Cursos e treinamentos</li>
                <li>Conteúdo educacional sobre desenvolvimento humano</li>
                <li>Consultoria em desenvolvimento profissional</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsabilidades do Usuário</h2>
              <p className="text-gray-600 mb-4">Ao usar nossos serviços, você se compromete a:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Não usar os serviços para fins ilegais ou prejudiciais</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
                <li>Não compartilhar material proprietário sem autorização</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Relação de Coaching</h2>
              <p className="text-gray-600 mb-4">
                O coaching é um processo colaborativo focado no desenvolvimento pessoal e profissional. 
                É importante entender que:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                <li>O coaching não é terapia psicológica ou aconselhamento médico</li>
                <li>Os resultados dependem do comprometimento e participação ativa do cliente</li>
                <li>Não há garantias de resultados específicos</li>
                <li>A confidencialidade das sessões é mantida conforme código de ética</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contato</h2>
              <p className="text-gray-600 mb-4">
                Para questões sobre estes Termos de Uso, entre em contato:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> natanielandrad@gmail.com</p>
                <p><strong>WhatsApp:</strong> +55 99 8183-8481</p>
                <p><strong>Localização:</strong> São Luís, MA</p>
              </div>
            </section>

          </div>

          <div className="mt-12 text-center">
            <a 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors"
            >
              ← Voltar ao Site
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
