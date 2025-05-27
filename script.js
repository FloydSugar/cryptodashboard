const apiKey = "HTXV6GW3XPD3Z4A7TSZD5DZYYFNFY97YP9";
const apiURL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
const UPDATE_INTERVAL = 5000;
let progress = 0;
let progressInterval;

async function fetchGas() {
  const gasValue = document.getElementById('gas-value');
  gasValue.textContent = 'Загрузка...';
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.status === "1" && data.result) {
      gasValue.textContent = `${data.result.SafeGasPrice} Gwei`;
    } else {
      gasValue.textContent = 'Ошибка API';
    }
  } catch (e) {
    gasValue.textContent = 'Ошибка загрузки';
  }
}

function updateGas() {
  fetchGas();
}

// Автоматически обновляем каждые 5 секунд
updateGas();
setInterval(updateGas, UPDATE_INTERVAL);

// Поиск и подсветка
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  function clearHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
  }
  searchInput.addEventListener('input', function() {
    clearHighlights();
    const value = this.value.trim().toLowerCase();
    if (!value) return;
    const links = Array.from(document.querySelectorAll('.column a'));
    const found = links.filter(link => link.textContent.toLowerCase().includes(value));
    if (found.length > 0) {
      found[0].classList.add('search-highlight');
      found[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    found.forEach(link => link.classList.add('search-highlight'));
  });
  searchInput.addEventListener('blur', () => {
    setTimeout(clearHighlights, 300);
  });
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      clearHighlights();
      const value = this.value.trim().toLowerCase();
      if (!value) return;
      const links = Array.from(document.querySelectorAll('.column a'));
      const found = links.filter(link => link.textContent.toLowerCase().includes(value));
      if (found.length > 0) {
        found.forEach(link => link.classList.remove('search-highlight'));
        found[0].classList.add('search-highlight');
        found[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
});
