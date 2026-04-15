# 🌦️ Weather Temple

## 📌 Visão Geral

Este é um aplicativo de clima simples e moderno que permite ao usuário buscar informações meteorológicas a partir do nome de uma cidade.

O fluxo principal do app é:

1. O usuário digita o nome de uma cidade
2. O app consulta a API de geocodificação para obter latitude e longitude
3. Em seguida, busca os dados meteorológicos com base nessas coordenadas
4. Os dados são exibidos na interface de forma amigável

O projeto foi desenvolvido com foco em:

* Código limpo e modular
* Separação de responsabilidades
* Testes automatizados (unitários e integração)

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/weather-app.git
cd weather-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute os testes

```bash
npm test
```

---

## 🚀 Guia de Uso

1. Abra o arquivo `index.html` no navegador
2. Digite o nome de uma cidade no campo de busca
3. Pressione Enter ou clique no botão de busca
4. Visualize os dados do clima exibidos na tela

---


## 📊 Exemplo de Resultado

Entrada:

```text
São Paulo
```

Saída esperada:

```json
{
  "city": "São Paulo, BR",
  "temperature": 25,
  "windSpeed": 10,
  "description": "Parcialmente nublado"
}
```

---

## 🧪 Testes

O projeto utiliza **Jest** para testes automatizados.

### Tipos de testes implementados:

* ✅ Testes unitários (API e UI)
* ✅ Testes de integração (fluxo completo)
* ✅ Testes com mocks de API (`fetch`)

Para rodar os testes:

```bash
npm test
```

---

## ✨ Funcionalidades

* 🔍 Busca de clima por nome da cidade
* 🌍 Conversão automática para coordenadas (latitude/longitude)
* 🌡️ Exibição de temperatura atual
* 💨 Informações de vento
* ⚠️ Tratamento de erros (cidade inválida, falha na API)
* ⏳ Indicador de carregamento
* 🧪 Testes automatizados com mocks

---

## 🧱 Estrutura do Projeto

```text
src/
 ├── js/
 │   ├── api/
 │   │   ├── geocodingApi.js
 │   │   └── weatherApi.js
 │   ├── ui/
 │   │   └── renderer.js
 │   └── app.js
 │
 └── tests/
     ├── api/
     ├── ui/
     ├── integration/
     └── mocks/
```

---

## 🛠️ Tecnologias Utilizadas

* JavaScript (ES Modules)
* Jest (testes)
* API Open-Meteo
* HTML/CSS

---

## ⚠️ Tratamento de Erros

O app cobre cenários como:

* Cidade não encontrada
* Falha na API
* Dados incompletos
* Input vazio ou inválido

---

## 🔮 Melhorias Futuras

* 🌐 Suporte a múltiplos idiomas
* 📱 Design responsivo (mobile-first)
* 📍 Geolocalização automática do usuário
* 🔄 Cache de requisições
* 🔁 Retry automático em falhas de rede
* 📅 Previsão para múltiplos dias
* 🎨 Melhorias visuais (UI/UX)
* ⛔ Cancelamento de requisições (AbortController)

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias!

---

## 📄 Licença

Este projeto está sob a licença MIT.
