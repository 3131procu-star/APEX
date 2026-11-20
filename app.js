(() => {
  const els = {
    select: document.getElementById('minecraft-version'),
    selected: document.getElementById('selected-version'),
    client: document.getElementById('client-version'),
    loader: document.getElementById('loader-name'),
    status: document.getElementById('release-status'),
    support: document.getElementById('support-label'),
    button: document.getElementById('download-button'),
    buttonText: document.getElementById('download-button-text'),
    message: document.getElementById('download-message'),
    grid: document.getElementById('version-grid'),
    count: document.getElementById('supported-count')
  };

  let releases = [];
  const byId = (id) => releases.find((release) => release.minecraftVersion === id);

  function setStatus(release) {
    const ready = Boolean(release.available && release.downloadUrl);
    els.status.className = `status-pill ${ready ? 'status-ready' : 'status-pending'}`;
    els.status.textContent = ready ? 'İNDİRMEYE HAZIR' : 'DOSYA BEKLİYOR';
    els.support.textContent = ready ? 'Hazır' : 'Hazırlanıyor';
    els.button.disabled = !ready;
    els.buttonText.textContent = ready ? 'JAR DOSYASINI İNDİR' : 'JAR HENÜZ HAZIR DEĞİL';
    els.message.textContent = ready
      ? `${release.minecraftVersion} için APEX Client ${release.clientVersion} paketi hazır.`
      : (release.message || 'Bu Minecraft sürümü için doğrulanmış bir JAR dosyası henüz yüklenmedi.');
    if (ready) {
      els.button.dataset.url = release.downloadUrl;
      els.button.dataset.filename = release.filename || `apex-client-${release.clientVersion}-mc${release.minecraftVersion}.jar`;
    } else {
      delete els.button.dataset.url;
      delete els.button.dataset.filename;
    }
  }

  function selectRelease(version) {
    const release = byId(version) || releases[0];
    if (!release) return;
    els.selected.textContent = release.minecraftVersion;
    els.client.textContent = release.clientVersion || 'Henüz atanmadı';
    els.loader.textContent = release.loader || 'Fabric';
    setStatus(release);
  }

  function renderCatalog() {
    els.grid.replaceChildren();
    for (const release of releases) {
      const ready = Boolean(release.available && release.downloadUrl);
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `version-tile${ready ? ' is-ready' : ''}`;
      tile.setAttribute('aria-label', `${release.minecraftVersion} sürümünü seç${ready ? ', dosya hazır' : ', dosya bekliyor'}`);
      tile.innerHTML = `
        <span class="tile-top"><strong class="tile-version"></strong><span class="tile-state"></span></span>
        <span class="tile-bottom"><span class="tile-apex"></span><b>Fabric · Java</b></span>`;
      tile.querySelector('.tile-version').textContent = release.minecraftVersion;
      tile.querySelector('.tile-state').textContent = ready ? 'HAZIR' : 'YAKINDA';
      tile.querySelector('.tile-apex').textContent = release.clientVersion ? `APEX ${release.clientVersion}` : 'APEX paketi hazırlanıyor';
      tile.addEventListener('click', () => {
        els.select.value = release.minecraftVersion;
        selectRelease(release.minecraftVersion);
        document.getElementById('download').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      els.grid.append(tile);
    }
    els.count.textContent = releases.filter((release) => release.available && release.downloadUrl).length;
  }

  async function init() {
    try {
      const response = await fetch('downloads.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`downloads.json yüklenemedi (${response.status})`);
      const data = await response.json();
      if (!Array.isArray(data.releases) || data.releases.length === 0) throw new Error('Sürüm listesi boş.');
      releases = data.releases;
      els.select.replaceChildren();
      for (const release of releases) {
        const option = document.createElement('option');
        option.value = release.minecraftVersion;
        option.textContent = `${release.minecraftVersion}  ·  ${release.available && release.downloadUrl ? 'JAR hazır' : 'Dosya bekliyor'}`;
        els.select.append(option);
      }
      els.select.disabled = false;
      const initial = releases.find((release) => release.minecraftVersion === data.defaultVersion) || releases[0];
      els.select.value = initial.minecraftVersion;
      els.select.addEventListener('change', () => selectRelease(els.select.value));
      els.button.addEventListener('click', () => {
        const url = els.button.dataset.url;
        if (!url) return;
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = els.button.dataset.filename || '';
        anchor.rel = 'noopener';
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
      });
      renderCatalog();
      selectRelease(initial.minecraftVersion);
    } catch (error) {
      els.select.innerHTML = '<option>Sürüm listesi yüklenemedi</option>';
      els.select.disabled = true;
      els.grid.innerHTML = '<div class="loading-tile">Sürüm kataloğu yüklenemedi. downloads.json dosyasını kontrol edin.</div>';
      els.message.textContent = error.message;
    }
  }

  init();
})();
