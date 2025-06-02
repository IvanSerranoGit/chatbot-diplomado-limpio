function showTab(tab) {
    document.getElementById('congreso').classList.add('hidden');
    document.getElementById('actividades').classList.add('hidden');
    document.getElementById('btnCongreso').classList.remove('active');
    document.getElementById('btnActividades').classList.remove('active');
  
    document.getElementById(tab).classList.remove('hidden');
    document.getElementById('btn' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  }
  