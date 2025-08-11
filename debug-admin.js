// Script para debugar o login admin
console.log('🔍 Iniciando debug do login admin...');

// Teste 1: Verificar se o admin existe no localStorage
console.log('\n1️⃣ Verificando localStorage:');
const savedAdmin = localStorage.getItem('gamb_admin');
if (savedAdmin) {
  try {
    const admin = JSON.parse(savedAdmin);
    console.log('✅ Admin encontrado no localStorage:');
    console.log('   Email:', admin.email);
    console.log('   Nome:', admin.name);
    console.log('   Role:', admin.role);
  } catch (e) {
    console.log('❌ Erro ao parsear admin do localStorage:', e);
  }
} else {
  console.log('ℹ️  Nenhum admin no localStorage');
}

// Teste 2: Simular clique no botão de login admin
console.log('\n2️⃣ Simulando clique no Painel Administrativo:');
function simulateAdminLoginClick() {
  // Encontrar o botão de admin
  const adminButton = Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent && btn.textContent.includes('Painel Administrativo'));
  
  if (adminButton) {
    console.log('✅ Botão encontrado, clicando...');
    adminButton.click();
    
    // Esperar um pouco e verificar se o modal abriu
    setTimeout(() => {
      const adminModal = document.querySelector('.min-h-screen.bg-gradient-to-br');
      if (adminModal) {
        console.log('✅ Modal de admin aberto');
        
        // Preencher credenciais
        const emailInput = adminModal.querySelector('input[type="email"]');
        const passwordInput = adminModal.querySelector('input[type="password"]');
        
        if (emailInput && passwordInput) {
          console.log('✅ Campos de login encontrados');
          emailInput.value = 'admin@gamb.com.br';
          passwordInput.value = 'admin123';
          console.log('✅ Credenciais preenchidas');
          
          // Encontrar e clicar no botão de login
          const loginButton = Array.from(adminModal.querySelectorAll('button'))
            .find(btn => btn.textContent && btn.textContent.includes('Entrar'));
          
          if (loginButton) {
            console.log('✅ Botão de login encontrado, clicando...');
            loginButton.click();
            
            // Esperar resposta
            setTimeout(() => {
              const successMessage = document.querySelector('.border-green-200');
              const errorMessage = document.querySelector('.border-red-200');
              
              if (successMessage) {
                console.log('✅ Login bem sucedido!');
                console.log('   Mensagem:', successMessage.textContent);
              } else if (errorMessage) {
                console.log('❌ Login falhou!');
                console.log('   Mensagem:', errorMessage.textContent);
              } else {
                console.log('ℹ️  Nenhuma mensagem de sucesso/erro encontrada');
              }
            }, 2000);
          } else {
            console.log('❌ Botão de login não encontrado');
          }
        } else {
          console.log('❌ Campos de login não encontrados');
        }
      } else {
        console.log('❌ Modal de admin não abriu');
      }
    }, 1000);
  } else {
    console.log('❌ Botão de Painel Administrativo não encontrado');
  }
}

// Teste 3: Testar API diretamente
console.log('\n3️⃣ Testando API diretamente:');
async function testApiDirect() {
  try {
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
    
    console.log('Resposta da API:');
    console.log('   Status:', response.status);
    console.log('   OK:', response.ok);
    console.log('   Data:', data);
    
    if (response.ok) {
      console.log('✅ API funcionando corretamente');
      
      // Testar salvar no localStorage
      localStorage.setItem('gamb_admin', JSON.stringify(data.admin));
      console.log('✅ Admin salvo no localStorage');
      
      // Verificar se foi salvo corretamente
      const saved = localStorage.getItem('gamb_admin');
      const parsed = JSON.parse(saved);
      console.log('✅ Admin verificado no localStorage:', parsed.email);
    } else {
      console.log('❌ API retornou erro:', data.error);
    }
  } catch (error) {
    console.log('❌ Erro ao testar API:', error);
  }
}

// Executar testes
setTimeout(() => {
  simulateAdminLoginClick();
  testApiDirect();
}, 2000);

console.log('\n📋 Testes configurados. Aguardando 2 segundos para executar...');