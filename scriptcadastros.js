document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('table-body');
    const filterInput = document.getElementById('filter-input');
  
    // Função para carregar os cadastros do localStorage e exibir na tabela
    function loadCadastros() {
      const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
      populateTable(cadastros);
    }
  
    // Função para popular a tabela com dados
    function populateTable(data) {
      tableBody.innerHTML = '';
      data.forEach(cadastro => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cadastro.nome}</td>
          <td>${cadastro.dataNasc}</td>
          <td>${cadastro.email}</td>
          <td>${cadastro.telefone}</td>
          <td>${cadastro.endereco}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    // Função para aplicar filtro à tabela
    function applyFilter() {
      const query = filterInput.value.toLowerCase();
      const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
      const filteredCadastros = cadastros.filter(cadastro => {
        return Object.values(cadastro).some(value => 
          value.toLowerCase().includes(query)
        );
      });
      populateTable(filteredCadastros);
    }
  
    // Adiciona evento de input ao campo de filtro
    filterInput.addEventListener('input', applyFilter);
  
    // Função para limpar os cadastros do localStorage
    function clearCadastros() {
      localStorage.removeItem('cadastros');
      loadCadastros(); // Recarrega a tabela após limpar os dados
    }
  
    // Carregar cadastros ao carregar a página
    loadCadastros();
  
    // Adicionar evento de clique ao botão de limpar
    document.getElementById('limpar-button').addEventListener('click', clearCadastros);
  });
  