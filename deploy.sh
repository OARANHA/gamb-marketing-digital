#!/bin/bash

# Script de Deploy para Gamb Marketing Digital
# Este script facilita o deploy em diferentes plataformas

set -e

echo "🚀 Gamb Marketing Digital - Script de Deploy"
echo "============================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar pré-requisitos
check_prerequisites() {
    print_info "Verificando pré-requisitos..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js não está instalado"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm não está instalado"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "git não está instalado"
        exit 1
    fi
    
    print_success "Pré-requisitos verificados"
}

# Build do projeto
build_project() {
    print_info "Buildando o projeto..."
    
    # Limpar cache
    print_info "Limpando cache..."
    rm -rf .next node_modules/.cache
    
    # Instalar dependências
    print_info "Instalando dependências..."
    npm ci
    
    # Build
    print_info "Executando build..."
    npm run build
    
    # Lint
    print_info "Executando lint..."
    npm run lint
    
    print_success "Build concluído com sucesso"
}

# Deploy para Vercel
deploy_vercel() {
    print_info "Iniciando deploy para Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI não encontrado. Instalando..."
        npm install -g vercel
    fi
    
    # Verificar se está logado
    if ! vercel whoami &> /dev/null; then
        print_info "Faça login no Vercel:"
        vercel login
    fi
    
    print_info "Deployando para Vercel..."
    vercel --prod
    
    print_success "Deploy para Vercel concluído"
}

# Deploy para Render
deploy_render() {
    print_info "Deploy para Render requer configuração manual"
    print_info "Por favor:"
    print_info "1. Acesse https://render.com"
    print_info "2. Conecte seu repositório GitHub"
    print_info "3. Use o arquivo render.yaml para configuração"
    print_info "4. Configure as variáveis de ambiente"
    
    # Verificar se tem o render CLI
    if command -v render &> /dev/null; then
        print_info "Render CLI encontrado. Verificando status..."
        render ps
    fi
}

# Deploy para Railway
deploy_railway() {
    print_info "Iniciando deploy para Railway..."
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI não encontrado. Instalando..."
        npm install -g @railway/cli
    fi
    
    # Verificar se está logado
    if ! railway whoami &> /dev/null; then
        print_info "Faça login no Railway:"
        railway login
    fi
    
    # Verificar se está no projeto correto
    if [ ! -f "railway.toml" ]; then
        print_error "Arquivo railway.toml não encontrado"
        exit 1
    fi
    
    print_info "Deployando para Railway..."
    railway up
    
    print_success "Deploy para Railway concluído"
}

# Deploy para Netlify
deploy_netlify() {
    print_info "Iniciando deploy para Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI não encontrado. Instalando..."
        npm install -g netlify-cli
    fi
    
    # Verificar se está logado
    if ! netlify status &> /dev/null; then
        print_info "Faça login no Netlify:"
        netlify login
    fi
    
    print_info "Deployando para Netlify..."
    netlify deploy --prod --dir=.next
    
    print_success "Deploy para Netlify concluído"
}

# Deploy para Digital Ocean
deploy_digitalocean() {
    print_info "Deploy para Digital Ocean App Platform requer configuração manual"
    print_info "Por favor:"
    print_info "1. Acesse https://cloud.digitalocean.com/apps"
    print_info "2. Conecte seu repositório GitHub"
    print_info "3. Use o arquivo .digitalocean/Appfile para configuração"
    print_info "4. Configure as variáveis de ambiente"
}

# Menu principal
show_menu() {
    echo ""
    echo "Escolha a plataforma para deploy:"
    echo "1) Vercel (Recomendado)"
    echo "2) Render"
    echo "3) Railway"
    echo "4) Netlify"
    echo "5) Digital Ocean"
    echo "6) Sair"
    echo ""
    read -p "Opção: " choice
}

# Main
main() {
    check_prerequisites
    build_project
    
    while true; do
        show_menu
        
        case $choice in
            1)
                deploy_vercel
                break
                ;;
            2)
                deploy_render
                break
                ;;
            3)
                deploy_railway
                break
                ;;
            4)
                deploy_netlify
                break
                ;;
            5)
                deploy_digitalocean
                break
                ;;
            6)
                print_info "Saindo..."
                exit 0
                ;;
            *)
                print_error "Opção inválida"
                ;;
        esac
    done
    
    print_success "Processo de deploy concluído!"
    print_info "Não se esqueça de:"
    print_info "- Configurar as variáveis de ambiente"
    print_info "- Configurar o domínio personalizado"
    print_info "- Testar todas as funcionalidades"
    print_info "- Monitorar a aplicação após o deploy"
}

# Executar main
main "$@"