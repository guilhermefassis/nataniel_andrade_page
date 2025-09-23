
export default function PrivacyPolicyPage() {
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
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: Setembro 2025
            </p>
          </div>

          <div className="space-y-8">
            
            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introdução</h2>
              <p className="text-gray-600 leading-relaxed">
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
                suas informações pessoais quando você utiliza nosso site e serviços de coaching.
                Ao utilizar nossos serviços, você concorda com a coleta e uso das informações 
                de acordo com esta política.
              </p>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Informações que Coletamos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Informações Pessoais</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Nome completo</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone</li>
                    <li>Mensagens enviadas através do formulário de contato</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Informações Técnicas</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador</li>
                    <li>Páginas visitadas</li>
                    <li>Tempo de permanência no site</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Como Usamos Suas Informações</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                <li>Responder às suas solicitações e perguntas</li>
                <li>Fornecer informações sobre nossos serviços</li>
                <li>Enviar comunicações relevantes sobre coaching</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contato</h2>
              <p className="text-gray-600 mb-4">
                Para questões sobre esta Política de Privacidade, entre em contato:
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
