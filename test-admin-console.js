// Copie e cole este código no console do navegador para testar o login admin

console.log('🧪 Iniciando teste de login admin...');

// Função para testar o login
async function testAdminLogin() {
  try {
    console.log('1️⃣ Testando API diretamente...');
    
    const response = await fetch('/api/auth/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@gamb.com.br',
        password: 'admin123'
      }),
    });
    
    const data = await response.json();
    
    console.log('📡 Resposta da API:');
    console.log('   Status:', response.status);
    console.log('   OK:', response.ok);
    console.log('   Data:', data);
    
    if (response.ok) {
      console.log('✅ API funcionando!');
      
      // Testar localStorage
      console.log('2️⃣ Testando localStorage...');
      localStorage.setItem('gamb_admin', JSON.stringify(data.admin));
      
      const saved = localStorage.getItem('gamb_admin');
      const parsed = JSON.parse(saved);
      
      console.log('✅ localStorage funcionando!');
      console.log('   Admin salvo:', parsed.email);
      
      // Testar se o modal abre
      console.log('3️⃣ Testando abertura do modal...');
      
      // Encontrar e clicar no botão de admin
      const adminButton = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent && btn.textContent.includes('Painel Administrativo'));
      
      if (adminButton) {
        console.log('✅ Botão encontrado!');
        adminButton.click();
        
        setTimeout(() => {
          const adminModal = document.querySelector('.min-h-screen.bg-gradient-to-br');
          if (adminModal) {
            console.log('✅ Modal aberto!');
            
            // Preencher formulário
            const emailInput = adminModal.querySelector('input[type="email"]');
            const passwordInput = adminModal.querySelector('input[type="password"]');
            
            if (emailInput && passwordInput) {
              console.log('✅ Campos encontrados!');
              emailInput.value = 'admin@gamb.com.br';
              passwordInput.value = 'admin123';
              
              // Submeter formulário
              const form = adminModal.querySelector('form');
              if (form) {
                console.log('✅ Formulário encontrado, submetendo...');
                form.submit();
              } else {
                console.log('❌ Formulário não encontrado');
              }
            } else {
              console.log('❌ Campos não encontrados');
            }
          } else {
            console.log('❌ Modal não abriu');
          }
        }, 1000);
      } else {
        console.log('❌ Botão não encontrado');
      }
    } else {
      console.log('❌ API falhou:', data.error);
    }
  } catch (error) {
    console.log('❌ Erro no teste:', error);
  }
}

// Executar o teste
testAdminLogin();

console.log('📋 Teste iniciado. Verifique o console para ver os resultados.');