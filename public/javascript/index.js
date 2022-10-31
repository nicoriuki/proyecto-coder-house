const d = document,
      admin = d.getElementById('admin'),
      client = d.getElementById('client');

admin.addEventListener('click', () => {
      localStorage.setItem('admin', 'true');
});
client.addEventListener('click', () => {
      localStorage.setItem('admin', 'false');
});
